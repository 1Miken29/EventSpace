import React from 'react';
import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const success = () => {
  const router = useRouter();
  return (
    <View className="bg-[#8B5DFF1A] w-full h-full items-center justify-center">

        <View className="flex flex-row items-center w-80">
            <Text className="pl-2 font-outfit text-3xl leading-tight mb-20">
              Editar Contraseña
            </Text>
        </View>

      <View className="bg-[#8B5DFF24] rounded-[33px] w-[80%] px-4 items-center py-10">
        
        <Image source={require("../assets/images/check.png")} className="mt-10"/>
        <Text className="font-outfit m-10 text-center text-2xl">
            La Contraseña se ha editado correctamente
        </Text>
        <TouchableOpacity className="w-[90%] border border-[#8B5DFF] bg-[#8B5DFFB0] py-[15px] rounded-full">
          <Link
            href="/user"
            className="text-[20px] font-outfit-medium text-center text-white">
            Volver a Perfil
          </Link>
        </TouchableOpacity>
      </View>


    
    </View>
  );
};
export default success;
