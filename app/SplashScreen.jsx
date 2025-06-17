import { View, Text, StyleSheet } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OdontoSys</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B0056',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});
