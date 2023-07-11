import { Link, Redirect, Stack, useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MyFilesList from "../components/MyList";
import { useEffect, useState } from "react";
import { listFiles } from "../../firebase-config";
import { AntDesign } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Tab1Index = () => {
  const router = useRouter();
  // Queries
  const { data, error, isError } = useQuery({
    queryKey: ["image-storage"],
    queryFn: listFiles,
  });

  console.log(data, error, isError);

  useEffect(() => {
    if (error) {
      Alert.alert("Error Getting Images", error.message);
    }
  }, [error]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: "#920",
          title: "Home",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/new-entry-modal")}>
              <AntDesign name="addfile" size={24} color="#920" style={{marginRight:16}} />
            </TouchableOpacity>
          ),
        }}
      />
      <MyFilesList files={data} />
      {/* <Link href="/details">Go to Details</Link> */}
      {/* <Link href="/new-entry-modal">Present modal</Link> */}
    </View>
  );
};
export default Tab1Index;
