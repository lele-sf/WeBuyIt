import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { auth } from "./src/database/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

import { LightThemeCustom, DarkThemeCustom } from "./src/styles/theme.js";
import useCustomFonts from "./src/hooks/useFonts.js";
import BottomTabs from "./src/navigation/BottomTabs.js";
import LoginScreen from "./src/screens/loginScreen.js";
import { UserProvider } from "./src/contexts/UserContext.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const fontsLoaded = useCustomFonts();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded || loadingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5DCFAE" />
      </View>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkThemeCustom : LightThemeCustom}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="HomeStack" component={BottomTabs} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
