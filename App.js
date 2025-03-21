import { SafeAreaView, StatusBar } from "react-native";
import useCustomFonts from "./hooks/useFonts.js";
import Header from "./components/Header.js";

export default function App() {
  const fontsLoaded = useCustomFonts();
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#1B1C25", flex: 1 }}>
      <StatusBar style="auto" />
      <Header />
    </SafeAreaView>
  );
}
