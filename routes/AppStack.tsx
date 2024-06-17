import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Button } from 'react-native';
import HomePage from '../pages/HomePage';
import useAuth from '../hooks/useAuth';
import CameraPage from '../pages/CameraPage';
import ChatPage from '../pages/ChatPage';
import MapPage from '../pages/MapPage';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    const { signOut } = useAuth();

    const handleLogOut = async () => {
        Alert.alert('Are you sure', 'You will need to log in again next', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Log out', onPress: signOut },
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
                name="Home"
                component={HomePage}
            />
            <Stack.Screen
                name="Camera"
                component={CameraPage}
            />
            <Stack.Screen
                name="Chat"
                component={ChatPage}
            />
            <Stack.Screen
                name="Map"
                component={MapPage}
            />
        </Stack.Navigator>
    );
};
