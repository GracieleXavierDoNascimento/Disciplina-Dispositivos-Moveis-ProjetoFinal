import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from '../components/Menu';
import { showErrorNotification, showSuccessNotification } from '../services/notificationService';

const EditableField = ({
  label,
  value,
  onChangeText,
  field,
  editMode,
  toggleEditMode,
  multiline = false,
  placeholder,
  isFinalized = false
}) => {
  if (isFinalized) {
    // Se a consulta está finalizada, apenas mostrar o texto
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.fieldText}>{value || 'Não informado'}</Text>
      </>
    );
  }

  if (editMode[field]) {
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          multiline={multiline}
          value={value}
          onChangeText={onChangeText}
        />
      </>
    );
  } else {
    return (
      <>
        <View style={styles.fieldHeader}>
          <Text style={styles.label}>{label}:</Text>
          <TouchableOpacity onPress={() => toggleEditMode(field)}>
            <Feather name="edit-2" size={16} color="#4B0056" />
          </TouchableOpacity>
        </View>
        <Text style={styles.fieldText}>{value || 'Não informado'}</Text>
      </>
    );
  }
};

export default function ConsultaDetalhesScreen({ route, navigation }) {
  const { consulta } = route.params;

  const [avaliacao, setAvaliacao] = useState(consulta.avaliacao || '');
  const [procedimentosRealizados, setProcedimentosRealizados] = useState(consulta.procedimentosRealizados || '');
  const [recomendacoes, setRecomendacoes] = useState(consulta.recomendacoes || '');
  const [voltaEsperada, setVoltaEsperada] = useState(consulta.voltaEsperada || '');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState({
    avaliacao: consulta.avaliacao === null || consulta.avaliacao === '',
    procedimentosRealizados: consulta.procedimentosRealizados === null || consulta.procedimentosRealizados === '',
    recomendacoes: consulta.recomendacoes === null || consulta.recomendacoes === '',
    voltaEsperada: consulta.voltaEsperada === null || consulta.voltaEsperada === '',
  });
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    async function getUserRole() {
      try {
        const role = await AsyncStorage.getItem('tipoUsuario');
        if (role) {
          setUserRole(role || '');
        }
      } catch (error) {
        console.error('Erro ao obter role do usuário:', error);
      }
    }
    getUserRole();
  }, []);

  const toggleEditMode = (field) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const atualizarConsulta = async () => {
    setLoading(true);
    try {
      const requestBody = {
        avaliacao,
        procedimentosRealizados,
        recomendacoes,
        voltaEsperada
      };

      const response = await fetch(
        `http://localhost:8080/api/consulta/${consulta.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        showSuccessNotification('Consulta atualizada com sucesso!');
        navigation.goBack();
      } else {
        throw new Error('Erro ao atualizar consulta');
      }
    } catch (error) {
      console.error('Erro ao atualizar consulta:', error);
      showErrorNotification('Não foi possível atualizar a consulta');
    } finally {
      setLoading(false);
    }
  };

  const deletarConsulta = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/consulta/cancelar/${consulta.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        showSuccessNotification('Consulta cancelada com sucesso!');
        if(userRole === 'ROLE_PACIENTE') {
          navigation.navigate('ConsultasAgendadasPaciente');
        } else if (userRole === 'ROLE_DENTISTA') {
          navigation.navigate('Agenda');
        } else {
          throw new Error('Erro ao deletar consulta');
        }
      }
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      showErrorNotification('Não foi possível cancelar a consulta');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    const data = dataString.slice(0, 10); // yyyy-MM-dd
    const [ano, mes, dia] = data.split('-');
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.botaoVoltar}
      >
        <Feather name="arrow-left" size={24} color="#4B0056" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.header}>Consulta</Text>

        <View style={styles.box}>
          <View style={styles.titleContainer}>
            <Text style={styles.titulo}>Informações:</Text>
            <View style={[
              styles.statusContainer,
              {
                backgroundColor:
                  consulta.statusConsulta === 1
                    ? 'rgba(0, 123, 255, 0.2)' // Azul com transparência
                    : consulta.statusConsulta === 2
                      ? 'rgba(40, 167, 69, 0.2)' // Verde com transparência
                      : 'rgba(220, 53, 69, 0.2)' // Vermelho com transparência
              }
            ]}>
              <Text style={[
                styles.statusText,
                {
                  color:
                    consulta.statusConsulta === 1
                      ? '#007bff' // Azul
                      : consulta.statusConsulta === 2
                        ? '#28a745' // Verde
                        : '#dc3545' // Vermelho
                }
              ]}>
                {
                  consulta.statusConsulta === 1
                    ? "Agendada"
                    : consulta.statusConsulta === 2
                      ? "Finalizada"
                      : "Cancelada"
                }
              </Text>
            </View>
          </View>
          <Text style={styles.label}>
            {userRole === 'ROLE_PACIENTE' 
              ? `Dentista: ${consulta.dentistaNome}` 
              : `Paciente: ${consulta.paciente}`}
          </Text>

          <Text style={styles.data}>Data: {formatarData(consulta.dataConsulta)}</Text>
          <Text style={styles.data}>Horário: {consulta.dataConsulta.slice(11, 16)}</Text>

          <Text style={styles.label}>Motivo da consulta: {consulta.motivo || 'Não informado'}</Text>

          <View style={styles.botoes}>
            {consulta.statusConsulta === 1 ? (
              <TouchableOpacity
                style={styles.botaoCinza}
                onPress={deletarConsulta}
              >
                <Text style={styles.botaoTextoCinza}>Cancelar consulta</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {consulta.statusConsulta !== 3 ? (

          <View style={styles.box}>
            <Text style={styles.titulo}>Anotações do dentista:</Text>

            <EditableField
              label="Avaliação"
              value={avaliacao}
              onChangeText={setAvaliacao}
              field="avaliacao"
              multiline
              placeholder="Digite aqui..."
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              isFinalized={consulta.statusConsulta === 2 || userRole === 'ROLE_PACIENTE'}
            />

            <EditableField
              label="Procedimentos realizados"
              value={procedimentosRealizados}
              onChangeText={setProcedimentosRealizados}
              field="procedimentosRealizados"
              multiline
              placeholder="Digite aqui..."
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              isFinalized={consulta.statusConsulta === 2 || userRole === 'ROLE_PACIENTE'}
            />

            <EditableField
              label="Recomendações"
              value={recomendacoes}
              onChangeText={setRecomendacoes}
              field="recomendacoes"
              multiline
              placeholder="Digite aqui..."
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              isFinalized={consulta.statusConsulta === 2 || userRole === 'ROLE_PACIENTE'}
            />

            <EditableField
              label="Volta esperada"
              value={voltaEsperada}
              onChangeText={setVoltaEsperada}
              field="voltaEsperada"
              placeholder="Ex: 6 meses"
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              isFinalized={consulta.statusConsulta === 2 || userRole === 'ROLE_PACIENTE'}
            />

            {consulta.statusConsulta !== 2 && userRole !== 'ROLE_PACIENTE' && (
              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={atualizarConsulta}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.botaoSalvarTexto}>Salvar</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        ) : null}

      </ScrollView>

      <Menu />
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
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
    justifyContent: 'flex-start',
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
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  fieldText: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    minHeight: 40,
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
