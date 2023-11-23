import { Alert, Pressable, Text, View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';

import Input from '../components/Input';
import Provider from '../components/Provider';
import Button from '../components/Button';
import PhotoPicker from '../components/PhotoPicker';
import { user, password, biography } from '../services/validation';
import Selector from '../components/Selector';
import { fetchLanguages } from '../redux/store';
import request from '../services/request';
import { setLearn, setSpeak } from '../redux/languages/languageSlice';

const Register = (props) => {

    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            user: '',
            password: '',
            biography: ''
        }
    });

    const navigation = useNavigation();
    const store = useStore();

    const handleRedirect = () => {
        navigation.navigate('Login');
    }

    const handleRegister = async ({ user, password, biography }) => {
        const learn = store.getState().languages.learn;
        const speak = store.getState().languages.speak;

        if (speak.length === 0 || learn.length === 0) {
            Alert.alert("Oops! Algo deu errado!", "Escolha pelo menos uma língua");
            return;
        }

        const { data, status } = await request("POST", "user/sign-up", { name: user, password, biography, learn, speak });

        if (status == 201) {
            const user = data.user;
            store.dispatch(setSpeak([]));
            store.dispatch(setLearn([]));

            if (store.getState().image.data !== null) {

            }

            Alert.alert("Cadastro realizado", "Você será redirecionado", [{
                text: "Ok",
                onPress: () => navigation.navigate("Login")
            }]);
        } else {
            Alert.alert(data.message, "Que tal tentar de novo?");
        }
    }

    store.dispatch(fetchLanguages());

    return (
        <Provider>
            <ScrollView>
                <View className="container flex my-6 p-4">
                    <View className="container flex mt-4">
                        <Text className="text-center text-2xl m-1 text-fuchsia-600" style={{ fontFamily: 'Ubuntu' }}>Crie sua conta</Text>
                    </View>
                    <View className="bg-fuchsia-600 border-fuchsia-600 mx-20 h-1"></View>
                    <View className="my-6">
                        <PhotoPicker />
                        <View className="container my-2 mt-4">
                            <View className="container flex my-1">
                                <Input placeholder='Digite seu nome' icon='account' label='Usuário' control={control} field='user' rules={user} labelStyle="text-fuchsia-500" />
                                {errors.user && <Text className="mx-7 text-fuchsia-600" style={{ fontFamily: 'Ubuntu', fontSize: 16 }}>{errors.user.message}</Text>}
                            </View>
                            <View className="container flex my-1">
                                <Input placeholder='Digite sua senha' icon='lock' label='Senha' control={control} field='password' rules={password} labelStyle="text-fuchsia-500" secureTextEntry />
                                {errors.password && <Text className="mx-7 text-fuchsia-600" style={{ fontFamily: 'Ubuntu', fontSize: 16 }}>{errors.password.message}</Text>}
                            </View>
                            <View className="container flex my-1">
                                <Input placeholder='Conte um pouco sobre você!' icon='text-box' label='Biografia' control={control} field='biography' rules={biography} multiline={true} numberOfLines={5} labelStyle="text-fuchsia-500" />
                                {errors.biography && <Text className="mx-7 text-fuchsia-600" style={{ fontFamily: 'Ubuntu', fontSize: 16 }}>{errors.biography.message}</Text>}
                            </View>
                            <View className="flex my-7 px-4 items-center bg-gray-200 rounded w-auto mx-4 border-2 border-gray-400">
                                <View className="flex container px-3 my-1">
                                    <Text className="text-center text-fuchsia-500 text-lg" style={{ fontFamily: 'Ubuntu' }}>Para aprender:</Text>
                                    <Selector type='learn' />
                                </View>
                                <View className="flex container px-3 my-1">
                                    <Text className="text-center text-fuchsia-500 text-lg" style={{ fontFamily: 'Ubuntu' }}>Já faladas:</Text>
                                    <Selector type='speak' />
                                </View>
                            </View>
                        </View>
                        <View className="container flex items-center my-6">
                            <Button text='Criar conta' buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={handleSubmit(handleRegister)} />
                        </View>
                    </View>
                    <View className="container my-2 p-4">
                        <Text className="text-center text-lg text-slate-800" style={{ fontFamily: 'Ubuntu' }}>Já tem uma conta?</Text>
                        <Pressable onPress={() => handleRedirect()}>
                            <Text className="text-center text-lg text-fuchsia-600" style={{ fontFamily: 'Ubuntu' }}>Faça login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </Provider>
    ) 
}

export default Register;
