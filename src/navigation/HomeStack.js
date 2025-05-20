import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import { LightThemeCustom, DarkThemeCustom } from "../styles/theme";
import HomeScreen from "../screens/HomeScreen";
import AllEventsScreen from "../screens/AllEventsScreen";
import HeaderList from "../components/HeaderList";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();
export default function HomeStack() {
  const colorScheme = useColorScheme()

  return (
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
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header />,
        }}
      />
      <Stack.Screen
        name="AllEvents"
        component={AllEventsScreen}
        options={{
          title: "",
          headerRight: () => <HeaderList />,
        }}
      />
    </Stack.Navigator>
  );
}
