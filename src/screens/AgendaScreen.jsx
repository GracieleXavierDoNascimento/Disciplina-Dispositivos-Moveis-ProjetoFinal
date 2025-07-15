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

const diasMes = [
  { dia: 12, semana: 'D' },
  { dia: 13, semana: 'S' },
  { dia: 14, semana: 'T', selecionado: true },
  { dia: 15, semana: 'Q' },
  { dia: 16, semana: 'S' },
  { dia: 23, semana: 'D' },
  { dia: 25, semana: 'S' },
];

const agendaData = [
  {
    horaInicio: '09:00',
    horaFim: '09:30',
    especialidade: 'Clínico Geral',
    tipo: 'Particular',
    paciente: 'Victor Araujo',
  },
  {
    horaInicio: '11:00',
    horaFim: '11:30',
    especialidade: 'Clínico Geral',
    tipo: 'Convênio',
    paciente: 'Hugo Pontes',
  },
  {
    horaInicio: '14:00',
    horaFim: '14:30',
    especialidade: 'Clínico Geral',
    tipo: 'Convênio',
    paciente: 'Natália Silva',
  },
];

export default function AgendaScreen() {
  const [activeTab, setActiveTab] = useState('Agenda');

  const renderMenu = () => (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => setActiveTab('Home')}>
        <Feather
          name="home"
          size={24}
          color={activeTab === 'Home' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('Favoritos')}>
        <Feather
          name="heart"
          size={24}
          color={activeTab === 'Favoritos' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('Agenda')}>
        <Feather
          name="calendar"
          size={24}
          color={activeTab === 'Agenda' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('Perfil')}>
        <Feather
          name="user"
          size={24}
          color={activeTab === 'Perfil' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Agenda</Text>

      <View style={styles.calendario}>
        <View style={styles.calendarioTopo}>
          <Text style={styles.mes}>Jun, 2025</Text>
          <Feather name="chevron-down" size={20} color="#4B0056" />
        </View>

        <View style={styles.diasSemana}>
          {diasMes.map((d) => (
            <TouchableOpacity
              key={d.dia}
              style={[
                styles.diaItem,
                d.selecionado && styles.diaSelecionado,
              ]}
            >
              <Text
                style={[
                  styles.textoSemana,
                  d.selecionado && styles.textoSemanaSelecionado,
                ]}
              >
                {d.semana}
              </Text>
              <Text
                style={[
                  styles.textoDia,
                  d.selecionado && styles.textoDiaSelecionado,
                ]}
              >
                {d.dia}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.headerTabela}>
        <Text style={styles.colunaHora}>Hora</Text>
        <Text style={styles.colunaConsulta}>Consultas agendadas</Text>
        <Feather name="list" size={18} color="#4B0056" />
      </View>

      <FlatList
        data={agendaData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.consulta}>
            <View style={styles.horario}>
              <Text style={styles.horaTexto}>
                {item.horaInicio}
              </Text>
              <Text style={styles.horaTextoCinza}>
                {item.horaFim}
              </Text>
            </View>

            <View style={styles.detalhesConsulta}>
              <Text style={styles.consultaTitulo}>
                {item.especialidade}
              </Text>
              <Text style={styles.consultaTipo}>{item.tipo}</Text>
              <Text style={styles.consultaPaciente}>
                {item.paciente}
              </Text>
            </View>
          </View>
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
  calendario: {
    backgroundColor: '#FAF3FB',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  calendarioTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  mes: {
    fontSize: 16,
    color: '#4B0056',
    fontWeight: '600',
  },
  diasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  diaItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  diaSelecionado: {
    backgroundColor: '#4B0056',
  },
  textoSemana: {
    fontSize: 12,
    color: '#4B0056',
  },
  textoSemanaSelecionado: {
    color: '#FFF',
  },
  textoDia: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0056',
  },
  textoDiaSelecionado: {
    color: '#FFF',
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
