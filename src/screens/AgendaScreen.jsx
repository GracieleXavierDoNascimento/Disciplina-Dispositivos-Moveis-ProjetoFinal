// src/screens/AgendaScreen.js
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { showErrorNotification } from '../services/notificationService';

import Menu from '../components/Menu';

export default function AgendaScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD')
  );
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dentistaId, setDentistaId] = useState(null);

  // Função para extrair o ID do dentista do token
  const getDentistaIdFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Decodificar o JWT (assumindo que é um JWT padrão)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
      }
    } catch (error) {
      console.error('Erro ao extrair ID do token:', error);
    }
    return null;
  };

  // Função para buscar consultas da API
  const fetchConsultas = async (date, dentistaId) => {
    if (!dentistaId) return;

    setLoading(true);
    try {
      // Usar a data no formato YYYY-MM-DD como recebida
      const response = await fetch(
        `http://localhost:8080/api/consulta/agenda/${dentistaId}?data=${date}`
      );

      if (response.ok) {
        const data = await response.json();

        // Mapear dados da API para a estrutura esperada e filtrar apenas consultas agendadas
        const consultasFormatadas = data
          .filter(consulta => consulta.statusConsulta === 1)
          .map(consulta => ({
            id: consulta.id,
            horaConsulta: moment(consulta.dataConsulta).format('HH:mm'),
            dataConsulta: consulta.dataConsulta,
            paciente: consulta.pacienteNome,
            motivo: consulta.motivoConsulta,
            procedimentosRealizados: consulta.procedimentosRealizados,
            avaliacao: consulta.avaliacao,
            recomendacoes: consulta.recomendacoes,
            voltaEsperada: consulta.voltaEsperada,
            statusConsulta: consulta.statusConsulta,
          }));

        setConsultas(consultasFormatadas);
      } else {
        throw new Error('Erro ao buscar consultas');
      }
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      showErrorNotification('Não foi possível carregar as consultas');
      setConsultas([]);
    } finally {
      setLoading(false);
    }
  };

  // Inicializar o componente
  useEffect(() => {
    const initializeData = async () => {
      const id = await getDentistaIdFromToken();
      setDentistaId(id);
      if (id) {
        await fetchConsultas(selectedDate, id);
      }
    };

    initializeData();
  }, []);

  // Buscar consultas quando a data for alterada
  const handleDateSelect = async (date) => {
    const newDate = date.format('YYYY-MM-DD');
    setSelectedDate(newDate);
    if (dentistaId) {
      await fetchConsultas(newDate, dentistaId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Agenda</Text>

      <CalendarStrip
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
        onDateSelected={handleDateSelect}
        iconContainer={{ flex: 0.1 }}
      />

      <View style={styles.headerTabela}>
        <Text style={styles.colunaHora}>Hora</Text>
        <Text style={styles.colunaConsulta}>Consultas agendadas</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#4B0056" />
        ) : (
          <Feather name="list" size={18} color="#4B0056" />
        )}
      </View>

      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Carregando...' : 'Nenhuma consulta'}
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
                <Text style={styles.horaTexto}>{item.horaConsulta}</Text>
              </View>
              <View style={styles.detalhesConsulta}>
                <View>
                  <Text style={styles.consultaPaciente}>{item.paciente}</Text>
                  <Text style={styles.consultaMotivo}>{item.motivoConsulta || "Motivo não informado"}</Text>
                </View>
                <View style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      item.statusConsulta === 1
                        ? 'rgba(0, 123, 255, 0.2)' // Azul com transparência
                        : item.statusConsulta === 2
                          ? 'rgba(40, 167, 69, 0.2)' // Verde com transparência
                          : 'rgba(220, 53, 69, 0.2)' // Vermelho com transparência
                  }
                ]}>
                  <Text style={[
                    styles.statusText,
                    {
                      color:
                        item.statusConsulta === 1
                          ? '#007bff' // Azul
                          : item.statusConsulta === 2
                            ? '#28a745' // Verde
                            : '#dc3545' // Vermelho
                    }
                  ]}>
                    {
                      item.statusConsulta === 1
                        ? "Agendada"
                        : item.statusConsulta === 2
                          ? "Finalizada"
                          : "Cancelada"
                    }
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Menu />
    </SafeAreaView>
  );
}

// ...existing code... (styles permanecem os mesmos)
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
  detalhesConsulta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  consultaPaciente: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  consultaMotivo: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});