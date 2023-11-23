import { Pressable, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const SendMessage = ({ chat }) => {

    const [message, setMessage] = useState("");
    
    const sendMessage = () => {
        console.warn(message);
        setMessage("");
    }

    return (
        <View className="bg-teal-400 flex flex-row items-center">
            <View className="flex flex-row bg-gray-200  mx-4 my-1 p-2 w-auto rounded border-2 border-gray-400">
                <TextInput 
                    placeholder="Mensagem" 
                    value={message} 
                    onChangeText={message => setMessage(message)} 
                    className="mx-1 w-5/6 text-slate-600 bg-g" 
                    style={{fontFamily: 'Ubuntu'}}
                />
            </View>
            <Pressable onPress={sendMessage}>
                <Icon name="send" size={32} color="#c026d3"/>
            </Pressable>
        </View>
    )
}

export default SendMessage;