import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import AllEventsScreen from "../screens/AllEventsScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import HeaderList from "../components/layout/HeaderList";
import Header from "../components/layout/Header";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
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
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={({ route }) => ({
          headerTitle: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          title: route.params?.event?.title || 'Event Details'
        })}
      />
    </Stack.Navigator>
  );
}
