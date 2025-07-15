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

const agendaData = {
  '2025-07-15': [
    {
      horaInicio: '09:00',
      horaFim: '09:30',
      especialidade: 'Clínico Geral',
      tipo: 'Particular',
      paciente: 'Victor Araujo',
    },
    {
      horaInicio: '14:00',
      horaFim: '14:30',
      especialidade: 'Clínico Geral',
      tipo: 'Convênio',
      paciente: 'Natália Silva',
    },
  ],
  '2025-07-16': [
    {
      horaInicio: '11:00',
      horaFim: '11:30',
      especialidade: 'Clínico Geral',
      tipo: 'Convênio',
      paciente: 'Hugo Pontes',
    },
  ],
};

export default function AgendaScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const renderMenu = () => (
    <View style={styles.menu}>
      <TouchableOpacity>
        <Feather name="home" size={24} color={'#4B0056'} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="heart" size={24} color={'#B38CB4'} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="calendar" size={24} color={'#4B0056'} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="user" size={24} color={'#B38CB4'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Agenda</Text>

      {/* Calendário carrossel */}
      <CalendarStrip
        scrollable
        style={styles.calendar}
        calendarColor="#FAF3FB"
        calendarHeaderStyle={{ color: '#4B0056', fontWeight: '600' }}
        dateNumberStyle={{ color: '#4B0056', fontWeight: '600' }}
        dateNameStyle={{ color: '#4B0056' }}
        highlightDateNumberStyle={{ color: '#FFF' }}
        highlightDateNameStyle={{ color: '#FFF' }}
        highlightDateContainerStyle={{ backgroundColor: '#4B0056', borderRadius: 16 }}
        selectedDate={moment(selectedDate)}
        onDateSelected={(date) => setSelectedDate(date.format('YYYY-MM-DD'))}
        iconContainer={{ flex: 0.1 }}
      />

      <View style={styles.headerTabela}>
        <Text style={styles.colunaHora}>Hora</Text>
        <Text style={styles.colunaConsulta}>Consultas agendadas</Text>
        <Feather name="list" size={18} color="#4B0056" />
      </View>

      <FlatList
        data={agendaData[selectedDate] || []}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma consulta</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesConsulta', { consulta: item })}>
            <View style={styles.consulta}>
              <View style={styles.horario}>
                <Text style={styles.horaTexto}>{item.horaInicio}</Text>
                <Text style={styles.horaTextoCinza}>{item.horaFim}</Text>
              </View>
              <View style={styles.detalhesConsulta}>
                <Text style={styles.consultaTitulo}>{item.especialidade}</Text>
                <Text style={styles.consultaTipo}>{item.tipo}</Text>
                <Text style={styles.consultaPaciente}>{item.paciente}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {renderMenu()}
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  horaTexto: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  horaTextoCinza: {
    fontSize: 12,
    color: '#999',
  },
  detalhesConsulta: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingLeft: 15,
    flex: 1,
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
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
});
