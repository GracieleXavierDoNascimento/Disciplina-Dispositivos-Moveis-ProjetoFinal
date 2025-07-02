import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function RecadosScreen() {
  const recados = [
    {
      titulo: 'Alteração no horário de atendimento',
      data: '15/06/2025',
      mensagem: 'Na próxima semana, o consultório funcionará das 8h às 17h devido ao feriado municipal.',
    },
    {
      titulo: 'Protocolo de segurança COVID-19',
      data: '10/06/2025',
      mensagem: 'Lembre-se de usar máscara ao entrar na clínica e mantenha o distanciamento social nas áreas comuns.',
    },
    {
      titulo: 'Promoção de limpeza dentária',
      data: '05/06/2025',
      mensagem: 'Agende sua limpeza dentária até o final do mês e ganhe 10% de desconto no procedimento.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recados e Comunicados</Text>

      <FlatList
        data={recados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recadoItem}>
            <Text style={styles.recadoTitulo}>{item.titulo}</Text>
            <Text style={styles.recadoData}>{item.data}</Text>
            <Text style={styles.recadoMensagem}>{item.mensagem}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.semRecados}>Nenhum recado disponível no momento.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4B0056', marginBottom: 20, textAlign: 'center' },
  recadoItem: {
    backgroundColor: '#f4eef6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  recadoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0056',
  },
  recadoData: {
    fontSize: 13,
    color: '#666',
    marginVertical: 5,
  },
  recadoMensagem: {
    fontSize: 15,
    color: '#333',
  },
  semRecados: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
