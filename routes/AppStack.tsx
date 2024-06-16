import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Button } from 'react-native';
import HomePage from '../pages/HomePage';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    const { signOut } = useAuth();

    const handleLogOut = async () => {
        Alert.alert('Are you sure', 'You will need to log in again next time!', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Log out', onPress:signOut },
        ]);
    };

    return (
        <Stack.Navigator screenOptions={{
            headerRight: () => (
                <Button
                    onPress={handleLogOut}
                    title="Log Out"
                    color="#000"
                />
            ),
        }}>
            <Stack.Screen
                name="Home Screen"
                component={HomePage}
            />
        </Stack.Navigator>
    );
};
