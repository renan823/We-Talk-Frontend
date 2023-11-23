import Provider from "../components/Provider";
import { Text, PanResponder, View, Animated } from "react-native";
import { useStore } from "react-redux";
import { fecthSuggestions } from "../redux/store";
import Suggestion from "../components/Suggestion";
import { useRef, useState } from 'react';

const Feed = () => {

    const store = useStore();
    store.dispatch(fecthSuggestions());

    const data = store.getState().suggestions.data;
    let iterator = 0;

    const renderSuggestions = () => {
        return(
            <></>
        )
    }

    return(
        <Provider>
            <View className="container flex p-4 my-6">
                <Animated.View className="mb-20 mt-5">
                    <Suggestion suggestion={data[iterator]}/>
                </Animated.View>
            </View>
        </Provider>
    )
}

export default Feed;