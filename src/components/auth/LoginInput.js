import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoginInput({
  placeholder,
  icon,
  isPassword,
  value,
  onChangeText,
}) {
  const { colors } = useTheme();
  const [secure, setSecure] = useState(isPassword);

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <Ionicons name={icon} size={18} color={colors.text} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text + "88"}
        style={[styles.input, { color: colors.text }]}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off" : "eye"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "maven_regular",
  },
  icon: {
    marginRight: 8,
  },
});
