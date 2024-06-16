import { Text, StyleSheet, ScrollView, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

function HomePage ({ navigation }:Props) {

  // router.

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Text>Hello!</Text>

      <Button title='Take some pics!' onPress={() => navigation.navigate('Camera')}></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  }
});

export default HomePage;
