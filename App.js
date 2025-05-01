import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useCustomFonts from "./src/hooks/useFonts.js";
import Header from "./src/components/Header.js";
import HeaderList from "./src/components/HeaderList.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import ListScreen from "./src/screens/ListDetailsScreen.js";
import { LightThemeCustom, DarkThemeCustom } from "./src/styles/theme.js";

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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor:
              colorScheme === "dark"
                ? DarkThemeCustom.colors.background
                : LightThemeCustom.colors.background,
          },
          headerTintColor: "#5DCFAE",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Header />,
          }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{
            title: "",
            headerRight: () => <HeaderList />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
