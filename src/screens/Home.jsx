import { View, Text, Pressable, FlatList, ScrollView, ActivityIndicator } from "react-native";
import Provider from "../components/Provider";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useStore } from "react-redux";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import request from "../services/request";
import { useSocket } from "../contexts/SocketContext";

const Home = () => {

    const navigation = useNavigation();
    const store = useStore();

    const user = store.getState().auth.user;
    const id = store.getState().auth.id;
    const { send } = useSocket();

    const [chats, setChats] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, status } = await request("get","chat/all");
                setChats(data.chats);
            } catch(e) {
                return
            } finally {
                setLoaded(true);
            }
        }

        fetch();
    })

    const loadChat = (chat) => {
        send({ event: "open", data: { name: store.getState().auth.user } });
        navigation.navigate("Chat", { chat });
    }

    const Chat = ({ item }) => {
        let pos = 0;
        if (item.users.indexOf(user) === 0) {
            pos = 1;
        }

        return (
            <Pressable className="bg-purple-400 p-2 m-5 rounded-md" onPress={() => loadChat(item)}>
                <View className="flex flex-row">
                    <View className="bg-fuchsia-600 rounded-full p-2">
                        <Icon name="account" size={30} color="white"/>
                    </View>
                    <Text className="text-white font-bold text-xl text-center my-2 mx-5" style={{fontFamily: 'Ubuntu'}}>{item.users[pos]}</Text>
                </View>
            </Pressable>
        )
    }
    
    return(
        <Provider>
            <View className="my-5 h-5/6">
                <Text className="text-fuchsia-600 font-bold text-3xl text-center my-4" style={{fontFamily: 'Ubuntu'}}>Suas Conversas</Text>
                <View>
                    {
                        loaded ?
                            <FlatList data={chats} keyExtractor={(item) => item._id} renderItem={Chat}/>
                        :
                            <View className="flex justify-center h-full">
                                <View>
                                    <ActivityIndicator size={50} color="#c026d3"/>
                                </View>
                            </View>
                    }
                </View>
            </View>
        </Provider>
    )
}

export default Home;