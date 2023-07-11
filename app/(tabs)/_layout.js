import { Tabs } from "expo-router";
import { Text } from "react-native";

const TabsLayout = () => {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />

      <Tabs.Screen
        name="images"
        options={{
          title: "Images",
          tabBarIcon: () => <Text>⚙️</Text>,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => <Text>⚙️</Text>,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
