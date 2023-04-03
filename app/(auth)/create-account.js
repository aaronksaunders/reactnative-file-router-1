import { Text, View } from "react-native";
import { AuthStore } from "../../store.js";
import { Stack, useRouter } from "expo-router";

export default function CreateAccount() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{ title: "Create Account", headerLeft: () => <></> }}
      />
      <Text
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = true;
          });
          router.back();
        }}
      >
        CANCEL
      </Text>
    </View>
  );
}
