import { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

const Photo = ({ user }) => {

    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        if (image) {
            setModalVisible(!isModalVisible);
        }
    };

    return (
        <View className="container flex my-2 items-center">
            <Pressable onPress={toggleModal} className="bg-fuchsia-600 flex flex-col rounded-full w-fit h-auto align-middle p-2 items-center justify-center">
                {
                    image ? <Image source={{ uri: image }} className="rounded-full w-28 h-28"/> :  <Icon name="account" size={90} color="white"/>
                }
            </Pressable>
            <Modal isVisible={isModalVisible}>
                <Pressable className="self-end m-6" onPress={toggleModal}>
                    <Icon name='close-box' size={40} color='#c026d3'/>
                </Pressable>
                <View className="bg-fuchsia-600 rounded-full p-2 items-center self-center w-fit h-auto">
                    {
                        image ? <Image source={{ uri: image }} className="rounded-full w-48 h-48"/> :  <Icon name="account" size={200} color="white"/>
                    }
                </View>
            </Modal>
        </View>
    )
}

export default Photo;