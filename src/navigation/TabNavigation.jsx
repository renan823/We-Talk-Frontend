import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';

import Home from '../screens/Home';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigation = (props) => {

    return (
        <Tab.Navigator
            screenOptions = {({ route }) => ({
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 30,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 10,
                    height: 70,
                    backgroundColor: '#cbd5e1',
                },
                tabBarIcon: ({ color, focused }) => {
                    let name;

                    switch(route.name) {
                        case 'Profile':
                            name = focused ? 'account' : 'account-outline';
                            break;
                        case 'Feed':
                            name = focused ? 'home' : 'home-outline';
                            break;
                        default:
                            name = focused ? 'chat' : 'chat-outline';
                    }

                    return (<Icon name={name} size={30} color="#c026d3"/>);
                }
            })}
        >
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Feed' component={Feed}/>
            <Tab.Screen name='Profile' component={Profile}/>
        </Tab.Navigator>
    )
}

export default TabNavigation;

