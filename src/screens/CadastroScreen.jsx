import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>

      <LinearGradient
              colors={['#FFF3FD', '#FFF3FD']}
              style={styles.header}
            >
              <Text style={[styles.title]}>OdontoSys</Text>
              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.tab}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={[styles.tab, styles.activeTab]}>Cadastrar-se</Text>
                </TouchableOpacity>
              </View>
        </LinearGradient>
    

      <View style={styles.content}>

        <TextInput
          placeholder="Informe um email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#555"
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#555"
        />
         <TextInput
          placeholder="Confirme a senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#555"
        />

        <TouchableOpacity>
          <Text style={styles.link}>Forgot passcode?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom:0

  },
  tab: {
    fontSize: 20,
    marginHorizontal: 20,
    color: '#4B0056',
    opacity: 0.7,
  },
  activeTab: {
    fontWeight: 'bold',
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
    marginTop: 30,
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
