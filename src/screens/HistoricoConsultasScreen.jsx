// src/screens/HistoricoConsultasScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import Menu from '../components/Menu';

const agendaData = {
  '2025-07-14': [
    {
      horaInicio: '09:00',
      horaFim: '09:30',
      especialidade: 'Clínico Geral',
      tipo: 'Particular',
      paciente: 'Victor Araujo',
    },
  ],
  '2025-07-13': [
    {
      horaInicio: '14:00',
      horaFim: '14:30',
      especialidade: 'Clínico Geral',
      tipo: 'Convênio',
      paciente: 'Natália Silva',
    },
  ],
};

export default function HistoricoConsultasScreen({ navigation }) {
  const hoje = moment();
  const [selectedDate, setSelectedDate] = useState(hoje.format('YYYY-MM-DD'));

  const isPastDate = (date) => moment(date).isBefore(hoje, 'day');

  const consultasDoDia = isPastDate(selectedDate)
    ? agendaData[selectedDate] || []
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Histórico de Consultas</Text>

      <CalendarStrip
        scrollable
        style={styles.calendar}
        calendarColor="#FAF3FB"
        calendarHeaderStyle={{ color: '#4B0056', fontWeight: '600' }}
        dateNumberStyle={{ color: '#4B0056', fontWeight: '600' }}
        dateNameStyle={{ color: '#4B0056' }}
        highlightDateNumberStyle={{ color: '#FFF' }}
        highlightDateNameStyle={{ color: '#FFF' }}
        highlightDateContainerStyle={{
          backgroundColor: '#4B0056',
          borderRadius: 16,
        }}
        selectedDate={moment(selectedDate)}
        onDateSelected={(date) => setSelectedDate(date.format('YYYY-MM-DD'))}
        iconContainer={{ flex: 0.1 }}
      />

      <View style={styles.headerTabela}>
        <Text style={styles.colunaHora}>Hora</Text>
        <Text style={styles.colunaConsulta}>Consultas realizadas</Text>
        <Feather name="clock" size={18} color="#4B0056" />
      </View>

      <FlatList
        data={consultasDoDia}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma consulta realizada nesse dia
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetalhesConsulta', { consulta: item })
            }
          >
            <View style={styles.consulta}>
              <View style={styles.horario}>
                <Text style={styles.horaTexto}>{item.horaInicio}</Text>
                <Text style={styles.horaTextoCinza}>{item.horaFim}</Text>
              </View>
              <View style={styles.detalhesConsulta}>
                <Text style={styles.consultaTitulo}>
                  {item.especialidade}
                </Text>
                <Text style={styles.consultaTipo}>{item.tipo}</Text>
                <Text style={styles.consultaPaciente}>{item.paciente}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  calendar: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  headerTabela: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  colunaHora: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B0056',
    width: 50,
  },
  colunaConsulta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B0056',
    flex: 1,
  },
  consulta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  horario: {
    width: 60,
    justifyContent: 'center',
  },
  horaTexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  horaTextoCinza: {
    fontSize: 12,
    color: '#999',
  },
  detalhesConsulta: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingLeft: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  consultaTitulo: {
    color: '#4B0056',
    fontWeight: 'bold',
    fontSize: 14,
  },
  consultaTipo: {
    fontSize: 13,
    color: '#666',
  },
  consultaPaciente: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
