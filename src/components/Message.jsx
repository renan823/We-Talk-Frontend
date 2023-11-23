import { View, Text } from "react-native";
import { useStore } from "react-redux";

const Message = ({ message }) => {

    let position = "justify-self-end bg-fuchsia-400"
    /*
    const store = useStore();

    
    let owner = store.getState().auth.user === message.from;
    if (owner) {
        position = "justify-self-end bg-fuchsia-600" max-w-[260] {`${position} flex border-2 rounded-2xl p-2 m-1 min-w-fit w-fit border-fuchsia-400`}
    }
     */

    return (
        <View className="flex">
            <Text className="text-white font-bold text-lg bg-slate-400">oi</Text>
        </View>
    )
}

export default Message;