import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PerfilPacienteScreen() {
  const dados = {
    nome: 'Maria Eduarda',
    dataNascimento: '12/04/2018',
    telefone: '(11) 99999-9999',
    responsavel: 'Ana Paula Silva',
    alergias: 'Nenhuma',
    observacoes: 'Não gosta de anestesia',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Paciente</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{dados.nome}</Text>

        <Text style={styles.label}>Data de Nascimento:</Text>
        <Text style={styles.info}>{dados.dataNascimento}</Text>

        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.info}>{dados.telefone}</Text>

        <Text style={styles.label}>Responsável:</Text>
        <Text style={styles.info}>{dados.responsavel}</Text>

        <Text style={styles.label}>Alergias:</Text>
        <Text style={styles.info}>{dados.alergias}</Text>

        <Text style={styles.label}>Observações:</Text>
        <Text style={styles.info}>{dados.observacoes}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4B0056', textAlign: 'center', marginBottom: 20 },
  infoBox: {
    backgroundColor: '#f4eef6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B0056',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4B0056',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
