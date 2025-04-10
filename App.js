import useCustomFonts from "./hooks/useFonts.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "./components/Header.js";
import HeaderList from "./components/HeaderList.js";
import HomeScreen from "./screens/HomeScreen.js";
import ListScreen from "./screens/ListDetailsScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1B1C25" },
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
