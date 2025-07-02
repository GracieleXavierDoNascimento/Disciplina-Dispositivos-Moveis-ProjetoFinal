import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function AgendaScreen() {
  const [selectedDay, setSelectedDay] = useState('Segunda');

  const agenda = {
    Segunda: [
      { hora: '08:00', atividade: 'Consulta - Avaliação' },
      { hora: '10:00', atividade: 'Limpeza dentária' },
    ],
    Terça: [
      { hora: '09:00', atividade: 'Canal - Dente 34' },
    ],
    Quarta: [],
    Quinta: [
      { hora: '11:00', atividade: 'Consulta - Revisão' },
    ],
    Sexta: [],
  };

  const diasDaSemana = Object.keys(agenda);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda da Semana</Text>

      <View style={styles.diaSelector}>
        {diasDaSemana.map((dia) => (
          <TouchableOpacity
            key={dia}
            style={[
              styles.diaBotao,
              selectedDay === dia && styles.diaBotaoSelecionado,
            ]}
            onPress={() => setSelectedDay(dia)}
          >
            <Text
              style={[
                styles.diaTexto,
                selectedDay === dia && styles.diaTextoSelecionado,
              ]}
            >
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={agenda[selectedDay]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.agendaItem}>
            <Text style={styles.hora}>{item.hora}</Text>
            <Text style={styles.atividade}>{item.atividade}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.semAtividades}>Nenhuma atividade</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4B0056', marginBottom: 20 },
  diaSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  diaBotao: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  diaBotaoSelecionado: {
    backgroundColor: '#4B0056',
  },
  diaTexto: {
    color: '#4B0056',
    fontWeight: '600',
  },
  diaTextoSelecionado: {
    color: '#fff',
  },
  agendaItem: {
    backgroundColor: '#f4eef6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0056',
  },
  atividade: {
    fontSize: 14,
    color: '#333',
  },
  semAtividades: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
