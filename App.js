import useCustomFonts from "./hooks/useFonts.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/Header.js";
import HomeScreen from "./screens/HomeScreen.js";
import DetailScreen from "./screens/DetailScreen.js";

const Stack = createNativeStackNavigator(); // gerencia a navegação entre telas, ex: a Home esta no topo, se vc navegar para Detail, ela vai por cima da Home

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer> {/* envolve toda a a aplicação, tipo o "root" da navegação */}
      <Stack.Navigator // define quais telas estarão dentro da navegação e suas opções 
        screenOptions={{
          headerStyle: { backgroundColor: "#1B1C25" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen // representa uma tela dentro do navegador
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Header />, // forma de passar um componente customizado para o header
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detalhes",  headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
