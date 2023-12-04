import { View, Text, Pressable } from "react-native";
import Provider from "../components/Provider";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import { useStore } from "react-redux";
import { fecthChats } from "../redux/store";

const Home = () => {

    const navigation = useNavigation();
    const store = useStore();

    store.dispatch(fecthChats())
    const chats = store.getState().chats.data;
    console.log(chats);

    const user = store.getState().auth.user;

    const loadChat = (chat) => {
        navigation.navigate("Chat", { socket: ws, chat });
    }
    
    return(
        <Provider>
            <View>
                <View>
                   {
                    chats.map(chat => {
                        let i = 0;
                        if (chat.users.indexOf(user) === 0) {
                            i = 1;
                        }
                        
                        return (
                            <Pressable onPress={() => loadChat(chat)} className="bg-fuchsia-400 m-4 p-2 rounded-sm">
                                <View>
                                    <Text>{chat.users[i]}</Text>
                                </View>
                            </Pressable>
                        )
                    })
                   }
                </View>
            </View>
        </Provider>
    )
}

export default Home;