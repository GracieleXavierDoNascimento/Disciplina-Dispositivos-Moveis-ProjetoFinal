import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Menu from '../components/Menu';
import api from '../services/api';
import { showErrorNotification, showSuccessNotification } from '../services/notificationService';

// Data atual
const hoje = new Date();

const diaAtual = hoje.getDate();
const mesAtual = hoje.getMonth();
const anoAtual = hoje.getFullYear();

export default function DisponibilidadeScreen() {
  const [selectedDay, setSelectedDay] = useState(diaAtual);
  const [selectedMonth, setSelectedMonth] = useState(mesAtual);
  const [selectedYear, setSelectedYear] = useState(anoAtual);
  const [selectedTimes, setSelectedTimes] = useState([]); // Array para múltiplos horários
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [monthOffset, setMonthOffset] = useState(0);
  const jwtDecode = require('jwt-decode').default || require('jwt-decode');


  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const displayMonthIndex = (mesAtual + monthOffset + 12) % 12;
  const displayMonthName = monthNames[displayMonthIndex];
  const displayYear = anoAtual + Math.floor((mesAtual + monthOffset) / 12);

  const daysInMonth = new Date(displayYear, displayMonthIndex + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  const allTimes = [
    '8:00', '9:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00',
  ];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedTimes([]); // limpa horários ao trocar o dia
  };

  const handleTimeSelect = (time) => {
    setSelectedTimes(prev => {
      if (prev.includes(time)) {
        // Remove o horário se já estiver selecionado
        return prev.filter(t => t !== time);
      } else {
        // Adiciona o horário se não estiver selecionado
        return [...prev, time];
      }
    });
  };

  const handleSave = () => {
    if (!selectedDay || selectedTimes.length === 0) {
      showErrorNotification('Selecione um dia e pelo menos um horário');
      return;
    }

    const postDisponibilidade = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const decoded = decodeJWTPayload(token);
        const id = decoded.id || decoded.sub;

        const response = await api.post(`/diasAtendimento/${id}`, buildRequestBody());
        if (response) {
          showSuccessNotification('Horários cadastrados com sucesso!');
          setSelectedTimes([]);
        } else {
          showErrorNotification('Erro ao cadastrar os horários!');
        }
      } catch (error) {
        showErrorNotification(error.response.data.message || 'Erro ao cadastrar os horários!');
      }
    };

    postDisponibilidade();
  };

  function decodeJWTPayload(token) {
    const payload = token.split('.')[1];
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(decodedPayload);
  }

  function buildRequestBody() {
    const dia = String(selectedDay).padStart(2, '0');
    const mes = String(displayMonthIndex + 1).padStart(2, '0');
    const ano = String(displayYear);

    // Criar array de horários para todos os horários selecionados
    const horarios = selectedTimes.map(time => {
      const [hora, minuto = '00'] = time.split(':');
      const horaFormatada = `${hora.padStart(2, '0')}:${minuto.padStart(2, '0')}:00`;
      
      return {
        horario: `${ano}-${mes}-${dia} ${horaFormatada}`
      };
    });

    return { horarios };
  }



  const handleConfirm = () => {
    console.log('Reserva:', {
      dia: selectedDay,
      hora: selectedTimes,
      especialidade: selectedSpecialty,
      paciente: patientName,
      telefone: patientPhone,
    });

    setModalVisible(false);
    showSuccessNotification('Horário agendado com sucesso!');
    setPatientName('');
    setPatientPhone('');
    setSelectedSpecialty('');
  };

  const handlePrevMonth = () => {
    setMonthOffset((offset) => offset - 1);
    setSelectedMonth(monthOffset);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setMonthOffset((offset) => offset + 1);
    setSelectedMonth(monthOffset);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Marcar dias disponíveis</Text>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Selecione os dias disponíveis:</Text>

          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <Feather name="chevron-left" size={24} color="#4B0056" />
            </TouchableOpacity>
            <Text style={styles.monthText}>{displayMonthName}</Text>
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

          <Text style={styles.subtitle}>
            Horários disponíveis ({selectedTimes.length} selecionado{selectedTimes.length !== 1 ? 's' : ''}):
          </Text>
          <View style={styles.timesGrid}>
            {allTimes.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => handleTimeSelect(time)}
                style={[
                  styles.timeButton,
                  selectedTimes.includes(time) && styles.timeButtonSelected,
                ]}
              >
                <Text style={{
                  color: selectedTimes.includes(time) ? '#fff' : '#4B0056',
                }}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.saveBtn,
              (selectedTimes.length === 0) && styles.saveBtnDisabled
            ]} 
            onPress={handleSave}
            disabled={selectedTimes.length === 0}
          >
            <Text style={styles.saveBtnText}>
              Salvar {selectedTimes.length > 0 ? `(${selectedTimes.length} horário${selectedTimes.length !== 1 ? 's' : ''})` : ''}
            </Text>
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
    backgroundColor: '#fff', borderColor: '#B38CB4',
    borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#4B0056', paddingVertical: 12,
    borderRadius: 20, marginTop: 20, alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
  saveBtnDisabled: {
    backgroundColor: '#B0B0B0',
  },
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%', backgroundColor: '#fff',
    borderRadius: 20, padding: 20,
  },
});
