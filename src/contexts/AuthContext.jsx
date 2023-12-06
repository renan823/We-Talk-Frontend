import { createContext, useContext, useEffect, useState } from "react";
import { setAuth, setLogout } from "../redux/auth/authSlice";
import { useDispatch, useStore } from "react-redux";
import request from "../services/request";
import { Alert } from "react-native";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState(null);

    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [event, setEvent] = useState({});

    const dispatch = useDispatch();
    const store = useStore();

    const connect = () => {
        let url = process.env.EXPO_PUBLIC_SERVER_URL;
        url = url.split("//")[1];

        const ws = new WebSocket(`ws://${url}`);
        ws.onmessage = (e) => {
            console.log(e.data)
        }

        ws.onopen = () => {
            console.log("connected");
        }

        setSocket(ws)

        return () => {
            socket.close();
        }
    }

    useEffect(() => {
        connect()
    }, [])


    const login = async (payload) => {
        const { data, status } = await request('POST', 'user/sign-in', { name: payload.name, password: payload.password });
        
        if (status === 200) {
            if (!connected) {
                connect();
            }
            const user = data.user;
            dispatch(setAuth({ user: user.name, id: user._id, signed: true }));

            const message = { event: "open", data: { id: store.getState().auth.id } };
            socket.send(JSON.stringify(message));

            setConnected(true);
            setLogged(true)
        } else {
            setError(data.message);
        }
    }

    const logout = () => {
        const payload = { event: "close", data: { id: store.getState().auth.id } };
        socket.send(JSON.stringify(payload));
        socket.close();

        dispatch(setLogout());

        setLogged(false);
        setSocket(null);
        setConnected(false);
    }

    useEffect(() => {
        if (error) {
            Alert.alert("Algo deu errado", error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ logged, login, logout, error, setError, socket, event }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;