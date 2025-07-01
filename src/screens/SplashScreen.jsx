import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  return (
    <LinearGradient colors={['#4B0056', '#000000']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>OdontoSys</Text>

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.9,
    height: width * 0.9,
  },
  button: {
    backgroundColor: '#fff',
    width: width * 0.9,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#4B0056',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
