import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View, Animated } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function ReenviarMensaje() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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

  const handleReenviarMensaje = () => {
    setAlertMessage('Mensaje reenviado con éxito');
    setShowAlert(true);
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
        <Text className="font-outfit-semibold text-xl my-10">Revisa tu correo electrónico</Text>
        <Text className="font-outfit-semibold text-lg mb-10 text-center w-auto">Enviamos un mensaje para validar tu direccion. Si no lo ves, revisa tu carpeta de correo no deseado.</Text>
        
        <TouchableOpacity className="w-full border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4" onPress={handleReenviarMensaje}>
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Reenviar Mensaje
          </Text>
        </TouchableOpacity>
      </View>

      {showAlert && (
        <Animated.View style={{ opacity: alertOpacity }} className="absolute bottom-10 w-11/12 bg-[#C4C4C4] p-4 rounded-lg items-center justify-center">
          <Text className="text-black text-center">{alertMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}
