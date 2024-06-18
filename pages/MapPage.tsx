import {  LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Socket, io } from 'socket.io-client';
import * as Crypto from "expo-crypto"
const USER_ID =  Crypto.randomUUID()

function MapPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [location, setLocation] = useState<LocationObject>(null as any);
    const [socket, setSocket] = useState<Socket<any>>(undefined as any);
    const [locations, setLocations] = useState<object[]>([]);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const _socket = io('https://victorious-leah-utch-5ee0a6e4.koyeb.app');
        setSocket(_socket)
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('location actualization', (receivedLocation:any) => {
                setLocations((prevLocations) => {
                    // Find the index of the location with the same ID
                    const index = prevLocations.findIndex((loc:any) => loc.id === receivedLocation.id);
                    if (index !== -1) {
                        // Replace the existing location with the new received location
                        prevLocations[index] = receivedLocation;
                    } else {
                        // If the location doesn't exist, add it to the list
                        prevLocations.push(receivedLocation);
                    }
                    return [...prevLocations];
                });
            });
        }
    }, [socket]);
    


    useEffect(() => {
        (async () => {

            let { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            await startTrace()
        })();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('location actualization', { ...location.coords, ...{ id:USER_ID } });
        }
    }, [location]);


    async function startTrace() {

        let { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        const _location = await getCurrentPositionAsync()
        setLocation(_location)
        setLoading(false)
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    if (loading) {
        return <View style={styles.container}>
            <ActivityIndicator />
        </View>
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }} >
                {locations.map((_location:any) => <Marker
                    key={_location.id}
                    coordinate={{ latitude: _location.latitude, longitude: _location.longitude }}
                    image={require('../assets/favicon.png')}
                />)

                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapPage