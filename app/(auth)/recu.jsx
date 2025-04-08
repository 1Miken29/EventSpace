import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default function Recuperacion() {
  const baseURL = "https://eventspce-production.up.railway.app/api"
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]); // Initialize as an array
  const alertOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (showAlert) {
      Animated.timing(alertOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(alertOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setShowAlert(false));
        }, 3000); 
      });
    }
  }, [showAlert]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const checkEmailStatus = async (email) => {
    // Aquí deberías implementar la lógica para verificar el email en tu backend
    // Simulamos diferentes estados de usuario
    //const userStatus = 'not_found'; // Puede ser 'active', 'deleted', 'not_found', 'invalid_credentials'
    //return userStatus;
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Por favor ingrese su correo electrónico';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El correo que introdujo es inválido, inténtelo de nuevo';
    } else {
      const userStatus = await checkEmailStatus(formData.email);
      if (userStatus === 'not_found') {
        newErrors.email = 'El correo que introdujo no ha sido encontrado, inténtelo de nuevo';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try{
        await new Promise((resolve) => setTimeout(resolve, 100))
        const correo = {
          email: formData.email
        }
        const response = await axios.post(
          `${baseURL}/users/forgot_password`,
          correo
        )
        console.log(response.data)
        router.push("/reen");
      } catch (error) {
        console.error(error.response?.data || error.message)
      }
    } else {
      const errorMessages = Object.values(newErrors); // Ensure alertMessage is an array
      setAlertMessage(errorMessages);
      setShowAlert(true);
    }
  };

  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
      <View className="flex flex-row items-center w-90">
          <Image source={require("../../assets/images/Logo.png")} />
          <Text className="pl-4 font-outfit-bold text-5xl ">
            EventSpace
          </Text>
        </View>
        <Text className="font-outfit text-xl my-10">¿Olvidaste tu contraseña?</Text>
        <Text className="font-outfit text-l mb-10 text-center w-2/3">Introduce tu direccion de correo electronico para restablecer tu contraseña</Text>

        
        <TextInput
          className={`h-16 w-full border ${errors.email ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2 ${formData.email ? 'text-black' : 'text-[#C4C4C4]'}`}
          placeholder="Correo electrónico*"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity className="w-full border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4" onPress={handleSubmit}>
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Enviar Correo
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center my-4 w-full">
          <View className="flex-1 h-px bg-[#C4C4C4]"></View>
          <Text className="px-4 font-outfit text-xl text-[#C4C4C4]">o</Text>
          <View className="flex-1 h-px bg-[#C4C4C4]"></View>
        </View>

        <TouchableOpacity className="w-full border-2 border-[#C4C4C4] bg-transparent py-[18px] rounded-full my-4">
            <Link href="/signIn" className="flex flex-row items-center justify-center">
                <Text className="text-2xl font-outfit-medium text-center text-black">
                Regresar
                </Text>
            </Link>
          
        </TouchableOpacity>
        
        
      </View>

      {showAlert && Array.isArray(alertMessage) && alertMessage.map((message, index) => (
          <Animated.View
            key={index}
            style={{
            opacity: alertOpacity,
            transform: [{ translateY: alertOpacity.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            position: 'absolute',
            bottom: 20 + index * 60, // Stack alerts vertically
            width: '85%',
            backgroundColor: '#00000066', // Ensure background color is visible
            padding: 14,
            borderRadius: 50,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',}}>
              <Image
                source={require('../../assets/images/no.png')}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text className="text-white font-outfit-medium text-center flex-1">{message}</Text>
            </Animated.View>
          ))}
    </View>
  );
}
