import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'; // Ensure navigation is imported

export default function UserProfile() {
  const navigation = useNavigation(); // Initialize navigation
  const [selectedTab, setSelectedTab] = useState("profile"); // Track the selected tab
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

      {/* Bottom Banner */}
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
        {/* Home Button */}
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("home"); // Set selected tab to "home"
            navigation.navigate("inicio"); // Navigate to inicio.jsx
          }}
          style={{
            alignItems: 'center', // Center the icon and text
            justifyContent: 'center',
          }}
        >
          <Image
            source={
              selectedTab === "home"
                ? require('../../assets/images/Fhome.png') // Replace with Fhome.png when selected
                : require('../../assets/images/home.png') // Default home icon
            }
            style={{
              width: 24, // Match size from inicio.jsx
              height: 24, // Match size from inicio.jsx
              tintColor: selectedTab === "home" ? "#8B5DFF" : "#666876", // Change color dynamically
            }}
          />
          <Text
            style={{
              color: selectedTab === "home" ? "#8B5DFF" : "#666876", // Change text color dynamically
              fontSize: 12,
              textAlign: "center",
              marginTop: 4, // Add spacing between icon and text
            }}
          >
            Inicio
          </Text>
        </TouchableOpacity>

        {/* Search Button */}
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("search"); // Set selected tab to "search"
            navigation.navigate("search"); // Navigate to the search screen
          }}
          style={{
            alignItems: 'center', // Center the icon and text
            justifyContent: 'center',
          }}
        >
          <Image
            source={
              selectedTab === "search"
                ? require('../../assets/images/Fsearch.png') // Replace with Fsearch.png when selected
                : require('../../assets/images/search.png') // Default search icon
            }
            style={{
              width: 24, // Match size from inicio.jsx
              height: 24, // Match size from inicio.jsx
              tintColor: selectedTab === "search" ? "#8B5DFF" : "#666876", // Change color dynamically
            }}
          />
          <Text
            style={{
              color: selectedTab === "search" ? "#8B5DFF" : "#666876", // Change text color dynamically
              fontSize: 12,
              textAlign: "center",
              marginTop: 4, // Add spacing between icon and text
            }}
          >
            Buscar
          </Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("profile"); // Set selected tab to "profile"
          }}
          style={{
            alignItems: 'center', // Center the icon and text
            justifyContent: 'center',
          }}
        >
          <Image
            source={
              selectedTab === "profile"
                ? require('../../assets/images/p.png') // Replace with p.png when selected
                : require('../../assets/images/profile.png') // Default profile icon
            }
            style={{
              width: 24, // Match size from inicio.jsx
              height: 24, // Match size from inicio.jsx
              tintColor: selectedTab === "profile" ? "#8B5DFF" : "#666876", // Change color dynamically
            }}
          />
          <Text
            style={{
              color: selectedTab === "profile" ? "#8B5DFF" : "#666876", // Change text color dynamically
              fontSize: 12,
              textAlign: "center",
              marginTop: 4, // Add spacing between icon and text
            }}
          >
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
