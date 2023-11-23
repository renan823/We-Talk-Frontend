import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, Pressable } from "react-native";
import Provider from "../components/Provider";
import MessageContainer from "../components/MessageContainer";
import SendMessage from "../components/SendMessage";

const Chat = ({ chat }) => {

    return(
        <Provider>
            <MessageContainer/>
            <SendMessage chat={"12345"}/>
        </Provider>
    )
}

export default Chat;