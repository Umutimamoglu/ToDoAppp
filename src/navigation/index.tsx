import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './auth-stack-navigator';
import AppStackNavigator from './app-stack-navigator';
import useUserGlobalStore from '../store/useUserGlobalStore';

const Navigation = () => {

    const { user } = useUserGlobalStore()



    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

export default Navigation;
