import { View, Text, Pressable, ScrollView } from 'react-native';
import Button from '../components/Button';
import Provider from '../components/Provider';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {

    const navigation = useNavigation();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    const handleRedirect = () => {
        navigation.navigate('Profile');
    }

    return(
        <Provider>
            <View>
                <View className="mx-3 my-4 items-start border-b-2 border-fuchsia-600">
                    <Pressable onPress={handleRedirect} className="flex flex-row items-center">
                        <Icon name='arrow-left-bold-box' size={32} color='#c026d3'/>
                        <Text className="mx-2 text-xl text-fuchsia-500 " style={{fontFamily: 'Ubuntu'}}>Retornar ao perfil</Text>
                    </Pressable>
                </View>

                <View className="m-2 p-1 flex">
                    <Text className="text-center text-2xl text-fuchsia-600 font-bold">Configurações</Text>
                </View>   
            </View>
            <ScrollView>
                <Button text='Logout' buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={handleLogout}/>
            </ScrollView>
        </Provider>
    )
}

export default Settings;