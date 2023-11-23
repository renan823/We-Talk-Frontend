import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

//auth stack (no auth) 
import Login from '../screens/Login';
import Register from '../screens/Register';

//app stack (with auth)
import TabNavigation from './TabNavigation';
import Chat from '../screens/Chat';
import Settings from '../screens/Settings';
 
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={Register}/>
        </Stack.Navigator>
    )
}

export const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Tabs' component={TabNavigation}/>
            <Stack.Screen name='Chat' component={Chat}/>
            <Stack.Screen name='Settings' component={Settings}/>
        </Stack.Navigator>
    )
}
