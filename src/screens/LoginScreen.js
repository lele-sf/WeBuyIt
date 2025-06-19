import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { auth } from "../database/firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";

import Checkbox from "../components/CheckBox";
import Gradient from "../components/Gradient";
import GradientButton from "../components/GradientButton";
import InputInfo from "../components/InputInfo";

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("HomeMain");
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro ao entrar", "Verifique seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.wrapper}>
        <Gradient style={styles.logoText}>WeBuyIt</Gradient>

        <View style={styles.inputWrapper}>
          <InputInfo
            label="Seu e-mail"
            placeholder="Digite seu e-mail"
            iconName="person-outline"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <InputInfo
            label="Sua senha"
            placeholder="Digite sua senha"
            iconName="lock-closed-outline"
            secure={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={[styles.forgotText, { color: colors.text }]}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            tintColors={{ true: colors.primary, false: '#aaa' }}
          />
          <Text style={[styles.rememberText, { color: colors.text }]}>
            Lembrar de mim
          </Text>
        </View>

        <GradientButton
          title={loading ? "Carregando..." : "ACESSAR"}
          onPress={handleLogin}
          disabled={loading}
          iconRight={<Ionicons name="log-in-outline" size={20} color={colors.card} />}
        />

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Gradient style={styles.createAccountText}>
            Criar conta <Ionicons name="person-add" size={16} />
          </Gradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoText: {
    fontFamily: "maven_semibold",
    fontSize: 40,
    marginBottom: 48,
    letterSpacing: 4,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "maven_medium",
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: "maven_regular",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotText: {
    fontSize: 12,
    fontFamily: "maven_regular",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  rememberText: {
    fontSize: 14,
    fontFamily: "maven_regular",
    marginLeft: 8,
  },
  createAccountButton: {
    marginTop: 16,
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: "maven_medium",
    flexDirection: "row",
    alignItems: "center",
  },
});
