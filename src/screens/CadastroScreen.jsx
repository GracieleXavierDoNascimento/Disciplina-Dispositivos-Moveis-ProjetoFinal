import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const { width } = Dimensions.get('window');

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');

  function formatarData(dataParam) {

    if (!dataParam) return '';

    const [dia, mes, ano] = dataParam.split('/');
    return `${ano}-${mes}-${dia}`;
  }

  const confirmarCadastro = () => {
    if (!nome || !telefone || !dataNascimento || !email || !senha || !confirmaSenha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (senha !== confirmaSenha) {
      console.log("As senhas são diferentes!");
      return;
    }

    const pacienteRequest = {
      nome,
      email,
      senha,
      dataNascimento: formatarData(dataNascimento),
      telefone
    }

    axios.post('http://localhost:8080/api/paciente', pacienteRequest)
      .then(response => {
        console.log('Paciente cadastrado com sucesso!');
        navigation.navigate('Login')
      })
      .catch(error => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach(err => console.log(err.defaultMessage));
        } else {
          console.log(error.response?.data?.message || 'Erro ao cadastrar paciente.');
        }
      })
  }

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#FFF3FD', '#FFF3FD']}
        style={styles.header}
      >
        <Text style={styles.title}>OdontoSys</Text>

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
        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            style={styles.value}
            placeholderTextColor="#555"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>telefone</Text>
          <TextInput
            value={telefone}
            onChangeText={setTelefone}
            style={styles.value}
            keyboardType="phone-pad"
            placeholderTextColor="#555"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data nascimento</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            style={styles.value}
            placeholder="dd/mm/aaaa"
            placeholderTextColor="#555"
            keyboardType="numeric"
          />
        </View>


        <View style={styles.field}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.value}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#555"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            style={styles.value}
            secureTextEntry
            placeholderTextColor="#555"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            value={confirmaSenha}
            onChangeText={setConfirmaSenha}
            style={styles.value}
            secureTextEntry
            placeholderTextColor="#555"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={confirmarCadastro}>
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
    backgroundColor: '#FFF3FD',
    paddingTop: 100,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4B0056',
    marginBottom: 20,
  },
  tabContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
  },
  tab: {
    fontSize: 20,
    marginHorizontal: 20,
    marginHorizontal: 20,
    color: '#4B0056',
    opacity: 0.7,

  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#4B0056',
    paddingBottom: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  field: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 5,
  },
  label: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#4B0056',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
