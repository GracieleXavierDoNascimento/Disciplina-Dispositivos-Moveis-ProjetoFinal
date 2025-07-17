import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AgendaScreen from '../src/screens/AgendaScreen';
import CadastroScreen from '../src/screens/CadastroScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';
import PerfilScreen from '../src/screens/PerfilScreen';
// Update the import path below to match the actual location and name of DetalhesConsultaScreen
// Update the import path below to match the actual location and name of DetalhesConsultaScreen
import DetalhesConsulta from '../src/screens/ConsultaDetalhesScreen';
import DisponibilidadeScreen from '../src/screens/DisponibilidadeScreen';
import HistoricoConsultasScreen from '../src/screens/HistoricoConsultasScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="DetalhesConsulta" component={DetalhesConsulta} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Disponibilidade" component={DisponibilidadeScreen} />
        <Stack.Screen name="Historico" component={HistoricoConsultasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
