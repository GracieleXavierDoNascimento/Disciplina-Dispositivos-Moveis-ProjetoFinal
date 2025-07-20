import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import Menu from '../components/Menu';
import { showErrorNotification } from '../services/notificationService';

export default function MarcarConsultaScreen({ navigation }) {
  const hoje = new Date();
  const [croDentista, setCroDentista] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [motivoConsulta, setMotivoConsulta] = useState('');

  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const displayMonthIndex = (mesAtual + monthOffset + 12) % 12;
  const displayYear = anoAtual + Math.floor((mesAtual + monthOffset) / 12);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const allTimes = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];

  const daysInMonth = new Date(displayYear, displayMonthIndex + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDaySelect = (day) => {
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

  const handleAgendar = () => {
    if (!croDentista.trim()) {
      showErrorNotification('Por favor, informe o CRO do dentista.');
      return;
    }
    if (!selectedDay || !selectedTime || motivoConsulta.trim() === '') {
      showErrorNotification('Por favor, selecione data, horário e informe o motivo da consulta.');
      return;
    }

    const dia = String(selectedDay).padStart(2, '0');
    const mes = String(displayMonthIndex + 1).padStart(2, '0');
    const ano = String(displayYear);

    const novaConsulta = {
      data: `${dia}/${mes}/${ano}`,
      hora: selectedTime,
      croDentista: croDentista.trim(),
      nomeDentista: 'Dr. Taliana Carvalho',
      especialidade: 'Ortodontista',
      local: 'Jaboatão dos Guararapes/PE',
      motivo: motivoConsulta.trim(),
    };

    navigation.navigate('ConsultasAgendadasPaciente', { consulta: novaConsulta });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Marcar consulta</Text>

        <View style={styles.card}>

          {/* Campo para CRO do dentista */}
          <Text style={styles.subtitle}>CRO do Dentista:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o CRO do dentista"
            value={croDentista}
            onChangeText={setCroDentista}
          />

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
            {daysOfMonth.map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => handleDaySelect(day)}
                style={[
                  styles.day,
                  selectedDay === day && styles.daySelected,
                ]}
              >
                <Text style={{
                  color: selectedDay === day ? '#fff' : '#4B0056',
                  fontWeight: selectedDay === day ? 'bold' : 'normal',
                }}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subtitle}>Horários disponíveis:</Text>
          <View style={styles.timesGrid}>
            {allTimes.map((time) => (
              <TouchableOpacity
                key={time}
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

          <Text style={styles.subtitle}>Motivo da consulta:</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva brevemente o motivo da consulta"
            value={motivoConsulta}
            onChangeText={setMotivoConsulta}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleAgendar}>
            <Text style={styles.saveBtnText}>Marcar Consulta</Text>
          </TouchableOpacity>
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
});
