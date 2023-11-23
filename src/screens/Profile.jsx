import { View, Text, Alert, Pressable } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';

import Provider from '../components/Provider';
import Photo from '../components/Photo';
import Followers from '../components/Followers';
import { fecthFollowers } from '../redux/store';

const Profile = (props) => {

    const navigation = useNavigation();
    const store = useStore();
    console.log(store.getState())

    const [user, setUser] = useState(store.getState().auth.user);

    const handleRedirect = () => {
        navigation.navigate("Settings");
    }

    store.dispatch(fecthFollowers())

    return (
        <Provider>
            <View className="container flex my-6">
                <View className="mx-3 my-4 items-end">
                    <Pressable onPress={handleRedirect}>
                    <Icon name='cog' size={32} color='#c026d3'/>
                    </Pressable>
                </View>
                <View className="container flex align-center ">
                    <Photo/>
                    <Text className="text-2xl text-fuchsia-500 text-center my-3" style={{fontFamily: 'Ubuntu'}}>{user}</Text>
                </View>
                <View className="my-4">
                    <Followers/>
                </View>
            </View>
        </Provider>
    )
}

export default Profile;