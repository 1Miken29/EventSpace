import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useUser } from "../../hooks/UserContext";
import axios from "axios";

export default function signIn() {
  const baseURL = "https://eventspce-production.up.railway.app/api";
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { saveCredentials } = useUser()

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasMinLength = password.length >= 8;

    const newErrors = [];
    if (!hasUpperCase) newErrors.push('Debe contener al menos una mayúscula');
    if (!hasLowerCase) newErrors.push('Debe contener al menos una minúscula');
    if (!hasNumbers) newErrors.push('Debe contener al menos un número (0-9)');
    if (!hasSpecialChar) newErrors.push('Debe contener al menos un carácter especial (#,$,%,&,@)');
    if (!hasMinLength) newErrors.push('Debe contener al menos 8 caracteres');

    return newErrors;
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
      newErrors.email = 'El correo electrónico que introdujo no es válido, inténtelo de nuevo o regístrese';
    } else {
      const userStatus = await checkEmailStatus(formData.email);
      
      if (userStatus === 'not_found') {
        newErrors.email = 'Correo electrónico no encontrado';
      } else if (userStatus === 'deleted') {
        newErrors.email = 'El usuario al que intenta acceder dio de baja su cuenta en el sistema';
      } else if (userStatus === 'invalid_credentials') {
        newErrors.email = 'Las credenciales no son correctas, intente de nuevo';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Por favor ingrese su contraseña';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors; // Store all password errors
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try{
        await new Promise((resolve) => setTimeout(resolve, 100))
        const credentials = {
          email: formData.email,
          password: formData.password
        }
        const response = await axios.post(
          `${baseURL}/users/login`,
          credentials
        )
        console.log(response.data)
        saveCredentials(credentials)
        router.push("/bienvenido");
      } catch (error) {
        console.error(error.response?.data || error.message)
      }
    } else {
      const errorMessages = Object.values(newErrors).flat(); // Flatten nested arrays
      setAlertMessage(errorMessages); // Ensure alertMessage is an array
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
        <Text className="font-outfit text-xl my-10">Inicia sesión</Text>
        
        <TextInput
          className={`h-14 w-full border ${errors.email ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2 ${formData.email ? 'text-black' : 'text-[#C4C4C4]'}`}
          placeholder="Correo electrónico*"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
        />

        <View className="relative w-full">
          <TextInput
            className={`h-14 w-full border ${errors.password ? 'border-red-500 text-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2 ${formData.password ? 'text-black' : 'text-[#C4C4C4]'}`}
            placeholder="Contraseña*"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={!passwordVisible}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            className="absolute right-3 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="w-full">
          <Text className="font-outfit-medium text-xl text-left my-2">
            <Link href="/recu" className="font-outfit-medium">
              ¿Olvidaste tu contraseña?
            </Link>
          </Text>
        </View>

        <TouchableOpacity className="w-full border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4" onPress={handleSubmit}>
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
        
        <View className="w-full">
          <Text className="font-outfit-medium text-xl text-left">
            ¿Aún no tienes cuenta?,{" "}
            <Link href="/registerP1" className="font-outfit-bold">
              Regístrate
            </Link>
          </Text>
        </View>
        
        
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
