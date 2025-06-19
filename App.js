import { useEffect, useState } from "react";
import { useColorScheme, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// import { auth } from "./src/database/firebaseConfig.js";
// import { onAuthStateChanged } from "firebase/auth";

import { LightThemeCustom, DarkThemeCustom } from "./src/styles/theme.js";
import useCustomFonts from "./src/hooks/useFonts.js";
import BottomTabs from "./src/navigation/BottomTabs.js";
import LoginScreen from "./src/screens/LoginScreen.js";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext.js";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loadingAuth } = useAuth();
  const colorScheme = useColorScheme();
  
  if (loadingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5DCFAE" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        translucent={true}
      />
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkThemeCustom : LightThemeCustom}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Main" component={BottomTabs} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  const fontsLoaded = useCustomFonts();
  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5DCFAE" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}