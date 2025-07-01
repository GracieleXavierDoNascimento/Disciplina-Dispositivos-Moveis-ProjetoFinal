import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function DiarioScreen() {
  const registros = [
    {
      data: '17/06/2025',
      descricao: 'Consulta para limpeza e aplicação de flúor realizada com sucesso.',
    },
    {
      data: '14/06/2025',
      descricao: 'Paciente relatou sensibilidade no dente 14, foi indicado cuidado com alimentos gelados.',
    },
    {
      data: '12/06/2025',
      descricao: 'Agendada próxima consulta para avaliação ortodôntica.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Atendimentos</Text>

      <FlatList
        data={registros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.diarioItem}>
            <Text style={styles.data}>{item.data}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.semDados}>Nenhum registro disponível.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4B0056', marginBottom: 20, textAlign: 'center' },
  diarioItem: {
    backgroundColor: '#f4eef6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  data: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B0056',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 16,
    color: '#333',
  },
  semDados: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
