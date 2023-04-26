import { Redirect, Stack, useRouter } from "expo-router";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { AuthStore, appSignOut } from "../../../store";

const Tab2Index = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
      {/* <Text style={{ fontFamily: "EncodeSansSemiCondensed_100Thin" }}>
        EncodeSansSemiCondensed_100Thin
      </Text>
      <Text style={{ fontFamily: "EncodeSansSemiCondensed_300Light" }}>
        EncodeSansSemiCondensed_300Light
      </Text> */}
      <Text style={{ fontFamily: "EncodeSansSemiCondensed_400Regular" }}>
        {AuthStore.getRawState().user?.email}
      </Text>
      <Text style={{ fontFamily: "EncodeSansSemiCondensed_700Bold" }}>
        {AuthStore.getRawState().user?.displayName}
      </Text>
      <Button
        onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}
        title="LOGOUT"
      />

      <Pressable
        onPress={() => {
          alert("pressed");
        }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#920" : "#818" },
          {
            borderColor: "#920",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 6,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "EncodeSansSemiCondensed_700Bold",
            color: "white",
          }}
        >
          Button
        </Text>
      </Pressable>
    </View>
  );
};
export default Tab2Index;
