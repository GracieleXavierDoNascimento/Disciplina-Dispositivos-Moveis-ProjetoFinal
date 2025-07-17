// src/screens/ConsultaDetalhesScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../components/Menu';  // 1. importe o Menu

export default function ConsultaDetalhesScreen({ route, navigation }) {
  const { consulta } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.botaoVoltar}
      >
        <Feather name="arrow-left" size={24} color="#4B0056" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.header}>Manutenção agenda</Text>

        <View style={styles.box}>
          <Text style={styles.titulo}>Consulta agendada</Text>
          <Text style={styles.label}>Paciente:</Text>
          <Text style={styles.texto}>{consulta.paciente}</Text>

          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.texto}>
            {consulta.horaInicio} - {consulta.horaFim}
          </Text>

          <Text style={styles.label}>Especialidade:</Text>
          <Text style={styles.texto}>{consulta.especialidade}</Text>

          <Text style={styles.label}>Motivo da consulta:</Text>
          <Text style={styles.texto}>Consulta normal de rotina</Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botaoCinza}>
              <Text style={styles.botaoTextoCinza}>Cancelar consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoRoxo}>
              <Text style={styles.botaoTextoRoxo}>Informações</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.titulo}>Informações de consulta</Text>

          <Text style={styles.label}>Avaliação:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui..."
            multiline
          />

          <Text style={styles.label}>Procedimentos realizados:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui..."
            multiline
          />

          <Text style={styles.label}>Recomendações:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui..."
            multiline
          />

          <Text style={styles.label}>Volta esperada:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 6 meses"
          />

          <TouchableOpacity style={styles.botaoSalvar}>
            <Text style={styles.botaoSalvarTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Menu />  {/* 2. substitua o menu interno pelo componente Menu */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#FAF3FB',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0056',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B0056',
    marginTop: 10,
  },
  texto: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  botaoCinza: {
    backgroundColor: '#E0D9E4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  botaoTextoCinza: {
    color: '#4B0056',
    fontWeight: '500',
  },
  botaoRoxo: {
    backgroundColor: '#4B0056',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  botaoTextoRoxo: {
    color: '#FFF',
    fontWeight: '500',
  },
  botaoSalvar: {
    backgroundColor: '#4B0056',
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
