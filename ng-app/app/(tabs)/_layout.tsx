import { Tabs } from "expo-router";
import "../../global.css";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopColor: "#e5e5e5",
            borderTopWidth: 0.5,
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#a3a3a3",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: () => <Ionicons name="home-outline" size={24} color="black" />,
          }}
        />
        <Tabs.Screen
          name="SportCardScreen"
          options={{
            title: "Generar Acta",
            tabBarIcon: () => <Ionicons name="newspaper-outline" size={24} color="black" />,
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
