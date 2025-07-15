import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const minDim = Math.min(width, height);

  return (
    <LinearGradient colors={['#4B0056', '#000000']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContent}>
          <Text style={[styles.title, { fontSize: minDim * 0.1 }]}>OdontoSys</Text>

          <Image
            source={require('../../assets/logo.png')}
            style={[styles.logo, {
              width: width * 0.6,
              height: width * 0.6,
              maxHeight: height * 0.3,
              marginTop: 20,
              marginBottom: 20, // controla o espaço entre logo e botão
            }]}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={[styles.button, { width: width * 0.85, paddingVertical: height * 0.02 }]}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={[styles.buttonText, { fontSize: minDim * 0.045 }]}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    // definido no componente
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#4B0056',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
