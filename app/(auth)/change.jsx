import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../hooks/UserContext";
import VignetteImage from "../../assets/images/viñ.png"; // Importa la imagen
import CheckImage from "../../assets/images/ver.png"; // Importa la imagen de verificación
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export default function ChangePassword() {
  const navigation = useNavigation(); // Initialize navigation
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertOpacity = useState(new Animated.Value(0))[0];
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile"); // State to track selected tab

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

  const validatePasswords = () => {
    const newErrors = {};
    const currentPasswordInDB = "miContraseñaActual"; // Replace with the actual password from the database

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Por favor ingrese su contraseña actual";
    } else if (formData.oldPassword !== currentPasswordInDB) {
      newErrors.oldPassword = "La contraseña actual no es correcta";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Por favor ingrese una nueva contraseña";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "La nueva contraseña debe tener al menos 8 caracteres";
    } else if (formData.newPassword === formData.oldPassword) {
      newErrors.newPassword = "La nueva contraseña es la misma a la anterior";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validatePasswords()) {
      setAlertMessage(["Contraseña actualizada correctamente"]);
      setShowAlert(true);
      setTimeout(() => {
        navigation.navigate("cPass");
      }, 3000); 
    } else {
      const errorMessages = Object.values(errors).filter((error) => error !== "");
      setAlertMessage(errorMessages); 
      setShowAlert(true); 
    }
  };

  const handleInputChange = (field, value) => {
    const sanitizedValue = value.replace(/[^a-zA-Z0-9#$%&@]/g, ""); 
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
  };

  const PasswordRequirements = () => {
    const password = formData.newPassword; // Use the new password field
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    const borderColor = password ? "#8B5DFF" : "black"; // Change border color dynamically

    return (
      <View
        className="w-full border p-4 mt-6"
        style={{ borderColor: borderColor }} // Apply dynamic border color
      >
        <Text
          className={`font-outfit-medium mb-2 ${
            password ? "text-[#8B5DFF]" : "text-black"
          }`}
        >
          Tu contraseña debe contener:
        </Text>

        <View className="pl-4">
          <View className="flex flex-row items-center mb-1">
            <Image
              source={hasMinLength ? CheckImage : VignetteImage}
              style={{
                width: 15,
                height: 15,
                marginRight: 8,
                tintColor: hasMinLength ? "#8B5DFF" : "black",
              }}
            />
            <Text
              className={`font-outfit text-sm ${
                hasMinLength ? "text-[#8B5DFF]" : "text-black"
              }`}
            >
              Al menos 8 caracteres de largo
            </Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image
              source={hasLowerCase ? CheckImage : VignetteImage}
              style={{
                width: 15,
                height: 15,
                marginRight: 8,
                tintColor: hasLowerCase ? "#8B5DFF" : "black",
              }}
            />
            <Text
              className={`font-outfit text-sm ${
                hasLowerCase ? "text-[#8B5DFF]" : "text-black"
              }`}
            >
              Letras minúsculas (a-z)
            </Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image
              source={hasUpperCase ? CheckImage : VignetteImage}
              style={{
                width: 15,
                height: 15,
                marginRight: 8,
                tintColor: hasUpperCase ? "#8B5DFF" : "black",
              }}
            />
            <Text
              className={`font-outfit text-sm ${
                hasUpperCase ? "text-[#8B5DFF]" : "text-black"
              }`}
            >
              Letras mayúsculas (A-Z)
            </Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image
              source={hasSpecialChar ? CheckImage : VignetteImage}
              style={{
                width: 15,
                height: 15,
                marginRight: 8,
                tintColor: hasSpecialChar ? "#8B5DFF" : "black",
              }}
            />
            <Text
              className={`font-outfit text-sm ${
                hasSpecialChar ? "text-[#8B5DFF]" : "text-black"
              }`}
            >
              Caracteres especiales (#,$,%,&,@)
            </Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image
              source={hasNumber ? CheckImage : VignetteImage}
              style={{
                width: 15,
                height: 15,
                marginRight: 8,
                tintColor: hasNumber ? "#8B5DFF" : "black",
              }}
            />
            <Text
              className={`font-outfit text-sm ${
                hasNumber ? "text-[#8B5DFF]" : "text-black"
              }`}
            >
              Números (0-9)
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-5 bg-[#8B5DFF1A] items-center justify-center">
      <Text className="text-3xl font-outfit text-[#191D31] mb-5 self-start w-[80%]">Editar Contraseña</Text>

      <View className="bg-[#8B5DFF24] rounded-[33px] w-[95%] p-5">
        <Text className="text-lg font-outfit-medium text-[#8B5DFF] mb-2">Contraseña Actual</Text>
        <View className="relative">
          <TextInput
            className={`h-14 w-full border bg-white ${errors.oldPassword ? "border-red-500" : "border-[#C4C4C4]"} rounded-xl p-3 font-outfit text-xl`}
            placeholder="xxxxxx"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            value={formData.oldPassword}
            onChangeText={(text) => handleInputChange("oldPassword", text)}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-outfit-medium text-[#8B5DFF] mt-4 mb-2">Contraseña Nueva</Text>
        <View className="relative">
          <TextInput
            className={`h-14 w-full border bg-white ${errors.newPassword ? "border-red-500" : "border-[#C4C4C4]"} rounded-xl p-3 font-outfit text-xl`}
            placeholder="xxxxxx"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            value={formData.newPassword}
            onChangeText={(text) => handleInputChange("newPassword", text)}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-outfit-medium text-[#8B5DFF] mt-4 mb-2">Confirmar Contraseña</Text>
        <View className="relative">
          <TextInput
            className={`h-14 w-full border bg-white ${errors.confirmPassword ? "border-red-500" : "border-[#C4C4C4]"} rounded-xl p-3 font-outfit text-xl`}
            placeholder="xxxxxx"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <PasswordRequirements />

        <View className="flex flex-row items-center justify-between w-full mt-6">
          <TouchableOpacity
            className="w-[48%] bg-[#8B5DFF4D] py-3 rounded-full border border-[#8B5DFF]"
            onPress={() => navigation.navigate("formUser")} // Navigate to formUser
          >
            <Text className="text-white font-outfit text-lg text-center">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[48%] bg-[#8B5DFFB0] py-3 rounded-full border border-[#8B5DFF]"
            onPress={handleSubmit}>
            <Text className="text-white font-outfit text-lg text-center">Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showAlert && Array.isArray(alertMessage) && alertMessage.map((message, index) => (
          <Animated.View
            key={index}
            style={{
            opacity: alertOpacity,
            transform: [{ translateY: alertOpacity.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            position: 'absolute',
            bottom: 20 + index * 60, 
            width: '85%',
            backgroundColor: '#00000066', 
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

      {/* Bottom Banner */}
      <View style={styles.banner}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setSelectedTab("home");
            navigation.navigate("inicio");
          }}
        >
          <Image
            source={
              selectedTab === "home"
                ? require('../../assets/images/Fhome.png')
                : require('../../assets/images/home.png')
            }
            style={[
              styles.icon,
              { tintColor: selectedTab === "home" ? "#8B5DFF" : "#666876" },
            ]}
          />
          <Text
            style={[
              styles.iconText,
              { color: selectedTab === "home" ? "#8B5DFF" : "#666876" },
            ]}
          >
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setSelectedTab("search");
            navigation.navigate("Buscar"); // Navigate to the search screen
          }}
        >
          <Image
            source={
              selectedTab === "search"
                ? require('../../assets/images/Fsearch.png')
                : require('../../assets/images/search.png')
            }
            style={[
              styles.icon,
              { tintColor: selectedTab === "search" ? "#8B5DFF" : "#666876" },
            ]}
          />
          <Text
            style={[
              styles.iconText,
              { color: selectedTab === "search" ? "#8B5DFF" : "#666876" },
            ]}
          >
            Buscar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setSelectedTab("profile");
            navigation.navigate("user");
          }}
        >
          <Image
            source={
              selectedTab === "profile"
                ? require('../../assets/images/p.png')
                : require('../../assets/images/profile.png')
            }
            style={[
              styles.icon,
              { tintColor: selectedTab === "profile" ? "#8B5DFF" : "#666876" },
            ]}
          />
          <Text
            style={[
              styles.iconText,
              { color: selectedTab === "profile" ? "#8B5DFF" : "#666876" },
            ]}
          >
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#666876',
  },
  iconText: {
    fontSize: 12,
    color: '#666876',
    marginTop: 4,
  },
});