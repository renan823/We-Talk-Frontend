import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, Pressable } from "react-native";
import Provider from "../components/Provider";
import MessageContainer from "../components/MessageContainer";
import SendMessage from "../components/SendMessage";
import { useAuth } from "../contexts/AuthContext";


const Chat = ({ route }) => {

    const chat = route.params.chat;
    const { socket, event } = useAuth();

    console.log(socket)

    console.log(chat)

    return(
        <Provider>
            <MessageContainer/>
            <SendMessage chat={chat._id}/>
        </Provider>
    )
}

export default Chat;