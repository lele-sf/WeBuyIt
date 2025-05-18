import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LightThemeCustom, DarkThemeCustom } from "./src/styles/theme.js";
import useCustomFonts from "./src/hooks/useFonts.js";
import BottomTabs from "./src/navigation/BottomTabs.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useCustomFonts();
  const colorScheme = useColorScheme(); // retorna "dark" ou "light"
  console.log("Detected color scheme:", colorScheme);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // aqui é usada a prop theme para definir o tema global do app
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkThemeCustom : LightThemeCustom}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
