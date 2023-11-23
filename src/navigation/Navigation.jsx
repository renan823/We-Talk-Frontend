import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, AppStack } from './StackNavigation';
import { useAuth } from '../contexts/AuthContext';


const Navigation = () => {

    const { logged } = useAuth()

    return (
        <NavigationContainer>
            { logged ? <AppStack/> : <AuthStack/> }
        </NavigationContainer>
    )
}

export default Navigation;