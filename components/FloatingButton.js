import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Gradient from "./Gradient";

const FloatingButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Gradient>
        <Text style={styles.buttonText}>{text}</Text>
      </Gradient>
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
    // elevation: 5,
  },
  buttonText: {
    fontFamily: "MavenPro_500Medium",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FloatingButton;
