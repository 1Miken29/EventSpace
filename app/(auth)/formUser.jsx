import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";

const UserDataForm = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    email: '',
    phone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [originalData, setOriginalData] = useState(userData);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]); // Initialize as an array
  const [showAlert, setShowAlert] = useState(false); // Ensure showAlert is defined
  const alertOpacity = useState(new Animated.Value(0))[0]; // Ensure alertOpacity is defined
  const [isProfilePressed, setIsProfilePressed] = useState(false); // State to track press

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

  const validateName = (name) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name); // Solo letras y espacios
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Validación estándar de correo
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone); // Solo números, longitud de 10 dígitos

  const handleChange = (name, value) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));

    let error = '';
    if (name === 'firstName' || name === 'lastName' || name === 'maternalLastName') {
      if (!validateName(value)) {
        error = 'Solo se permiten letras y espacios.';
      }
    } else if (name === 'email') {
      if (!validateEmail(value)) {
        error = 'Correo no válido.';
      }
    } else if (name === 'phone') {
      if (!validatePhone(value)) {
        setAlertMessage(['El número debe tener 10 dígitos']); // Set alert message
        setShowAlert(true); // Show alert
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const filterNameInput = (text) => text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Eliminar caracteres no permitidos
  const filterPhoneInput = (text) => text.replace(/[^0-9]/g, ''); // Eliminar todo excepto números

  const handleEdit = () => {
    if (isEditing) {
      // Si está editando y presiona cancelar
      setUserData(originalData); // Restaura los datos originales
      setIsEditing(false);
      setActiveButton(null);
    } else {
      // Si va a comenzar a editar
      setOriginalData(userData); // Guarda los datos originales
      setIsEditing(true);
      setActiveButton('edit');
    }
  };

  const validateAllFields = () => {
    const fieldsToValidate = { ...userData };
    
    // Exclude password from validation if not editing password
    if (!isEditingPassword) {
      delete fieldsToValidate.password;
    }
  
    const hasEmptyFields = Object.values(fieldsToValidate).some(value => value.trim() === '');
    if (hasEmptyFields) {
      setAlertMessage(['Por favor no deje ningún campo vacío']); // Set alert message
      setShowAlert(true); // Show alert
      return false;
    }
  
    const hasValidationErrors = Object.values(errors).some(error => error !== '');
    if (hasValidationErrors) {
      return false; // Prevent saving if there are validation errors
    }
  
    return true;
  };

  const handleSave = () => {
    if (!validateAllFields()) {
      return; // Do nothing if validation fails
    }
    setShowConfirmDialog(true); // Show confirmation dialog if validation passes
  };

  const confirmSave = () => {
    setOriginalData(userData);
    setIsEditing(false);
    setActiveButton(null);
    setShowConfirmDialog(false);
    navigation.navigate('success'); 
  };

  return (
    <View className="flex-1 p-5 bg-[#8B5DFF1A] items-center justify-center">
      <Text className="text-3xl font-outfit text-[#191D31] mb-5 text-left w-[95%]">
        Datos del Usuario
      </Text>

      <View className="bg-[#8B5DFF24] rounded-[33px] w-[95%] p-3 py-8">
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Nombre(s)
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="p-3 border border-[#C4C4C4] rounded-[11px] bg-white w-11/12 self-center px-2"
                placeholder="Nombre(s)"
                placeholderTextColor="#C4C4C4"
                value={userData.firstName}
                onChangeText={(text) => handleChange('firstName', filterNameInput(text))}
                style={{
                  color: userData.firstName ? '#000000' : '#C4C4C4'
                }}
              />
              {errors.firstName ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.firstName}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded-[11px] bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.firstName || 'Nombre(s)'}</Text>
            </View>
          )}
        </View>

        {/* Apellido Paterno */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Apellido Paterno
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="p-3 border border-[#C4C4C4] rounded-[11px] bg-white w-11/12 self-center px-2"
                placeholder="Apellido Paterno"
                placeholderTextColor="#C4C4C4"
                value={userData.lastName}
                onChangeText={(text) => handleChange('lastName', filterNameInput(text))}
                style={{
                  color: userData.lastName ? '#000000' : '#C4C4C4'
                }}
              />
              {errors.lastName ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.lastName}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded-[11px] bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.lastName || 'Apellido Paterno'}</Text>
            </View>
          )}
        </View>

        {/* Apellido Materno */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Apellido Materno
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="p-3 border border-[#C4C4C4] rounded-[11px] bg-white w-11/12 self-center px-2"
                placeholder="Apellido Materno"
                placeholderTextColor="#C4C4C4"
                value={userData.maternalLastName}
                onChangeText={(text) => handleChange('maternalLastName', filterNameInput(text))}
                style={{
                  color: userData.maternalLastName ? '#000000' : '#C4C4C4'
                }}
              />
              {errors.maternalLastName ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.maternalLastName}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded-[11px] bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.maternalLastName || 'Apellido Materno'}</Text>
            </View>
          )}
        </View>

        {/* Correo Electrónico */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Correo Electrónico
          </Text>
          {isEditing ? (
            <TextInput
              className="p-3 border border-[#C4C4C4] rounded-[11px] bg-white w-11/12 self-center px-2"
              placeholder="Correo Electrónico"
              placeholderTextColor="#C4C4C4"
              underlineColorAndroid="transparent"
              value={userData.email}
              onChangeText={(text) => handleChange('email', text)}
              style={{
                color: userData.email ? '#000000' : '#C4C4C4'
              }}
              keyboardType="email-address"
            />
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded-[11px] bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.email || 'Correo Electrónico'}</Text>
            </View>
          )}
        </View>

        {/* Teléfono */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Teléfono
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="p-3 border border-[#C4C4C4] rounded-[11px] bg-white w-11/12 self-center px-2"
                placeholder="Teléfono"
                placeholderTextColor="#C4C4C4"
                value={userData.phone}
                onChangeText={(text) => handleChange('phone', filterPhoneInput(text))}
                style={{
                  color: userData.phone ? '#000000' : '#C4C4C4'
                }}
                keyboardType="phone-pad"
              />
              {errors.phone ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.phone}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded-[11px] bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.phone || 'Teléfono'}</Text>
            </View>
          )}
        </View>

        {/* Contraseña */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Contraseña
          </Text>
          {isEditingPassword ? (
            <TextInput
              className="p-3 border border-[#C4C4C4] rounded-[11px] bg-white w-11/12 self-center px-2"
              placeholder="Contraseña"
              placeholderTextColor="#C4C4C4"
              value={userData.password}
              
              onChangeText={(text) => handleChange('password', text)}
              style={{
                color: userData.password ? '#000000' : '#C4C4C4'
              }}
              secureTextEntry
            />
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded-[11px] bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.password ? userData.password.replace(/./g, '•') : 'Contraseña'}</Text>
            </View>
          )}
        </View>

        {/* Botones */}
        <View className="flex-row justify-between mt-5">
          <TouchableOpacity
            className={`p-3 rounded-full w-[49%] items-center border border-[#8B5DFF] ${
              isEditing ? 'bg-[#8B5DFFB0]' : 'bg-[#8B5DFF4D]'
            }`}
            onPress={handleEdit}
          >
            <Text className="text-white font-outfit-light text-center">
              {isEditing ? 'Cancelar' : 'Editar Datos del Usuario'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-3 rounded-full w-[49%] items-center border border-[#8B5DFF] ${
              (isEditing || activeButton === 'password') ? 'bg-[#8B5DFFB0]' : 'bg-[#8B5DFF4D]'
            }`}
            onPress={isEditing ? handleSave : () => {
              setActiveButton('password');
              navigation.navigate('change');
            }}
            disabled={isEditing && Object.values(errors).some(error => error !== '')}
          >
            <Text className="text-white font-outfit-light text-center">
              {isEditing ? 'Guardar' : 'Editar Contraseña'}
            </Text>
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
                  bottom: 20 + index * 60, // Stack alerts vertically
                  width: '85%',
                  backgroundColor: '#00000066', // Ensure background color is visible
                  padding: 14,
                  borderRadius: 50,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../assets/images/no.png')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <Text className="text-white font-outfit-medium text-center flex-1">{message}</Text>
              </Animated.View>
            ))}

      {showConfirmDialog && (
        <View className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <View className="bg-white p-6 rounded-[30px] w-[80%] m-4">
            <Text className="text-lg text-center text-[#191D31] mb-4 font-outfit">
              ¿Estás seguro de continuar con la edición?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-[#8B5DFF4D] p-3 rounded-full flex-1 mr-2 border border-[#8B5DFF]"
                onPress={() => setShowConfirmDialog(false)}
              >
                <Text className="text-[#666876] font-outfit text-center">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#8B5DFFB0] p-3 rounded-full flex-1 ml-2 border border-[#8B5DFF]"
                onPress={confirmSave}
              >
                <Text className="text-white font-outfit text-center">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTopColor: '#C4C4C4',
            borderTopWidth: 1,
          }}
        >
          <View className="flex-column justify-between ">
              <Image
              source={require('../../assets/images/home.png')}
              style={{ width: 30, height: 30 }}
              tintColor="#666876"
              />
              <Text className="text-[#666876] font-outfit-light text-center text-sm">Inicio</Text>
          </View>
          <View className="flex-column justify-between ">
              <Image
              source={require('../../assets/images/search.png')}
              style={{ width: 30, height: 30 }}
              tintColor="#666876"
              />
              <Text className="text-[#666876] font-outfit-light text-center text-sm">Buscar</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsProfilePressed(true); // Change color on press
              setTimeout(() => setIsProfilePressed(false), 200); // Reset color after 200ms
              navigation.navigate('user'); // Navigate to user.jsx
            }}
            className="flex-column justify-between"
          >
            <Image
              source={require('../../assets/images/p.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: isProfilePressed ? '#8B5DFF' : '#666876', // Change color dynamically
              }}
            />
            <Text
              className={`font-outfit-light text-center text-sm ${
                isProfilePressed ? 'text-[#8B5DFF]' : 'text-[#666876]'
              }`}
            >
              Perfil
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDataForm;