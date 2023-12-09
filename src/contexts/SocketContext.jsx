import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [event, setEvent] = useState(null);
    
    const url = process.env.EXPO_PUBLIC_SERVER_URL.split("//")[1];
    useEffect(() => {
        const ws = new WebSocket(`ws://${url}`);
    
        ws.onopen = () => {
            console.log('connected');
        };
    
        ws.onerror = (error) => {
            console.error('error: ', error);
        };
    
        ws.onclose = () => {
            console.log('disconnected');
        };
    
        ws.onmessage = (message) => {
            setEvent(JSON.parse(message.data));
        };
    
        setSocket(ws);
    
        return () => {
            ws.close();
        };
      }, []);

    const send = (payload) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
        } else {
            console.log("socket error");
        }

        return;
    }

    const close = () => {
        if (socket) {
            socket.close();
            setSocket(null);
            setEvent(null);
        }

        return;
    }

    return (
        <SocketContext.Provider value={{ event, send, close, setEvent }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider;