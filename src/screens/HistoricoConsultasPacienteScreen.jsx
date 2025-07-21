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
        const consultasHistorico = response.data?.filter(consulta => consulta.statusConsulta === 2 || consulta.statusConsulta === 3) || [];
        setConsultas(consultasHistorico.reverse());
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    }

    carregarHistorico();
  }, []);

  const formatarData = (dataString) => {
    const data = dataString.slice(0, 10); // yyyy-MM-dd
    const [ano, mes, dia] = data.split('-');
    return `${dia}-${mes}-${ano}`;
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.consultaItem}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerCard}>
          <Text style={styles.data}>Data: {formatarData(item.dataConsulta)}</Text>
          <View style={[
            styles.statusContainer,
            {
              backgroundColor: item.statusConsulta === 2
                ? 'rgba(40, 167, 69, 0.2)' // Verde com transparência
                : 'rgba(220, 53, 69, 0.2)' // Vermelho com transparência
            }
          ]}>
            <Text style={[
              styles.statusText,
              {
                color: item.statusConsulta === 2
                  ? '#28a745' // Verde
                  : '#dc3545' // Vermelho
              }
            ]}>
              {item.statusConsulta === 2 ? "Finalizada" : "Cancelada"}
            </Text>
          </View>
        </View>
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
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
    marginBottom: 5,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  botaoDetalhes: {
    backgroundColor: '#FFD5EC',
    borderRadius: 20,
    padding: 8,
  },
});
