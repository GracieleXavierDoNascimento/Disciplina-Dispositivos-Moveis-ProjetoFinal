import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../components/Menu';

// Data atual
const hoje = new Date();
const diaAtual = hoje.getDate();
const mesAtual = hoje.getMonth();
const anoAtual = hoje.getFullYear();

export default function DisponibilidadeScreen() {
  const [selectedDay, setSelectedDay] = useState(diaAtual);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [monthOffset, setMonthOffset] = useState(0);

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
    '8:00', '9:00', '11:00',
    '12:00', '14:00', '15:00',
    '17:00', '18:00', '19:00',
  ];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedTime(null); // limpa horário ao trocar o dia
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSave = () => {
    if (!selectedDay || !selectedTime || !selectedSpecialty) return;
    setModalVisible(true); // abre modal
  };

  const handleConfirm = () => {
    console.log('Reserva:', {
      dia: selectedDay,
      hora: selectedTime,
      especialidade: selectedSpecialty,
      paciente: patientName,
      telefone: patientPhone,
    });

    setModalVisible(false);
    alert('Horário agendado com sucesso!');
    setPatientName('');
    setPatientPhone('');
    setSelectedSpecialty('');
  };

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

          <Text style={styles.subtitle}>Horários disponíveis :</Text>
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

          <Text style={styles.subtitle}>Especialidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a especialidade"
            value={selectedSpecialty}
            onChangeText={setSelectedSpecialty}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>Nome do paciente:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              value={patientName}
              onChangeText={setPatientName}
            />
            <Text style={styles.subtitle}>Telefone:</Text>
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              value={patientPhone}
              onChangeText={setPatientPhone}
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleConfirm}
            >
              <Text style={styles.saveBtnText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%', backgroundColor: '#fff',
    borderRadius: 20, padding: 20,
  },
});
