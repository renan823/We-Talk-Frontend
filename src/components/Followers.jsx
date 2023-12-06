import Modal from 'react-native-modal';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { useState } from 'react';
import Button from './Button';
import { useStore } from 'react-redux';

const Followers = () => {

    const store = useStore();
    const followers = [];

    const [isModalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("Você não tem seguidores");
    
    switch(followers.length){
        case 0:
            setMessage("Você não tem seguidores");
            break;
        case 1:
            setMessage("Você tem 1 seguidor");
            break;
        default:
            setMessage(`Você tem ${followers.length} seguidores`);
    }
        
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View className="container flex items-center">
            <View>
                <Button text="Seguidores" buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={toggleModal} />
                <Modal isVisible={isModalVisible}>
                    <View className="container flex bg-white rounded-md p-2 justify-center">
                        <Text className="text-fuchsia-500 text-lg text-center" style={{fontFamily: 'Ubuntu'}}>{message}</Text>
                        <ScrollView className="h-max-{h-1/3}">
                            <FlatList 
                                data={followers} 
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => <Text className="text-fuchsia-600 text-center text-lg font-bold">{item}</Text>}
                            />
                        </ScrollView>
                        <Button text="Feito" buttonStyle="bg-fuchsia-600 self-center" textStyle="text-white" onPress={toggleModal}/>
                    </View>
                </Modal>
            </View>     
        </View>
    );
}

export default Followers;
