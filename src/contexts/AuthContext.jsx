import { createContext, useContext, useEffect, useState } from "react";
import { setAuth, setLogout } from "../redux/auth/authSlice";
import { useDispatch, useStore } from "react-redux";
import request from "../services/request";
import { Alert } from "react-native";
import { useRef } from "react";

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

    const ws = useRef(new WebSocket('ws://10.115.65.13:5000/')).current;

    ws.onopen = () => {
        console.warn("conexão aberta");
    }

    ws.onmessage = (e) => {
        console.warn(e.data);
        setEvent(e.data);
    }
    
    const login = async (payload) => {
        const { data, status } = await request('POST', 'user/sign-in', { name: payload.name, password: payload.password });
        
        if (status === 200) {
            const user = data.user;
            dispatch(setAuth({ user: user.name, id: user._id, signed: true }));
            setLogged(true)
            
            console.warn(ws)
            const message = { event: "open", data: { id: store.getState().auth.id } };
            ws.send(JSON.stringify(message));

            setSocket(ws);
            setConnected(true);
        } else {
            setError(data.message);
        }
    }

    const logout = () => {
        const payload = { event: "close", data: { id: store.getState().auth.id } };
        socket.send(JSON.stringify(payload));

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

    const send = ({ text, chat, to }) => {
        const data = { chat, to, text, date: new Date(), from: store.getState().auth.user };
        const payload = { event: "send", data };

        socket.send(JSON.stringify(payload));
    }

    return (
        <AuthContext.Provider value={{ logged, login, logout, error, setError, send, socket, event }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;