import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ConsultaDetalhadaScreen({ route }) {
  const { consulta } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.confirmado}>Sua consulta foi realizada</Text>

      <View style={styles.card}>
        <Text style={styles.info}>
          {consulta.data} às {consulta.hora}
        </Text>
        <Text style={styles.info}>{consulta.local}</Text>
        <Text style={styles.info}>Dr. {consulta.nomeDentista}</Text>
        <Text style={styles.info}>Especialidade: {consulta.especialidade}</Text>
        <Text style={styles.info}>Motivo: {consulta.motivo}</Text>
      </View>

      <Text style={styles.lembrete}>
        Obrigado por utilizar nosso app. Continue acompanhando seus agendamentos por aqui.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  confirmado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0056',
    textAlign: 'center',
  },
  imagem: {
    height: 180,
    alignSelf: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#FAF3FB',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  lembrete: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },
});
