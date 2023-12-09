import { createContext, useContext, useEffect, useState } from "react";
import { setAuth, setLogout } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import request from "../services/request";
import { Alert } from "react-native";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const login = async (payload) => {
        const { data, status } = await request('POST', 'user/sign-in', { name: payload.name, password: payload.password });
        
        if (status === 200) {
            const user = data.user;
            dispatch(setAuth({ user: user.name, id: user._id, signed: true }));

            setLogged(true);
        } else {
            setError(data.message);
        }
    }

    const logout = () => {
        dispatch(setLogout());
        setLogged(false);
    }

    useEffect(() => {
        if (error) {
            Alert.alert("Algo deu errado", error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ logged, login, logout, error, setError }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;