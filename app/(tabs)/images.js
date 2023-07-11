import { Stack, useRouter } from "expo-router";
import { Alert, View } from "react-native";
import MyFilesList from "../components/MyList";
import { useEffect } from "react";
import { listFiles } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";

const Tab2Images = () => {
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
          title: "Storage Images",
        }}
      />
      <MyFilesList files={data} />
    </View>
  );
};
export default Tab2Images;
