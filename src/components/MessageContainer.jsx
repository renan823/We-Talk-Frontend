import { View, SafeAreaView, ScrollView, Text, FlatList } from "react-native";

const MessageContainer = () => {

    const messages = [
        {
            to: "jose", from: "joe", text: "oii", status: "received", 
        }
    ]

    return (
        <SafeAreaView>
            <ScrollView className="block w-50 h-[300] bg-fuchsia-600">
                <FlatList/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MessageContainer;