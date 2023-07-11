import { SplashScreen, Stack } from "expo-router";
import { AuthStore } from "../store";

import {
  useFonts,
  EncodeSansSemiCondensed_100Thin,
  EncodeSansSemiCondensed_300Light,
  EncodeSansSemiCondensed_400Regular,
  EncodeSansSemiCondensed_700Bold,
} from "@expo-google-fonts/encode-sans-semi-condensed";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    EncodeSansSemiCondensed_700Bold,
    EncodeSansSemiCondensed_400Regular,
    EncodeSansSemiCondensed_300Light,
    EncodeSansSemiCondensed_100Thin,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Create a client
  const queryClient = new QueryClient();

  return (
    // <Stack screenOptions={{ headerShown: false }}  />
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { initialized, user, isLoggedIn } = AuthStore.useState();

  if (!initialized && !user) return null;
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="new-entry-modal"
          options={{ presentation: "modal", headerShown: true }}
        />
      </Stack>
    </ThemeProvider>
  );
}
