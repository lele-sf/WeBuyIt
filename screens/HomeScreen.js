import React from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, StatusBar } from "react-native";
import SearchBar from "../components/SearchBar.js";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <SearchBar />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Detail")}
      >
        <Text style={styles.buttonText}>Ir para Detalhes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1C25",
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
