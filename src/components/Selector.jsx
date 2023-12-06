import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import { useState } from 'react';
import Button from './Button';
import Checklist from './Checklist';
import { useStore } from 'react-redux';
import { setLearn, setSpeak } from '../redux/languages/languageSlice';

const Selector = ({ type, data }) => {

    const store = useStore();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onChange = (data) => {
        if (type === 'learn') {
            store.dispatch(setLearn(data));
        } else {
            store.dispatch(setSpeak(data));
        }
    }

    const origin = store.getState().languages[type];

    return (
        <View className="container flex items-center">
        <Button text="Escolher línguas" buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
            <View className="container flex bg-white rounded-md p-2 justify-center">
                <Text className="text-fuchsia-500 text-lg text-center" style={{fontFamily: 'Ubuntu'}}>Selecione as línguas de seu interesse.</Text>
                <Checklist origin={origin} data={data} onChange={onChange}/>
                <Button text="Feito" buttonStyle="bg-fuchsia-600 self-center" textStyle="text-white" onPress={toggleModal}/>
            </View>
        </Modal>
        </View>
    );
}

export default Selector;