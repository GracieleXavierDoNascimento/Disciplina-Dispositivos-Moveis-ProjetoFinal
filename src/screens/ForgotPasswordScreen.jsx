import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [passo, setPasso] = useState(1);
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleSendEmail = () => {
    axios.post('http://localhost:8080/esqueci-senha/enviar-email', { email })
      .then(() => {
        console.log("E-mail enviado!");
        setPasso(2);
      }).catch(error => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach(err => console.log(err.defaultMessage));
        } else {
          console.log(error.response?.data?.message || 'Erro ao enviar e-mail.');
        }
      });
  };

  const handleValidarCodigo = () => {
    console.log('Código digitado:', codigo);
    setPasso(3);
  };

  const handleRedefinirSenha = () => {
    if (novaSenha !== confirmaSenha) {
      console.log('As senhas são diferentes!');
      return;
    }

    const forgotRequest = {
      codigo,
      novaSenha
    };

    axios.post('http://localhost:8080/esqueci-senha/redefinir-senha', forgotRequest)
      .then(() => {
        console.log("Senha redefinida com sucesso!");
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.response?.data?.erros) {
          error.response.data.erros.forEach(err => console.log(err.defaultMessage));
        } else {
          console.log(error.response?.data?.message || 'Erro ao redefinir a senha.');
        }
      });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recuperar Senha</Text>

      {passo === 1 && (
        <>
          <Text style={styles.description}>
            Insira seu email para receber um código de verificação.
          </Text>

          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Enviar código</Text>
          </TouchableOpacity>
        </>
      )}

      {passo === 2 && (
        <>
          <Text style={styles.description}>
            Insira o código recebido via e-mail.
          </Text>

          <TextInput
            placeholder="Digite o código"
            value={codigo}
            onChangeText={setCodigo}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleValidarCodigo}>
            <Text style={styles.buttonText}>Validar código</Text>
          </TouchableOpacity>
        </>
      )}

      {passo === 3 && (
        <>
          <Text style={styles.description}>
            Digite a nova senha.
          </Text>

          <TextInput
            placeholder="Nova senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            style={styles.input}
            secureTextEntry={true}
          />

          <TextInput
            placeholder="Confirmar nova senha"
            value={confirmaSenha}
            onChangeText={setConfirmaSenha}
            style={styles.input}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleRedefinirSenha}>
            <Text style={styles.buttonText}>Redefinir senha</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4B0056', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4B0056',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#4B0056', textAlign: 'center', textDecorationLine: 'underline' },
  backIcon: {
  position: 'absolute',
  top: 50,
  left: 20,
  zIndex: 1,
},

});
