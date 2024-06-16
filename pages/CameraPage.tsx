import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ModalCentered from '../components/ModalCentered';
import { Image } from 'expo-image'

const CameraPage = () => {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentPic, setCurrentPic] = useState(undefined as any);
    const [facing, setFacing] = useState('back' as any);
    const cameraRef = useRef(null as any);

    if (!cameraPermission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!cameraPermission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera and save pictures</Text>
                <Button onPress={() => { requestCameraPermission(); }} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current: any) => (current === 'back' ? 'front' : 'back'));
    }

    function takePic() {
        if (cameraRef.current) {
            setLoading(true)

            cameraRef.current.takePictureAsync({
                skipProcessing: true,
            }).then(async (photoData: any) => {
                try {
                    setCurrentPic(photoData)
                    setShowModal(true)
                } catch (error) {
                    console.error('Error saving picture:', error);
                }
            }).catch((error: any) => {
                console.error('Error taking picture:', error);
            }).finally(() => setLoading(true))
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
            <ModalCentered
                visible={showModal}
                onRequestClose={() => { setShowModal(false) }}
            >
                {currentPic && <Image
                    style={styles.image}
                    source={currentPic?.uri}
                    contentFit="cover"
                />}
            </ModalCentered>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Open Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takePic} />

                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing} >
                    <Text style={styles.buttonText} >Flip Camera</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', // Align items to the bottom
        backgroundColor: 'transparent',
        padding: 40,
        marginBottom: 20
    },
    button: {
        width: 70, // Set width and height to the same value to create a circle
        height: 70,
        borderRadius: 35, // Half of width or height to make it a circle
        backgroundColor: '#fff', // Background color for the button
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    flipButton: {
        alignSelf: 'flex-end',
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
});

export default CameraPage;
