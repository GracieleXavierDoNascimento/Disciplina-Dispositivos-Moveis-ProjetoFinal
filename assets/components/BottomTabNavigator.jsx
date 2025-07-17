import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import HistoricoScreen from '../screens/HistoricoScreen'; // ou outro nome que fizer sentido

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4B0056',
        tabBarInactiveTintColor: '#A68EB5',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          position: 'absolute',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Início') {
            return <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Favoritos') {
            return <FontAwesome5 name="heart" size={size} color={color} />;
          } else if (route.name === 'Agenda') {
            return <Feather name="clock" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <Ionicons name="person-outline" size={size} color={color} />;
          }
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={HistoricoScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
