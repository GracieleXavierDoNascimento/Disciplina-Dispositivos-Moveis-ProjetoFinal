import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffe3eb', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>OdontoSys</Text>

      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <Text style={[styles.tab, styles.activeTab]}>Login</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.tab}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#555"
        />

        <TextInput
          placeholder="Password"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#555"
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot passcode?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agenda')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    marginTop: 20,
    fontSize: 70,
    fontWeight: 'bold',
    color: '#4B0056',
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  tab: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#4B0056',
    borderBottomWidth: 0, // sem linha nos tabs não ativos
    paddingBottom: 5, // só para dar espaço pra linha
  },
  activeTab: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    borderBottomWidth: 3,  // linha de 3px só no ativo
  },
  content: {
    flex: 1,
    justifyContent: 'center', // CENTRALIZA VERTICALMENTE
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 10,
    marginBottom: 40,
    marginTop: 40,
    fontSize: 20,
    color: '#000',
  },
  link: {
    color: '#4B0056',
    textAlign: 'right',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4B0056',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
