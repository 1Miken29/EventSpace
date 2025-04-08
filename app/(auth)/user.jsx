import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [isProfilePressed, setIsProfilePressed] = useState(false); // State to track press

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setProfileImage(selectedImage.uri);
      }
    });
  };

  return (
    <View className="min-h-screen bg-[#8B5DFF1A] flex items-center justify-center">
      <View className="relative w-[200px] h-[200px]">
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: 'https://picsum.photos/200' }
            }
            style={{ width: 180, height: 180, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
            position: 'absolute',
            right: 30,
            bottom: 25,
            width: 40,
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8B5DFF',
          }}
        >
          <Image
            source={require('../../assets/images/edit.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#FFFFFF',
            }}
          />
        </TouchableOpacity>
      </View>

      <View className="w-11/12 mt-2">
        <Text className="text-2xl font-outfit-bold text-[#191D31] text-center">
          Adrian Hajdin
        </Text>
      </View>

      <View className="flex flex-row items-center my-4 w-full">
        <View className="flex-1 h-px bg-[#C4C4C4]"></View>
      </View>

      {/* Mis reservas */}
      <View className="w-11/12 bg-gray flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/calendar.png')}
            style={{ width: 30, height: 30, margin: 10 }}
          />
          <Text className="text-[#191D31] font-outfit-bold">Mis reservas</Text>
        </View>
        <Text className="text-[#191D31] font-outfit-bold"> {">"} </Text>
      </View>

      {/* Pagos */}
      <View className="w-11/12 bg-gray flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/wallet.png')}
            style={{ width: 30, height: 30, margin: 10 }}
          />
          <Text className="text-[#191D31] font-outfit-bold">Pagos</Text>
        </View>
        <Text className="text-[#191D31] font-outfit-bold"> {">"} </Text>
      </View>

      <View className="flex flex-row items-center my-4 w-full">
        <View className="flex-1 h-px bg-[#C4C4C4]"></View>
      </View>

      {/* Perfil */}


      <TouchableOpacity
        onPress={() => navigation.navigate('formUser')}
        className="w-11/12 bg-gray flex flex-row items-center justify-between"
      >
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/profile.png')}
            style={{ width: 25, height: 25, margin: 10 }}
          />
          <Text className="text-[#191D31] font-outfit-bold">Perfil</Text>
        </View>
        <Text className="text-[#191D31] font-outfit-bold"> {">"} </Text>
      </TouchableOpacity>

      <View className="w-11/12 bg-gray flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image source={require('../../assets/images/notification.png')} style={{ width: 25, height: 25, margin: 10 }} />
          <Text className="text-[#191D31] font-outfit-bold">Notificaciones</Text>
        </View>
        <Text className="text-[#191D31] font-outfit-bold"> {">"} </Text>
      </View>

      <View className="w-11/12 bg-gray flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image source={require('../../assets/images/out.png')} style={{ width: 25, height: 25, margin: 10, tintColor: "#F75555" }} />
          <Text className="text-[#F75555] font-outfit-bold">Log Out</Text>
        </View>
      </View>

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
}
