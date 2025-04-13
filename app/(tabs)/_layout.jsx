import { Octicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const navigation = useNavigation();
  const user = {
    name: "Adrian Hajdin",
    profileImage: "https://picsum.photos/50",
  };
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }} className="h-10">
      <Tabs.Screen
        name="inicial"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="home" color={color} />
          ),
          headerShown: true,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity className="m-5">
              <Image
                source={require("../../assets/images/notification.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View>
              <TouchableOpacity className="flex-row items-center m-5" onPress={() => navigation.navigate('user')}>
              <Image
                source={{ uri: user.profileImage }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <Text className="text-lg font-outfit-bold text-[#191D31]">
                {user.name}
              </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="user-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
