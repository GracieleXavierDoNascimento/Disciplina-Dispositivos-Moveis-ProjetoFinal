import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const nomeUsuario = 'Maria Silva';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Olá, {nomeUsuario}</Text>
      <Text style={styles.subtitle}>Veja o que está acontecendo hoje:</Text>

      <View style={styles.card}>
        {/* Imagem removida */}
        <View style={styles.cardTextFull}>
          <Text style={styles.cardTitle}>Consulta marcada</Text>
          <Text style={styles.cardSubtitle}>09:00 - Limpeza dentária</Text>
        </View>
      </View>

      <View style={styles.card}>
        {/* Imagem removida */}
        <View style={styles.cardTextFull}>
          <Text style={styles.cardTitle}>Lembrete</Text>
          <Text style={styles.cardSubtitle}>Escove os dentes 3x ao dia</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver todas as atividades</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
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
    // alinhamento modificado para evitar espaços de imagem
  },
  cardTextFull: {
    // Como agora ocupa todo o espaço, pode ajustar flex se quiser
  },
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
});
