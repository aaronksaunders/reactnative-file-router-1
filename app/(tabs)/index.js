import { Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect } from "react";
import { listTasks } from "../../firebase-config";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

const Tab1Index = () => {
  const router = useRouter();

  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: listTasks,
  });

  if (error) {
    Alert.alert("Error Getting Tasks", error.message);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#920" />
        <Text style={{ color: "#920" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: "#920",
          title: "Home",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/new-entry-modal")}>
              <AntDesign
                name="addfile"
                size={24}
                color="#920"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <MyFilesList files={data} /> */}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};
export default Tab1Index;
