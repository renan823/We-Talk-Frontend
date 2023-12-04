import { createContext, useContext, useState } from "react";
import { useStore } from "react-redux";


const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [event, setEvent] = useState({});

    const store = useStore();

    const connect = () => {
        const ws = useRef(new WebSocket('ws://10.115.65.13:5000/')).current;

        ws.onopen = () => {
            console.warn("conexão aberta");
            const message = { event: "open", data: { id: store.getState().auth.id } };
            ws.send(JSON.stringify(message));
        }
    
        ws.onmessage = (e) => {
            console.warn(e.data)
            setEvent(e.data)
        }

        setSocket(ws);
        setConnected(true);
    }

    const send = ({ text, chat, to }) => {
        const data = { chat, to, text, date: new Date(), from: store.getState().auth.user };
        const payload = { event: "send", data };

        socket.send(JSON.stringify(payload));
    }

    return (
        <SocketContext.Provider value={{ event, socket, connect, connected, send }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider;