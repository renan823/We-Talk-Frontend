import { View, Text, Pressable } from "react-native";
import Provider from "../components/Provider";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import { useStore } from "react-redux";


const Home = () => {

    const navigation = useNavigation();
    const store = useStore();

    const ws = useRef(new WebSocket('ws://10.115.65.13:5000/')).current;

    ws.onopen = () => {
        console.warn("conexão aberta");
        const message = { id: "OPEN", data: { id:  store.getState().auth.id } };
        ws.send(JSON.stringify(message));
    }

    ws.onmessage = (e) => {
        console.warn(e.data)
    }

    return(
        <Provider>
            <View>
                <Pressable onPress={() => navigation.navigate("Chat")}>
                    <Text>Clique para ir ao chat</Text>
                </Pressable>
            </View>
        </Provider>
    )
}

export default Home;