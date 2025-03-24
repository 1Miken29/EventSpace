import { Link, router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function SignInC1() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
  });
  
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÁ-ÿ\s]{1,40}$/;
    return nameRegex.test(name);
  };

  const filterOnlyLetters = (text) => {
    return text.replace(/[^A-Za-zÁ-ÿ\s]/g, '');
  };

  const handleNameChange = (text, field) => {
    const filteredText = filterOnlyLetters(text);
    setFormData({...formData, [field]: filteredText});
    
    // Validación en tiempo real
    if (filteredText.length > 0 && !validateName(filteredText)) {
      setErrors({...errors, [field]: 'Solo se permiten letras'});
    } else {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate.split('/').reverse().join('-'));
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validateDate = (date) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return dateRegex.test(date);
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!validateName(formData.nombre)) {
      newErrors.nombre = 'Nombre inválido';
    }
    if (!validateName(formData.apellidoPaterno)) {
      newErrors.apellidoPaterno = 'Apellido paterno inválido';
    }
    if (!validateName(formData.apellidoMaterno)) {
      newErrors.apellidoMaterno = 'Apellido materno inválido';
    }
    if (!validateDate(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Fecha inválida';
    } else if (!validateAge(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Debe ser mayor de edad';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      router.push("register2");
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
        <Text className="font-outfit text-xl my-10">Crea tu usuario</Text>
        <TextInput
          className={`h-14 w-full border ${errors.nombre ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl`}
          placeholder="Nombre(s)*"
          value={formData.nombre}
          onChangeText={(text) => handleNameChange(text, 'nombre')}
        />
        
        <View className="flex flex-row my-2 gap-2">
          <View className="flex-1">
            <TextInput
              className={`h-14 w-full border ${errors.apellidoPaterno ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl`}
              placeholder="Apellido Paterno*"
              value={formData.apellidoPaterno}
              onChangeText={(text) => handleNameChange(text, 'apellidoPaterno')}
            />
          </View>
          <View className="flex-1">
            <TextInput
              className={`h-14 w-full border ${errors.apellidoMaterno ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl`}
              placeholder="Apellido Materno*"
              value={formData.apellidoMaterno}
              onChangeText={(text) => handleNameChange(text, 'apellidoMaterno')}
            />
          </View>
        </View>
        
        <TextInput
          className={`h-14 w-full border ${errors.fechaNacimiento ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl`}
          placeholder="Fecha de Nacimiento (DD/MM/AAAA)*"
          value={formData.fechaNacimiento}
          onChangeText={(text) => setFormData({...formData, fechaNacimiento: text})}
        />
        
        <TouchableOpacity 
          className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4"
          onPress={handleSubmit}
        >
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Siguiente
          </Text>
        </TouchableOpacity>
        <Text className="font-outfit-medium text-xl">
            ¿Ya tienes cuenta?{" "}
            <Link href="sign-in" className="font-outfit-bold">
                Inicia Sesión
            </Link>
        </Text>
      </View>
    </View>
  );
}
