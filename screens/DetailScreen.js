import { SafeAreaView, Text, StyleSheet } from "react-native";

function DetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tela de Detalhes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1C25",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default DetailScreen;