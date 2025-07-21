import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Menu from '../components/Menu';
import api from '../services/api';

export default function ConsultasAgendadasScreen({ navigation }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const decoded = JSON.parse(atob(token.split('.')[1]));
        const id = decoded.id;

        const response = await api.get(`/consulta/usuario/${id}`);
        const consultasAgendadas = response.data?.filter(consulta => consulta.statusConsulta === 1) || [];
        setConsultas(consultasAgendadas);
      } catch (error) {
        console.error("Erro ao carregar consultas:", error);
      }
    }

    fetchConsultas();
  }, []);

  const formatarData = (dataString) => {
    const data = dataString.slice(0, 10); // yyyy-MM-dd
    const [ano, mes, dia] = data.split('-');
    return `${dia}-${mes}-${ano}`;
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.consultaItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.data}>Data: {formatarData(item.dataConsulta)}</Text>
        <Text style={styles.data}>Horário: {item.dataConsulta.slice(11,16)}</Text>
        <Text style={styles.nome}>Dentista: {item.dentistaNome}</Text>
      </View>
      <TouchableOpacity
        style={styles.botaoDetalhes}
        onPress={() => navigation.navigate('DetalhesConsulta', { consulta: item })}
      >
        <Feather name="chevron-right" size={20} color="#4B0056" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Consultas Agendadas</Text>

      {consultas.length === 0 ? (
        <Text style={styles.mensagem}>Você não tem consultas agendadas.</Text>
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0056',
    textAlign: 'center',
    marginVertical: 10,
  },
  mensagem: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
  consultaItem: {
    backgroundColor: '#FAF3FB',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  data: {
    color: '#4B0056',
    fontWeight: '600',
    fontSize: 14,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  especialidade: {
    fontSize: 14,
    color: '#555',
  },
  botaoDetalhes: {
    marginLeft: 10,
    backgroundColor: '#FFD5EC',
    borderRadius: 20,
    padding: 8,
  },
});
