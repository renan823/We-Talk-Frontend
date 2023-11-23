import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import { useState } from 'react';
import Button from './Button';
import { useStore } from 'react-redux';
import { fecthFollowers } from '../redux/store';

const Followers = () => {

    const store = useStore();

    const [isModalVisible, setModalVisible] = useState(false);
    const [followers, setFollowers] = useState(store.getState().followers.data);
    let message;

    switch(followers.length){
        case 0:
            message = "Você não tem seguidores";
            break;
        case 1:
            message = "Você tem 1 seguidor";
            break;
        default:
            message = `Você tem ${followers} seguidores`;
    }
        
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View className="container flex items-center">
        <Button text="Seguidores" buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
            <View className="container flex bg-white rounded-md p-2 justify-center">
                <Text className="text-fuchsia-500 text-lg text-center" style={{fontFamily: 'Ubuntu'}}>{message}</Text>
                <Button text="Feito" buttonStyle="bg-fuchsia-600 self-center" textStyle="text-white" onPress={toggleModal}/>
            </View>
        </Modal>
        </View>
    );
}

export default Followers;