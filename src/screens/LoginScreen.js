import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import CheckBox from "../components/CheckBox";
import Gradient from "../components/Gradient";
import LoginInput from "../components/LoginInput";
import GradientButton from "../components/GradientButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoginScreen() {
  const { colors } = useTheme();
  const [remember, setRemember] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Gradient style={styles.logo}>
        <Text style={styles.logoText}>WeBuyIt</Text>
      </Gradient>

      <LoginInput
        placeholder="Digite seu login"
        icon="person"
        value={user}
        onChangeText={setUser}
      />

      <LoginInput
        placeholder="Digite sua senha"
        icon="lock-closed"
        isPassword
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>
        <CheckBox
          label="Lembrar de mim"
          value={remember}
          onChange={setRemember}
        />
        <TouchableOpacity>
          <Text style={[styles.forgot, { color: colors.text }]}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <GradientButton
        title="ACESSAR"
        onPress={() => console.log("Login")}
        iconRight={<Ionicons name="log-in" size={20} color="white" style={{ marginLeft: 8 }} />}
      />

      <TouchableOpacity style={styles.createAccount}>
        <Gradient style={styles.createAccountBtn}>
          <Text style={styles.createText}>Criar conta</Text>
          <Ionicons name="person-add" size={16} color="white" style={{ marginLeft: 6 }} />
        </Gradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    backgroundColor: "#0f0f0f",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 40,
  },
  logoText: {
    fontFamily: "maven_bold",
    fontSize: 32,
    letterSpacing: 4,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  forgot: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  createAccount: {
    marginTop: 20,
  },
  createAccountBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  createText: {
    color: "white",
    fontSize: 14,
    fontFamily: "maven_medium",
  },
});
