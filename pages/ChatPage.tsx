import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import io, { Socket } from 'socket.io-client';

const ChatPage = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState<Socket<any>>(undefined as any);

// Replace with your server address

    useEffect(() => {
        const _socket = io('https://victorious-leah-utch-5ee0a6e4.koyeb.app');
        setSocket(_socket)
    }, []);

    useEffect(() => {
        if(socket){
            socket.on('chat message', (msg:string) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            })
        }
    }, [socket]);

    const sendMessage = () => {
        if (input) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
                style={styles.messages}
            />
            <View >
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message"
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    messages: {
        flex: 1,
    },
    form: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        padding: 5,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    message: {
        padding: 10,
        backgroundColor: '#efefef',
        borderRadius: 5,
        marginVertical: 2,
    },
});

export default ChatPage;
