import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const { width } = Dimensions.get('window');

export default function CadastroScreen({ navigation }) {
  const [tab, setTab] = useState('cadastro');
  const [tipoCadastro, setTipoCadastro] = useState(null);
  const [passo, setPasso] = useState(1);

  // Dados comuns
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');


  const [dataNascimento, setDataNascimento] = useState('');

  const [cro, setCro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  function formatarData(dataParam) {
    if (!dataParam) return '';
    const [dia, mes, ano] = dataParam.split('/');
    return `${ano}-${mes}-${dia}`;
  }

  /* ---------- PACIENTE ---------- */
  function handleCadastroPaciente() {
    if (!nome || !telefone || !dataNascimento || !email || !senha || !confirmaSenha) {
      console.log('Preencha todos os campos!');
      return;
    }
    if (senha !== confirmaSenha) {
      console.log('As senhas são diferentes!');
      return;
    }

    const pacienteRequest = {
      nome,
      email,
      senha,
      dataNascimento: formatarData(dataNascimento),
      telefone,
    };

    axios.post('http://localhost:8080/api/paciente', pacienteRequest)
      .then(() => {
        console.log('Paciente cadastrado com sucesso!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach(err => console.log(err.defaultMessage));
        } else {
          console.log(error.response?.data?.message || 'Erro ao cadastrar paciente.');
        }
      });
  }

  /* ---------- DENTISTA ---------- */
  function handleCadastroDentista() {
    if (!nome || !cro || !telefone || !email || !senha || !confirmaSenha ||
        !cidade || !cep || !bairro || !numero) {
      console.log('Preencha todos os campos!');
      return;
    }
    if (senha !== confirmaSenha) {
      console.log('As senhas são diferentes!');
      return;
    }

    const dentistaRequest = {
      nome,
      email,
      senha,
      cro,
      telefone,
      endereco: {
        cidade,
        cep,
        bairro,
        numero,
        complemento,
      },
    };

    axios.post('http://localhost:8080/api/dentista', dentistaRequest)
      .then(() => {
        console.log('Dentista cadastrado com sucesso!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach(err => console.log(err.defaultMessage));
        } else {
          console.log(error.response?.data?.message || 'Erro ao cadastrar dentista.');
        }
      });
  }

  function renderCadastroContent() {
    if (!tipoCadastro) {
      return (
        <>
          <TouchableOpacity style={styles.optionButton} onPress={() => setTipoCadastro('dentista')}>
            <Text style={styles.optionText}>Cadastrar como Dentista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => setTipoCadastro('paciente')}>
            <Text style={styles.optionText}>Cadastrar como Paciente</Text>
          </TouchableOpacity>
        </>
      );
    }

    /* DENTISTA – Passo 1 */
    if (tipoCadastro === 'dentista' && passo === 1) {
      return (
        <>
          <Text style={styles.label}>Nome*</Text>
          <TextInput value={nome} onChangeText={setNome} style={styles.input} />

          <Text style={styles.label}>CRO*</Text>
          <TextInput value={cro} onChangeText={setCro} style={styles.input} />

          <Text style={styles.label}>Telefone*</Text>
          <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} />

          <Text style={styles.label}>Email*</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} />

          <Text style={styles.label}>Senha*</Text>
          <TextInput value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />

          <Text style={styles.label}>Confirmar senha*</Text>
          <TextInput value={confirmaSenha} onChangeText={setConfirmaSenha} style={styles.input} secureTextEntry />

          <TouchableOpacity style={styles.button} onPress={() => setPasso(2)}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </>
      );
    }

    /* DENTISTA – Passo 2 */
    if (tipoCadastro === 'dentista' && passo === 2) {
      return (
        <>
          <Text style={styles.label}>Cidade*</Text>
          <TextInput value={cidade} onChangeText={setCidade} style={styles.input} />

          <Text style={styles.label}>CEP*</Text>
          <TextInput value={cep} onChangeText={setCep} style={styles.input} />

          <Text style={styles.label}>Bairro*</Text>
          <TextInput value={bairro} onChangeText={setBairro} style={styles.input} />

          <Text style={styles.label}>Número*</Text>
          <TextInput value={numero} onChangeText={setNumero} style={styles.input} />

          <Text style={styles.label}>Complemento</Text>
          <TextInput value={complemento} onChangeText={setComplemento} style={styles.input} />

          <TouchableOpacity style={styles.button} onPress={handleCadastroDentista}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </>
      );
    }

    /* PACIENTE */
    if (tipoCadastro === 'paciente') {
      return (
        <>
          <Text style={styles.label}>Nome</Text>
          <TextInput value={nome} onChangeText={setNome} style={styles.input} />

          <Text style={styles.label}>Telefone</Text>
          <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} />

          <Text style={styles.label}>Data nascimento</Text>
          <TextInputMask
            type="datetime"
            options={{ format: 'DD/MM/YYYY' }}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            style={styles.input}
            placeholder="dd/mm/aaaa"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} />

          <Text style={styles.label}>Senha</Text>
          <TextInput value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput value={confirmaSenha} onChangeText={setConfirmaSenha} style={styles.input} secureTextEntry />

          <TouchableOpacity style={styles.button} onPress={handleCadastroPaciente}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </>
      );
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFF3FD', '#FFF3FD']} style={styles.header}>
        {tipoCadastro && (
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              if (tipoCadastro === 'dentista' && passo === 2) {
                setPasso(1);
              } else {
                setTipoCadastro(null);
                setPasso(1);
              }
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#4B0056" opacity="0.5" />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>OdontoSys</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.tab, tab === 'login' && styles.activeTab]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTab('cadastro');
              setTipoCadastro(null);
              setPasso(1);
            }}
          >
            <Text style={[styles.tab, tab === 'cadastro' && styles.activeTab]}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>{renderCadastroContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#FFF3FD',
    paddingTop: 100,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },

  backIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4B0056',
    marginBottom: 20,
  },

  tabContainer: { flexDirection: 'row', position: 'absolute', bottom: 10 },

  tab: {
    fontSize: 20,
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

  content: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },

  label: { color: '#bbb', fontSize: 14, marginBottom: 5 },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 8,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#4B0056',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
    alignSelf: 'stretch',
  },

  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  optionButton: {
    backgroundColor: '#7B206F',
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignSelf: 'stretch',
  },

  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
