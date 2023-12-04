import Provider from "../components/Provider";
import { Text, PanResponder, View, Animated, Pressable } from "react-native";
import { useStore } from "react-redux";
import { fecthSuggestions } from "../redux/store";
import Suggestion from "../components/Suggestion";
import { useRef, useState } from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import request from "../services/request";

const Feed = () => {

    const store = useStore();
    store.dispatch(fecthSuggestions());
    console.log("hey")

    const user = store.getState().auth.user;

    const [suggestions, setSuggestions] = useState(store.getState().suggestions.data);
    const [iterator, setIterator] = useState(0);
    const [suggestion, setSuggestion] = useState(suggestions[iterator]);
    console.log(suggestion);
    
    const createChat = async () => {
        console.log("new")
        const follower = suggestion.name;
        const { data, status } = await request("POST", "chat/new", { follower });

        if (status === 201 || status === 200) {
            console.warn(data);
        }
        nextSuggestion()
    }

    const nextSuggestion = () => {
        if (iterator + 1 >= suggestions.length) {
            setIterator(0);
        } else {
            setIterator(iterator => iterator +1);
        }

        setSuggestion(suggestions[iterator]);
    }

    return(
        <Provider>
            <View className="container flex p-4 my-6">
                <View className="bg-purple-300 p-3 mt-8">
                    <Suggestion suggestion={suggestion}/>
                    <View>
                        <Pressable onPress={nextSuggestion}>
                            <Icon name="alpha-x" size={50}/>
                        </Pressable>
                        <Pressable onPress={createChat}>
                            <Icon name="heart" size={30}/>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Provider>
    )
}

export default Feed;