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

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      {/* TOPO COM GRADIENTE E TABS */}
      <LinearGradient
        colors={['#FFF3FD', '#FFF3FD']}
        style={styles.header}
      >
        <Text style={[styles.title]}>OdontoSys</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity>
            <Text style={[styles.tab, styles.activeTab]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.tab}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* ÁREA DE INPUTS */}
      <View style={styles.formArea}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, email && styles.filledInput]}
          autoCapitalize="none"
          placeholderTextColor="#555"
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          style={[styles.input, senha && styles.filledInput]}
          secureTextEntry
          placeholderTextColor="#555"
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO FIXADO NA BASE */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // TOPO COLORIDO
  header: {
    flex: 4, // 40%
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex',
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 60,
    fontWeight: 900,
    color: '#4B0056',
    marginBottom: 20,
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
    opacity: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#4B0056',
    paddingBottom: 4,
  },

  // FORMULÁRIO
  formArea: {
    flex: 4.5, // 45%
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 10,
    marginBottom: 25,
    fontSize: 16,
    color: '#000',
  },
  filledInput: {
    fontWeight: 'bold',
  },
  link: {
    color: '#4B0056',
    textAlign: 'right',
    fontWeight: '500',
    marginTop: 10,
  },

  // BOTÃO
  bottomArea: {
    flex: 1.5, // 15%
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#4B0056',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
