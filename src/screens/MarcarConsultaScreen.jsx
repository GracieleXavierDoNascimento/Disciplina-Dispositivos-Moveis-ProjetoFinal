import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import Menu from '../components/Menu';
import { showErrorNotification, showSuccessNotification } from '../services/notificationService';

export default function MarcarConsultaScreen({ navigation }) {
  const hoje = new Date();
  const [croDentista, setCroDentista] = useState('');
  const [croConfirmado, setCroConfirmado] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [loading, setLoading] = useState(false);

  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const displayMonthIndex = (mesAtual + monthOffset + 12) % 12;
  const displayYear = anoAtual + Math.floor((mesAtual + monthOffset) / 12);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const allTimes = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];

  const daysInMonth = new Date(displayYear, displayMonthIndex + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const fetchDisponibilidade = async () => {
    if (!croDentista.trim()) {
      showErrorNotification('Por favor, informe o CRO do dentista.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/diasAtendimento/${croDentista.trim()}`);
      if (response.ok) {
        const data = await response.json();
        setDisponibilidade(data.disponibilidade || []);
        setCroConfirmado(true);
        setSelectedDay(null);
        setSelectedTime(null);
        showSuccessNotification('Disponibilidade carregada com sucesso!');
      } else {
        showErrorNotification('Erro ao buscar disponibilidade do dentista.');
      }
    } catch (error) {
      showErrorNotification('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableDates = () => {
    return disponibilidade.map(item => {
      const [year, month, day] = item.data.split('-');
      return {
        day: parseInt(day),
        month: parseInt(month) - 1,
        year: parseInt(year),
        horarios: item.horarios
      };
    }).filter(item => 
      item.month === displayMonthIndex && item.year === displayYear
    );
  };

  const getAvailableTimesForDay = (day) => {
    const availableDate = getAvailableDates().find(item => item.day === day);
    return availableDate ? availableDate.horarios : [];
  };

  const isDateAvailable = (day) => {
    return getAvailableDates().some(item => item.day === day);
  };

  const handleDaySelect = (day) => {
    if (!isDateAvailable(day)) return;
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  const handlePrevMonth = () => {
    setMonthOffset((offset) => offset - 1);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setMonthOffset((offset) => offset + 1);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const getPacienteIdFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.id || decoded.sub || decoded.userId;
      }
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
    return null;
  };

  const handleAgendar = async () => {
    if (!croConfirmado) {
      showErrorNotification('Por favor, confirme o CRO do dentista primeiro.');
      return;
    }
    if (!selectedDay || !selectedTime) {
      showErrorNotification('Por favor, selecione data e horário.');
      return;
    }

    setLoading(true);
    try {
      const pacienteId = await getPacienteIdFromToken();
      if (!pacienteId) {
        showErrorNotification('Erro ao identificar o paciente. Faça login novamente.');
        return;
      }

      const dia = String(selectedDay).padStart(2, '0');
      const mes = String(displayMonthIndex + 1).padStart(2, '0');
      const ano = String(displayYear);
      const dataHora = `${ano}-${mes}-${dia} ${selectedTime}:00`;

      const consultaData = {
        dentistaCro: croDentista.trim(),
        pacienteId: parseInt(pacienteId),
        dataHora: dataHora,
        motivo: motivoConsulta.trim() || 'Não informado',
      };

      const response = await fetch('http://localhost:8080/api/consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultaData)
      });

      if (response.ok) {
        showSuccessNotification('Consulta agendada com sucesso!');
        navigation.navigate('ConsultasAgendadasPaciente', { 
          consulta: {
            data: `${dia}/${mes}/${ano}`,
            hora: selectedTime,
            croDentista: croDentista.trim(),
            nomeDentista: 'Dr. Taliana Carvalho',
            especialidade: 'Ortodontista',
            local: 'Jaboatão dos Guararapes/PE',
            motivo: motivoConsulta.trim() || 'Não informado',
          }
        });
      } else {
        const errorData = await response.json();
        showErrorNotification(errorData.message || 'Erro ao agendar consulta.');
      }
    } catch (error) {
      showErrorNotification('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const availableTimes = selectedDay ? getAvailableTimesForDay(selectedDay) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Marcar consulta</Text>

        <View style={styles.card}>
          {/* Campo para CRO do dentista */}
          <Text style={styles.subtitle}>CRO do Dentista:</Text>
          <View style={styles.croContainer}>
            <TextInput
              style={[styles.input, styles.croInput]}
              placeholder="Digite o CRO do dentista"
              value={croDentista}
              onChangeText={setCroDentista}
              editable={!croConfirmado}
            />
            <TouchableOpacity 
              style={[styles.croButton, croConfirmado && styles.croButtonConfirmed]} 
              onPress={croConfirmado ? () => setCroConfirmado(false) : fetchDisponibilidade}
              disabled={loading}
            >
              <Text style={styles.croButtonText}>
                {loading ? '...' : croConfirmado ? 'Alterar' : 'Confirmar'}
              </Text>
            </TouchableOpacity>
          </View>

          {croConfirmado && (
            <>
              <Text style={styles.subtitle}>Selecione uma data:</Text>

              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={handlePrevMonth}>
                  <Feather name="chevron-left" size={24} color="#4B0056" />
                </TouchableOpacity>
                <Text style={styles.monthText}>{monthNames[displayMonthIndex]} {displayYear}</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                  <Feather name="chevron-right" size={24} color="#4B0056" />
                </TouchableOpacity>
              </View>

              <View style={styles.weekDaysRow}>
                {weekDays.map((day) => (
                  <Text key={day} style={styles.weekDayText}>{day}</Text>
                ))}
              </View>

              <View style={styles.calendar}>
                {daysOfMonth.map((day) => {
                  const isAvailable = isDateAvailable(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleDaySelect(day)}
                      style={[
                        styles.day,
                        selectedDay === day && styles.daySelected,
                        isAvailable && styles.dayAvailable,
                        !isAvailable && styles.dayUnavailable
                      ]}
                      disabled={!isAvailable}
                    >
                      <Text style={{
                        color: selectedDay === day ? '#fff' : 
                               isAvailable ? '#4B0056' : '#ccc',
                        fontWeight: selectedDay === day ? 'bold' : 'normal',
                      }}>{day}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {selectedDay && (
                <>
                  <Text style={styles.subtitle}>Horários disponíveis:</Text>
                  <View style={styles.timesGrid}>
                    {availableTimes.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleTimeSelect(time)}
                        style={[
                          styles.timeButton,
                          selectedTime === time && styles.timeButtonSelected,
                        ]}
                      >
                        <Text style={{
                          color: selectedTime === time ? '#fff' : '#4B0056',
                        }}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              <Text style={styles.subtitle}>Motivo da consulta (opcional):</Text>
              <TextInput
                style={styles.input}
                placeholder="Descreva brevemente o motivo da consulta"
                value={motivoConsulta}
                onChangeText={setMotivoConsulta}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity 
                style={[styles.saveBtn, loading && styles.saveBtnDisabled]} 
                onPress={handleAgendar}
                disabled={loading || !selectedDay || !selectedTime}
              >
                <Text style={styles.saveBtnText}>
                  {loading ? 'Agendando...' : 'Marcar Consulta'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20, paddingBottom: 80 },
  title: {
    textAlign: 'center', fontSize: 18,
    fontWeight: 'bold', color: '#4B0056', marginBottom: 15,
  },
  subtitle: {
    fontSize: 14, fontWeight: '600',
    marginTop: 10, marginBottom: 5, color: '#4B0056',
  },
  card: {
    backgroundColor: '#FAF3FB', borderRadius: 20, padding: 20,
  },
  calendarHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  monthText: { fontSize: 16, fontWeight: '600', color: '#4B0056' },
  weekDaysRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6,
  },
  weekDayText: {
    width: '13%', textAlign: 'center', fontSize: 12,
    fontWeight: '600', color: '#4B0056',
  },
  calendar: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
  },
  day: {
    width: '13%', padding: 10, marginVertical: 4, alignItems: 'center',
    borderRadius: 10, borderWidth: 1, borderColor: '#DDD', backgroundColor: '#fff',
  },
  daySelected: { backgroundColor: '#4B0056' },
  timesGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', marginTop: 10,
  },
  timeButton: {
    width: '30%', padding: 10, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#B38CB4',
    borderRadius: 10, alignItems: 'center', marginVertical: 6,
  },
  timeButtonSelected: { backgroundColor: '#4B0056' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B38CB4',
    padding: 10,
    marginTop: 6,
    minHeight: 40,
    color: '#4B0056',
  },
  saveBtn: {
    backgroundColor: '#4B0056', paddingVertical: 12,
    borderRadius: 20, marginTop: 20, alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
  croContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  croInput: {
    flex: 1,
    marginTop: 0,
  },
  croButton: {
    backgroundColor: '#4B0056',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  croButtonConfirmed: {
    backgroundColor: '#28a745',
  },
  croButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dayAvailable: {
    borderColor: '#4B0056',
    borderWidth: 2,
    backgroundColor: '#E8F5E8',
  },
  dayUnavailable: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  saveBtnDisabled: {
    backgroundColor: '#ccc',
  },
});
