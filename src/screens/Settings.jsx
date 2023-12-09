import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import Button from '../components/Button';
import Provider from '../components/Provider';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import request from '../services/request';
import { useSocket } from '../contexts/SocketContext';

const Settings = () => {

    const navigation = useNavigation();
    const { logout } = useAuth();
    const [biography, setBiography] = useState("");

    const { close } = useSocket();

    const handleLogout = async () => {
        close();
        await logout();
    }

    const handleRedirect = () => {
        navigation.navigate('Profile');
    }

    const handleUpdateBiography = async () => {
        const { data, status } = await request("post", "user/update-status", { biography: biography });
        if (status === 200) {
            Alert.alert("Alterações salvas", data.message);
            setBiography("")
        } else {
            Alert.alert(data.message, "Tente novamente");
        }
    }

    return(
        <Provider>
            <View>
                <View className="mx-3 my-10 items-start border-b-2 border-fuchsia-600">
                    <Pressable onPress={handleRedirect} className="flex flex-row items-center">
                        <Icon name='arrow-left-bold-box' size={32} color='#c026d3'/>
                        <Text className="mx-2 text-xl text-fuchsia-500 " style={{fontFamily: 'Ubuntu'}}>Retornar ao perfil</Text>
                    </Pressable>
                </View>
                <View className="m-2 p-1 flex">
                    <Text className="text-center text-2xl text-fuchsia-600 font-bold">Configurações</Text>
                    <View>
                        <View className="my-5">
                            <Text className="mx-4 text-lg text-fuchsia-500" style={{fontFamily: 'Ubuntu'}}>Alterar biografia</Text> 
                            <View className="flex flex-row bg-gray-200 items-center align-center justify-center mx-4 my-1 p-2 w-auto rounded border-2 border-gray-400">
                                <Icon name="text-box" size={32} color="gray"/> 
                                    <TextInput 
                                        placeholder="Conte um pouco sobre você!" 
                                        multiline={true} 
                                        numberOfLines={5}                                                                             
                                        value={biography} 
                                        onChangeText={(text) => setBiography(text)} 
                                        className="mx-2 w-5/6 text-slate-600 bg-g" 
                                        style={{fontFamily: 'Ubuntu'}}
                                    />                                                      
                            </View>
                            <View className="container flex items-right"> 
                                <Pressable onPress={handleUpdateBiography} className="bg-fuchsia-600 p-1 rounded-md w-28 self-end mr-10 mt-2">
                                    <Text className="text-center text-lg m-1 text-white font-bold" style={{fontFamily: 'Ubuntu'}}>Salvar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>   
                <View className="container flex items-center">
                    <Button text='Logout' buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={handleLogout}/>
                </View>
            </View>
        </Provider>
    )
}

export default Settings;