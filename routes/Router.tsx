import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import useAuth from '../hooks/useAuth';


function Router() {

    const { authData } = useAuth();

    return (
        <NavigationContainer>
            {authData ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
export default Router