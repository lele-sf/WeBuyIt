import { SafeAreaView, Text, StyleSheet } from "react-native";

function ListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>lista</Text>
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

export default ListScreen;