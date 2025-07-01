import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function AgendaScreen({ navigation }) {
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
          <TouchableOpacity
            style={styles.agendaItem}
            onPress={() =>
              navigation.navigate('DetalhesAgenda', {
                hora: item.hora,
                atividade: item.atividade,
              })
            }
          >
            <Text style={styles.hora}>{item.hora}</Text>
            <Text style={styles.atividade}>{item.atividade}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.semAtividades}>Nenhuma atividade</Text>
        }
      />
    </View>
  );
}
