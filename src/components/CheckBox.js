// components/CustomCheckbox.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CheckBox({ label, value, onChange }) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={styles.container}
    >
      <Ionicons
        name={value ? "checkbox-outline" : "square-outline"}
        size={24}
        color={value ? "#00e4c5" : "#aaa"}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginLeft: 8,
    color: "#fff",
  },
});
