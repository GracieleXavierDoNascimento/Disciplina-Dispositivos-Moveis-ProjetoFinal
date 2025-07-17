import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';

const MENU_ITEMS = [
  { key: 'home',     icon: 'home',     screen: 'Agenda' },
  { key: 'favoritos',icon: 'heart',    screen: 'Disponibilidade' }, // atualizado aqui
  { key: 'agenda',   icon: 'calendar', screen: 'Historico' },
  { key: 'perfil',   icon: 'user',     screen: 'Perfil' },
];

function Menu() {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  const handlePress = useCallback((screen) => {
    if (screen !== current) {
      navigation.dispatch(
        CommonActions.navigate({ name: screen })
      );
    }
  }, [current, navigation]);

  return (
    <View style={styles.menu}>
      {MENU_ITEMS.map(item => {
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
