import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";

interface ButtonProps {
    loading: boolean;
    onPress: TouchableOpacityProps['onPress'];
    style?: ViewStyle
    text: string;
}

const Button: React.FC<ButtonProps> = ({ loading, onPress, style, text }) => {
    return (<TouchableOpacity onPress={onPress} style={style ?? styles.defaultButton}>
        {loading
            ? <ActivityIndicator />
            : <Text style={styles.loginButtonText}>{text}</Text>
        }
    </TouchableOpacity>)
}

export default Button;

const styles = StyleSheet.create({
    defaultButton: {
        margin: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});