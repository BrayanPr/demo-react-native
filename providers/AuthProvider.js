import React, { createContext, useState, useEffect, Provider } from 'react';
import authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(undefined);
    const [loading, setLoading] = useState(true); // Set loading to true initially

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData() {
        try {
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                const _authData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (error) {
            console.error('Failed to load auth data from storage', error);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (username, password) => {
        setLoading(true)
        const _authData = await authService(username, password);
        if (_authData) {
            setAuthData(_authData);
            await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
        } else {
            alert("Error in log in, try again")
        }
        setLoading(false)
    };

    const signOut = async () => {
        setAuthData(undefined);
        await AsyncStorage.removeItem('@AuthData');
    };

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
