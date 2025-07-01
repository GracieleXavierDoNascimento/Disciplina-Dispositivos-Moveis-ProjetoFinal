import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function VerificationCodeScreen() {
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      // foco automático no próximo campo
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      // TODO: validar código
      router.push('/new-password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificação</Text>
      <Text style={styles.description}>Insira o código enviado por email</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            id={`code-${index}`}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4B0056', textAlign: 'center' },
  description: { fontSize: 16, color: '#666', marginVertical: 20, textAlign: 'center' },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 24,
    textAlign: 'center',
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
});
