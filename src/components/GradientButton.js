import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Gradient from "./Gradient";

export default function GradientButton({ title, onPress, iconRight }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.8}>
      <Gradient style={styles.button}>
        <Text style={styles.text}>{title}</Text>
        {iconRight}
      </Gradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "maven_medium",
    color: "white",
  },
});
