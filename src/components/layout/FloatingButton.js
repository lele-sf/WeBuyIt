import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import Gradient from "./Gradient";

const FloatingButton = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Gradient>
        <Text style={[styles.buttonText, { color: colors.text }]}>
          Criar Evento
        </Text>
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
  },
  buttonText: {
    fontFamily: "maven_semibold",
  },
});

export default FloatingButton;
