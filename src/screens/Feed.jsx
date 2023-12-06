import Provider from "../components/Provider";
import { View, Pressable, ActivityIndicator } from "react-native";
import { useStore } from "react-redux";
import Suggestion from "../components/Suggestion";
import { useEffect, useState } from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import request from "../services/request";
import { useNavigation } from "@react-navigation/native";

const Feed = () => {

    const store = useStore();

    const user = store.getState().auth.user;
    const [suggestions, setSuggestions] = useState([]);
    const [iterator, setIterator] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, status } = await request("get","user/feed");
                setSuggestions(data.suggestions);
            } catch(e) {
                return
            } finally {
                setLoaded(true);
            }
        }

        fetch();
    }, []) 

    const createChat = async () => {
        const follower = suggestions[iterator].name;
        const { data, status } = await request("POST", "chat/new", { follower });
        navigation.navigate("Chat", { chat: data.chat })

        //nextSuggestion();
    }

    const nextSuggestion = () => {
        if (iterator + 1 >= suggestions.length) {
            setIterator(0);
        } else {
            setIterator(iterator +1);
        }
    }

    return(
        <Provider>
            <View className="container flex p-4 my-6">
                <View className="p-3 mt-8">
                    {
                        (loaded && suggestions.length !== 0) ? 
                            <View className="bg-purple-300 rounded-lg my-10 p-3">
                                <Suggestion suggestion={suggestions[iterator]}/>
                                <View className="flex flex-row justify-around">
                                    <Pressable onPress={nextSuggestion}>
                                        <Icon name="close-box" size={50} color="#7e22ce"/>
                                    </Pressable>
                                    <Pressable onPress={createChat}>
                                        <Icon name="heart" size={50} color="#dc2626"/>
                                    </Pressable>
                                </View>
                            </View>
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

export default Feed;