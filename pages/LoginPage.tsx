import React, { useState, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [innerLoading, setInnerLoading] = useState(false);

    const { loading, signIn } = useAuth();

    const handleLogin = async () => {
        setInnerLoading(true)
        await signIn(username, password);
        setInnerLoading(false)
    };

    const passwordInputRef = useRef<TextInput>(null);

    if(loading){
        <View style={styles.mainContainer}>
            <ActivityIndicator/>
        </View>
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Welcome!</Text>
                <View style={styles.loginInnerContainer}>
                    <Text style={styles.loginText}>Username</Text>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                        placeholderTextColor="#A9A9A9"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInputRef?.current?.focus()}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.loginInnerContainer}>
                    <Text style={styles.loginText}>Password</Text>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Enter password"
                        placeholderTextColor="#A9A9A9"
                        returnKeyType="done"
                        ref={passwordInputRef}
                        onSubmitEditing={handleLogin}
                    />
                </View>
                <Button
                    loading={innerLoading}
                    onPress={handleLogin}
                    style={styles.loginButton}
                    text="Log in"
                >
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
        padding: 20,
    },
    loginContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: 300,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    loginInnerContainer: {
        marginVertical: 10,
        width: '100%',
    },
    loginTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginText: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 5,
    },
    loginInput: {
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        padding: 10,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        width: '100%',
        fontSize: 16,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    }
});

export default LoginPage;
