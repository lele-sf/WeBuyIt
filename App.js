import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { useFonts, MavenPro_600SemiBold } from "@expo-google-fonts/maven-pro";
import GradientText from "./components/GradientText.js";

export default function App() {
  let [fontsLoaded] = useFonts({
    MavenPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#1B1C25", flex: 1 }}>
      <StatusBar style="auto" />
      <GradientText style={styles.logotext}>WeBuyIt</GradientText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logotext: {
    fontFamily: "MavenPro_600SemiBold",
    fontSize: 40,
    letterSpacing: 6,
  },
});
