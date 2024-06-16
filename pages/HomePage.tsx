import { Text, StyleSheet, ScrollView } from 'react-native';
function HomePage() {

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Text>Hello! Im authenticated!</Text>
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
