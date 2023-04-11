import { View, Text, Button } from "react-native";
import { Link, Stack, useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { AuthStore } from "../store";

export default function Home() {
  const segments = useSegments();
  const router = useRouter();
  const { isLoggedIn } = AuthStore.useState((s) => s);
  const navigationState = useRootNavigationState();

  React.useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect away from the sign-in page.
      // router.replace("/");
    }
  }, [isLoggedIn, segments, navigationState?.key]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!navigationState?.key ? (
        <Text>{"LOADING..."}</Text>
      ) : (
        <>
          {/* Use the `Screen` component to configure the layout. */}
          <Stack.Screen
            options={{
              title: "Overview",
              headerShown: true,
              headerRight: () => (
                <Button
                  onPress={() => {
                    AuthStore.update((s) => {
                      s.isLoggedIn = false;
                    });
                    router.replace("/home");
                  }}
                  title="LOGOUT"
                />
              ),
            }}
          />
          {/* Use the `Link` component to enable optimized client-side routing. */}
          <Link href="/details">Go to Details</Link>
        </>
      )}
    </View>
  );
}
