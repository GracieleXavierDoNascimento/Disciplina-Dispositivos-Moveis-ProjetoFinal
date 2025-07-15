import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DetalhesConsulta() {
  const route = useRoute();
  const navigation = useNavigation();

  // Corrigido: evitar crash se route.params for undefined
  const consulta = route.params?.consulta;

  if (!consulta) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.voltar}
        >
          <Feather name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Nenhuma consulta selecionada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}
      >
        <Feather name="arrow-left" size={22} color="#000" />
      </TouchableOpacity>

      <Text style={styles.titulo}>{consulta.nomeConsulta}</Text>

      <View style={styles.card}>
        <Text style={styles.secao}>Consulta agendada</Text>

        <View style={styles.linha}>
          <Feather name="calendar" size={16} color="#4B0056" />
          <Text style={styles.textoLinha}>
            {consulta.data} — {consulta.local}
          </Text>
        </View>

        <View style={styles.linha}>
          <Feather name="clock" size={16} color="#4B0056" />
          <Text style={styles.textoLinha}>{consulta.horaInicio}</Text>
        </View>

        <View style={styles.linha}>
          <Feather name="check-circle" size={16} color="#4B0056" />
          <Text style={styles.textoLinha}>{consulta.status}</Text>
        </View>

        <View style={styles.linha}>
          <Feather name="dollar-sign" size={16} color="#4B0056" />
          <Text style={styles.textoLinha}>
            {consulta.pagamento} — {consulta.valor}
          </Text>
        </View>

        <Text style={styles.secao}>Especialidade:</Text>
        <Text style={styles.textoInfo}>{consulta.especialidade}</Text>

        <Text style={styles.secao}>Motivo da consulta</Text>
        <View style={styles.motivoBox}>
          <Text style={styles.textoMotivo}>{consulta.motivo}</Text>
        </View>

        <View style={styles.botoes}>
          <TouchableOpacity style={styles.btnCancelar}>
            <Text style={styles.btnCancelarTxt}>Cancelar consulta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnInfo}>
            <Text style={styles.btnInfoTxt}>Informações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  voltar: {
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FAF3FB',
    borderRadius: 20,
    padding: 20,
  },
  secao: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4B0056',
    marginBottom: 10,
    marginTop: 15,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  textoLinha: {
    fontSize: 14,
    color: '#000',
  },
  textoInfo: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  motivoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
    elevation: 2,
  },
  textoMotivo: {
    fontSize: 14,
    color: '#333',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  btnCancelar: {
    borderWidth: 1,
    borderColor: '#4B0056',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  btnCancelarTxt: {
    textAlign: 'center',
    color: '#4B0056',
    fontWeight: 'bold',
  },
  btnInfo: {
    backgroundColor: '#4B0056',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  btnInfoTxt: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
});
