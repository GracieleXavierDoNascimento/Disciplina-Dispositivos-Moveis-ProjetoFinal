import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from '../components/Menu'; // 1. importe o componente Menu

export default function PerfilScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //Dados em comum
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [cro, setCro] = useState();

  //Endereço
  const [rua, setRua] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [numero, setNumero] = useState();
  const [cep, setCep] = useState();

  const handleEditSave = () => {
    if (isEditing) {
      setIsEditing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Feather name="log-out" size={22} color="#4B0056" />
        </TouchableOpacity>
      </View>

      {/* Banner de sucesso */}
      {isSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>Perfil atualizado com sucesso!</Text>
        </View>
      )}

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
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            value={cro}
            onChangeText={setCro}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            editable={isEditing}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditSave}
          >
            <Feather
              name={isEditing ? 'check' : 'edit-2'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

     <Menu />    {/* 2. use o componente Menu */}
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
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
});
