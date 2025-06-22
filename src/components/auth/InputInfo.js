import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

import Gradient from "../layout/Gradient";

function InputInfo({
  label,
  placeholder,
  iconName,
  value,
  onChangeText,
  secure = false,
}) {
  const { colors } = useTheme();
  const [hidePassword, setHidePassword] = useState(secure);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Gradient>
          <Ionicons name={iconName} size={16} />
          <Text style={[styles.label]}>{label}</Text>
        </Gradient>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={colors.border}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={hidePassword}
          />
          {secure && (
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Gradient>
                <Ionicons name={hidePassword ? "eye-off" : "eye"} size={18} />
              </Gradient>
            </TouchableOpacity>
          )}
        </View>

        <LinearGradient
          colors={["#5DCFAE", "#00ADAB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientLine}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: "maven_medium",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "maven_regular",
  },
  gradientLine: {
    height: 2,
    borderRadius: 2,
  },
});

export default InputInfo;
