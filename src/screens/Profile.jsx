import { View, Text, Alert, Pressable, ActivityIndicator} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';

import Provider from '../components/Provider';
import Photo from '../components/Photo';
import request from '../services/request';

const Profile = (props) => {

    const navigation = useNavigation();
    const store = useStore();

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fecth = async () => {
            try {
                const { data, status } = await request("post", "user/find", { id: store.getState().auth.id });
                setUser(data.user);
            } catch(e) {
                setLoaded(true);
            }
        }

        fetch();
    })
    
    const handleRedirect = () => {
        navigation.navigate("Settings");
    }

    return (
        <Provider>
            {
                loaded ? 
                    <View className="container flex my-6">
                        <View className="mx-3 my-4 items-end">
                            <Pressable onPress={handleRedirect}>
                            <Icon name='cog' size={32} color='#c026d3'/>
                            </Pressable>
                        </View>
                        <View className="container flex align-center ">
                            <Photo/>
                            <Text className="text-2xl text-fuchsia-500 text-center my-3" style={{fontFamily: 'Ubuntu'}}>{user.name}</Text>
                        </View>
                    </View>
                :
                    <View className="flex justify-center h-full">
                        <View>
                            <ActivityIndicator size={50} color="#c026d3"/>
                        </View>
                    </View>
            }
        </Provider>
    )
}

export default Profile;