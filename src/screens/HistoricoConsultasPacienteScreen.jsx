import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from '../components/Menu';
import api from '../services/api';

export default function HistoricoConsultasPacienteScreen({ navigation }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const token = await AsyncStorage.getItem('token');
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userId = decoded.id;

        const response = await api.get(`/consulta/usuario/${userId}`);
        setConsultas(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    }

    carregarHistorico();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.consultaItem}>
      <View>
        <Text style={styles.data}>{item.data} às {item.hora}</Text>
        <Text style={styles.nome}>{item.nomeDentista}</Text>
      </View>
      <TouchableOpacity
        style={styles.botaoMais}
        onPress={() => navigation.navigate('consultaDetalhePaciente', { consulta: item })}
      >
        <Feather name="plus" size={20} color="#4B0056" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Histórico de Consultas</Text>

      {consultas.length === 0 ? (
        <Text style={styles.mensagem}>Você ainda não realizou nenhuma consulta.</Text>
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0056',
    textAlign: 'center',
    marginBottom: 20,
  },
  mensagem: {
    textAlign: 'center',
    color: '#777',
    marginTop: 40,
  },
  consultaItem: {
    backgroundColor: '#FAF3FB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  data: {
    color: '#4B0056',
    fontSize: 14,
    fontWeight: '600',
  },
  nome: {
    fontSize: 16,
    color: '#000',
  },
  botaoMais: {
    backgroundColor: '#FFD5EC',
    borderRadius: 20,
    padding: 10,
  },
});
