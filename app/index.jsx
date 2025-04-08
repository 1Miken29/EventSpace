import { useRouter } from "expo-router";
import "../global.css";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="bg-white h-full">
      

      <View className="flex flex-col items-center justify-center">
        <Text className="font-outfit text-2xl mb-4">
          Bienvenido a EventSpace
        </Text>
        <Text className="font-outfit-semibold text-5xl">
          Tu Salón, El Escenario De
        </Text>
        <Text className="font-outfit-semibold text-5xl my-2 text-[#9B47C3]">
          Grandes Momentos
        </Text>
        <TouchableOpacity
          className="border border-[#C4C4C4] my-2 py-2 px-6 rounded-full active:"
          onPress={() => router.push("/registerP1")}
        >
          <Text className="font-outfit-medium text-xl my-2">
            Registrate en EventSpace
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-[#C4C4C4] my-2 py-2 px-6 rounded-full active:"
          onPress={() => router.push("/signIn")}
        >
          <Text className="font-outfit-medium text-xl my-2">
            Inicia Sesión en EventSpace
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
