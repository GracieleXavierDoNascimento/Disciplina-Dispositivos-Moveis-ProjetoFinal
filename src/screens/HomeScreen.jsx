import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const nomeUsuario = 'Maria Silva';
  const [activeTab, setActiveTab] = useState('Home');

  const renderMenu = () => (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => setActiveTab('Home')}>
        <Feather
          name="home"
          size={24}
          color={activeTab === 'Home' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('Favoritos')}>
        <Feather
          name="heart"
          size={24}
          color={activeTab === 'Favoritos' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('Agenda')}>
        <Feather
          name="calendar"
          size={24}
          color={activeTab === 'Agenda' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('Perfil')}>
        <Feather
          name="user"
          size={24}
          color={activeTab === 'Perfil' ? '#4B0056' : '#B38CB4'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Olá, {nomeUsuario}</Text>
        <Text style={styles.subtitle}>Veja o que está acontecendo hoje:</Text>

        <View style={styles.card}>
          <View style={styles.cardTextFull}>
            <Text style={styles.cardTitle}>Consulta marcada</Text>
            <Text style={styles.cardSubtitle}>09:00 - Limpeza dentária</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTextFull}>
            <Text style={styles.cardTitle}>Lembrete</Text>
            <Text style={styles.cardSubtitle}>
              Escove os dentes 3x ao dia
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver todas as atividades</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderMenu()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 80, // espaço pro menu
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0056',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f4eef6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardTextFull: {},
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0056',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4B0056',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
});
