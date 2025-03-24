import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 

export default function SignInC1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí deberías implementar la lógica para iniciar sesión
      // Por ahora solo redirigimos a una página de éxito
      router.push("/exito");
    }
  };

  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center">
          <Image source={require("../assets/images/Logo.png")} />
          <Text className="pl-3 font-outfit-semibold text-5xl leading-tight">
            EventSpace
          </Text>
        </View>
        <Text className="font-outfit text-xl my-10">Inicia Sesión</Text>
        
        <TextInput
          className={`h-14 w-full border ${errors.email ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2`}
          placeholder="Correo electrónico*"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
        {errors.email && <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>}

        <View className="relative w-full">
          <TextInput
            className={`h-14 w-full border ${errors.password ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl`}
            placeholder="Contraseña*"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            className="absolute right-3 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text className="text-red-500 text-sm">{errors.password}</Text>}

        <TouchableOpacity 
          className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4"
          onPress={handleSubmit}
        >
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <Text className="font-outfit-medium text-xl">
            ¿No tienes cuenta?{" "}
            <Link href="/Cliente/registerC2" className="font-outfit-bold">
                Regístrate
            </Link>
        </Text>
      </View>
    </View>
  );
}
