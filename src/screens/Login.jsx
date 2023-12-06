import { Pressable, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Input from '../components/Input';
import Button from '../components/Button';
import { user, password } from '../services/validation';
import { useAuth } from '../contexts/AuthContext';
import Provider from '../components/Provider';

const Login = (props) => {

    const { login } = useAuth();

    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
      defaultValues: {
          user: '',
          password: ''
      }
    });

    const navigation = useNavigation();

    const handleRedirect = () => {
        navigation.navigate('Register');
    }

    const handleLogin = async (data) => {
        const body = { name: data.user, password: data.password };
        console.log(body)
        await login(body);
        reset();
    }

    return (
        <Provider>
            <View className="container flex my-6 p-4">
                <View className="container flex my-11">
                    <Text className="text-center text-6xl m-1 text-fuchsia-600" style={{fontFamily: 'Ubuntu'}}>We Talk</Text>
                    <Text className="text-center text-xl m-1 text-fuchsia-600" style={{fontFamily: 'Ubuntu'}}>Faça login para continuar</Text>
                </View>
                <View>
                    <View className="container my-3">
                        <View className="container flex my-4">
                            <Input placeholder='Digite seu nome' icon='account' label='Usuário' control={control} field='user' rules={user} labelStyle="text-fuchsia-500"/>
                            {errors.user && <Text className="mx-7 text-fuchsia-600" style={{fontFamily: 'Ubuntu', fontSize: 16}}>{errors.user.message}</Text>}
                        </View>
                        <View className="container flex my-4">
                            <Input placeholder='Digite sua senha' icon='lock' label='Senha' control={control} field='password' rules={password} labelStyle="text-fuchsia-500" secureTextEntry/>
                            {errors.password && <Text className="mx-7 text-fuchsia-600" style={{fontFamily: 'Ubuntu', fontSize: 16}}>{errors.password.message}</Text>}
                        </View>
                    </View>
                    <View className="container flex items-center my-6">
                        <Button text='Login' buttonStyle="bg-fuchsia-600" textStyle="text-white" onPress={handleSubmit(handleLogin)}/>
                    </View>
                </View>
                <View className="container my-2">
                    <Text className="text-center text-lg text-slate-800" style={{fontFamily: 'Ubuntu'}}>Não tem uma conta?</Text>
                    <Pressable onPress={() => handleRedirect()}>
                        <Text className="text-center text-lg text-fuchsia-600" style={{fontFamily: 'Ubuntu'}}>Cadastre-se</Text>
                    </Pressable>
                </View>
            </View>
        </Provider>
    )
}

export default Login;
