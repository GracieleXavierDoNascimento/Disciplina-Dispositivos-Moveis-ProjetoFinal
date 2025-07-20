import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const MENU_ITEMS = {
  ROLE_DENTISTA: [
    { key: 'home', icon: 'home', screen: 'Agenda' },
    { key: 'favoritos', icon: 'calendar', screen: 'Disponibilidade' },
    { key: 'agenda', icon: 'rotate-ccw', screen: 'Historico' },
    { key: 'perfil', icon: 'user', screen: 'Perfil' },
  ],
  ROLE_PACIENTE: [
    { key: 'home', icon: 'home', screen: 'ConsultasAgendadasPaciente' },
    { key: 'favoritos', icon: 'calendar', screen: 'MarcarConsulta' },
    { key: 'agenda', icon: 'rotate-ccw', screen: 'HistConsultaPaciente' },
    { key: 'perfil', icon: 'user', screen: 'Perfil' },
  ],
};

function Menu() {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function loadRole() {
      try {
        const storedRole = await AsyncStorage.getItem('tipoUsuario');
        setRole(storedRole);
      } catch (error) {
        console.error('Erro ao carregar role:', error);
      }
    }
    loadRole();
  }, []);

  const handlePress = useCallback((screen) => {
    if (screen !== current) {
      navigation.dispatch(CommonActions.navigate({ name: screen }));
    }
  }, [current, navigation]);

  const itemsToRender = MENU_ITEMS[role] || [];

  return (
    <View style={styles.menu}>
      {itemsToRender.map(item => {
        const isActive = current === item.screen;
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => handlePress(item.screen)}
            style={[
              styles.button,
              isActive && styles.activeButton,
              isActive && styles.activeBorder,
            ]}
          >
            <Feather
              name={item.icon}
              size={24}
              color={isActive ? '#4B0056' : '#B38CB4'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default memo(Menu);

const styles = StyleSheet.create({
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#f4eef6',
    borderRadius: 15,
  },
  activeBorder: {
    borderTopWidth: 3,
    borderTopColor: '#4B0056',
  },
});
