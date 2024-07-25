import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Apps/pages/splashScreen";
import { ToastProvider } from "react-native-toast-notifications";
import MainNavigator from "./Apps/navigations/MainNavigator";

import { QueryClientProvider } from "@tanstack/react-query";
import AuthUserProvider from "./Apps/context/AuthUserProvider";
import CommonProgress from "./Apps/components/global/progress/CommonProgress";
import { adminQueryClient } from "./api";

const loadFonts = async () => {
  await Font.loadAsync({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-SemiBold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <CommonProgress />;
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <QueryClientProvider client={adminQueryClient}>
        <AuthUserProvider>
          <ToastProvider
            renderType={{
              custom_type: (toast) => (
                <View style={{ padding: 15, backgroundColor: "grey" }}>
                  <Text>{toast.message}</Text>
                </View>
              ),
            }}
          >
            {/* <SplashScreen /> */}

            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </ToastProvider>
        </AuthUserProvider>
      </QueryClientProvider>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
