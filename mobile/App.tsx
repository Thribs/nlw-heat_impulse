import React from "react";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Home } from "./src/screens/Home";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./hooks/auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <AuthProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Home />
      </AuthProvider>
    </>
  );
}
