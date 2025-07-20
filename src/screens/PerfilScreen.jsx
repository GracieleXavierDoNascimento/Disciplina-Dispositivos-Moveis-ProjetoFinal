import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from '../components/Menu';
import api from '../services/api';

export default function PerfilScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAddressStep, setIsAddressStep] = useState(false); // para dentista etapa 2

  const [role, setRole] = useState(null); // para controlar role e renderizar diferente

  // Dados comuns
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cro, setCro] = useState('');

  // Endereço
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');

  // Função para decodificar token JWT
  function decodeJWTPayload(token) {
    if (!token || typeof token !== 'string' || !token.includes('.')) {
      return null;
    }
    try {
      const payload = token.split('.')[1];
      const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    async function carregarDados() {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedRole = await AsyncStorage.getItem('tipoUsuario');
        setRole(storedRole);

        if (!token) return;

        const decoded = decodeJWTPayload(token);
        const id = decoded?.id;
        const tokenEmail = decoded?.sub;

        if (storedRole === 'ROLE_DENTISTA' && id) {
          const response = await api.get(`/dentista/${id}`);
          const data = response.data;
          setNome(data.nome || '');
          setEmail(tokenEmail || '');
          setTelefone(data.telefone || '');
          setCro(data.cro || '');
          setRua(data.rua || '');
          setCidade(data.cidade || '');
          setBairro(data.bairro || '');
          setNumero(data.numero || '');
          setCep(data.cep || '');
          setComplemento(data.complemento || '');
        } else if (storedRole === 'ROLE_PACIENTE' && id) {
          const response = await api.get(`/paciente/${id}`);
          const data = response.data;
          setNome(data.nome || '');
          setEmail(data.email || '');
          setTelefone(data.telefone || '');
          setCro('');
        }
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
      }
    }
    carregarDados();
  }, []);

  const handleEditSave = () => {
    if (isEditing) {
      // Aqui você pode enviar os dados atualizados para o backend via API

      setIsEditing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      setIsEditing(true);
    }
  };

  // Render da tela principal (etapa 1)
  const renderMainStep = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.header}>Informações pessoais</Text>
        <Text style={styles.saudacao}>Olá, {nome}</Text>

        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/921/921087.png',
              }}
              style={styles.avatar}
            />
          </View>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            editable={isEditing}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            editable={isEditing}
            placeholder="Telefone"
            keyboardType="phone-pad"
          />

          {role === 'ROLE_DENTISTA' && (
            <>
              <TextInput
                style={styles.input}
                value={cro}
                onChangeText={setCro}
                editable={isEditing}
                placeholder="CRO"
              />
              {/* Campo rua como botão que leva para editar endereço */}
              <TouchableOpacity
                disabled={!isEditing}
                onPress={() => setIsAddressStep(true)}
                style={[
                  styles.input,
                  { justifyContent: 'center', paddingVertical: 14 },
                  !isEditing && { backgroundColor: '#eee' },
                ]}
              >
                <Text style={{ color: rua ? '#000' : '#999' }}>
                  {rua || 'Rua'}
                </Text>
                {isEditing && (
                  <Feather
                    name="edit-2"
                    size={18}
                    color="#4B0056"
                    style={{ position: 'absolute', right: 10 }}
                  />
                )}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.editButton} onPress={handleEditSave}>
            <Feather
              name={isEditing ? 'check' : 'edit-2'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render da tela de edição de endereço (etapa 2)
  const renderAddressStep = () => {
    return (
      <SafeAreaView style={styles.content}>
        <TouchableOpacity
          onPress={() => setIsAddressStep(false)}
          style={{ marginBottom: 10 }}
        >
          <Feather name="arrow-left" size={24} color="#4B0056" />
        </TouchableOpacity>

        <Text style={styles.header}>Editar Endereço</Text>
        <Text style={styles.saudacao}>Olá, {nome}</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            value={rua}
            onChangeText={setRua}
            editable={isEditing}
            placeholder="Rua"
          />
          <TextInput
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            editable={isEditing}
            placeholder="Cidade"
          />
          <TextInput
            style={styles.input}
            value={bairro}
            onChangeText={setBairro}
            editable={isEditing}
            placeholder="Bairro"
          />
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            editable={isEditing}
            placeholder="Número"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={setCep}
            editable={isEditing}
            placeholder="CEP"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={complemento}
            onChangeText={setComplemento}
            editable={isEditing}
            placeholder="Complemento"
          />

          <TouchableOpacity style={styles.editButton} onPress={handleEditSave}>
            <Feather
              name={isEditing ? 'check' : 'edit-2'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Feather name="log-out" size={22} color="#4B0056" />
        </TouchableOpacity>
      </View>

      {role === 'ROLE_DENTISTA' && isAddressStep
        ? renderAddressStep()
        : renderMainStep()}

      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logoutContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  successBanner: {
    backgroundColor: '#C5F1C8',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  successText: {
    color: '#1A4D1A',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0056',
  },
  saudacao: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000',
  },
  card: {
    backgroundColor: '#FAF3FB',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    position: 'relative',
  },
  avatarContainer: {
    backgroundColor: '#FFD5EC',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    color: '#000',
  },
  editButton: {
    backgroundColor: '#4B0056',
    borderRadius: 25,
    padding: 12,
    position: 'absolute',
    bottom: -25,
    alignSelf: 'center',
    elevation: 5,
  },
});
