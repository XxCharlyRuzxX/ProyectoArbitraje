import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";


export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-neutral-50 px-5 pt-16">
      <Text className="text-2xl font-medium text-neutral-900 mb-1">
        Bienvenido
      </Text>
      <Text className="text-sm text-neutral-400 mb-10">
        Sistema de actas deportivas
      </Text>
      <Image
      className="aspect-square w-full p-10"
      source={{ uri: "https://cdn-icons-png.flaticon.com/512/26/26846.png" }}
      />
        <View className="justify-end flex-1 mb-10">
        <TouchableOpacity
          className="h-14 bg-blue-500 rounded-2xl items-center justify-center"
          onPress={() => router.push("/SportCardScreen")}
        >
        <Text className="text-white text-base font-medium">
          + Nueva acta
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}