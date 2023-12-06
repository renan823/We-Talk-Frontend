import { View, Text, ScrollView, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import Provider from "../components/Provider";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import request from "../services/request";
import { useStore } from "react-redux";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Chat = ({ route }) => {

    const chat = route.params.chat;
    const { socket, event } = useAuth();
    const store = useStore();
    const navigation = useNavigation();

    const user = store.getState().auth.user;

    let target = chat.users[0]
    if (target === user) {
        target = chat.users[1];
    }

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false)

    const fetch = async () => {
        try {
            const { data, status } = await request("post", "chat/messages", { chat: chat._id });
            setMessages(data.messages);
        } catch(e) {

        } finally {
            setLoaded(true)
        }
    }

    useEffect(() => {
        fetch();
    }, [])

    const handleSendMessage = async () => {
        if (message.trim().length !== 0) {
            const body = { from: user, to: target, text: message, date: new Date(), chat: chat._id };
            const payload = { event: "send", data: { message: body } };
            socket.send(JSON.stringify(payload));

            await fetch();

            setMessage("");
        }
    }

    const Message = ({ item }) => {
        let style = "self-start";

        if (item.from === user) {
            style = "self-end";
        }
        return (
            <View className={`${style} py-2 px-3 bg-purple-500 m-1 rounded-lg`} style={{maxWidth: "60%"}}>
                <Text className="text-white" style={{fontFamily: 'Ubuntu'}}>{item.text}</Text>
            </View>
        )
    }

    const handleRedirect = () => {
        navigation.navigate("Home")
    }

    return(
        <Provider>
            {
                loaded ?
                    <View className="h-full bg-white">
                        <View className="mx-3 mt-10 items-start border-b-2 border-fuchsia-600">
                            <Pressable onPress={handleRedirect} className="flex flex-row items-center">
                                <Icon name='arrow-left-bold-box' size={32} color='#c026d3'/>
                                <Text className="mx-2 text-xl text-fuchsia-500 " style={{fontFamily: 'Ubuntu'}}>{target}</Text>
                            </Pressable>
                        </View>
                        <View className="bg-white  rounded-lg m-1 my-9">
                            <ScrollView className="bg-white my-2 px-3 h-3/4">
                                <FlatList data={messages} keyExtractor={(item) => item._id } renderItem={Message}/>
                                <View className="p-4"></View>
                            </ScrollView>
                            <View className="flex flex-row bg-gray-200 items-center align-center justify-center mx-4 my-1 p-2 w-auto rounded border-2 border-gray-400">
                                <TextInput placeholder="Mensagem" value={message} onChangeText={(text) => setMessage(text)} className="mx-2 w-5/6 text-slate-600 font-bold" style={{fontFamily: 'Ubuntu'}}/>
                                <Pressable onPress={handleSendMessage}>
                                    <Icon name="send" size={32} color="gray"/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                :
                    <View className="flex justify-center h-full">
                        <View>
                            <ActivityIndicator size={50} color="#c026d3"/>
                        </View>
                    </View>
            }
        </Provider>
    )
}

export default Chat;