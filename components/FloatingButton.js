// components/FloatingButton.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Gradient from "./Gradient";

const FloatingButton = ({}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Gradient><Text style={styles.buttonText}>Criar uma nova lista</Text></Gradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 40,
    right: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "MavenPro_500Medium",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FloatingButton;
