import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation();
  const user = {
    name: "Adrian Hajdin",
    profileImage: "https://picsum.photos/50",
  };

  const [buttonTexts, setButtonTexts] = useState(["Todo", "Bodas", "XV años", "Infantiles", "Otros"]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [likedItems, setLikedItems] = useState(Array(12).fill(false));
  const [selectedTab, setSelectedTab] = useState("home");
  const [cards, setCards] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      image: require('../../assets/images/s2.jpg'),
      title: 'Nombre salón',
      location: 'ubicación',
      price: '$precio',
    }))
  );

  const toggleLike = (index) => {
    const updatedLikes = [...likedItems];
    updatedLikes[index] = !updatedLikes[index];
    setLikedItems(updatedLikes);
  };

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);

    if (buttonTexts[buttonIndex] === "Bodas") {
      setCards(
        Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          image: require('../../assets/images/boda.jpg'),
          title: 'Nombre salón',
          location: 'ubicación',
          price: '$precio',
        }))
      );
    } else if (buttonTexts[buttonIndex] === "XV años") {
      setCards(
        Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          image: require('../../assets/images/q.jpg'),
          title: 'Nombre salón',
          location: 'ubicación',
          price: '$precio',
        }))
      );
    } else if (buttonTexts[buttonIndex] === "Infantiles") {
      setCards(
        Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          image: require('../../assets/images/in.jpg'),
          title: 'Nombre salón',
          location: 'ubicación',
          price: '$precio',
        }))
      );
    } else if (buttonTexts[buttonIndex] === "Todo") {
      setCards(
        Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          image:
            i % 4 === 0
              ? require('../../assets/images/boda.jpg')
              : i % 4 === 1
              ? require('../../assets/images/q.jpg')
              : i % 4 === 2
              ? require('../../assets/images/in.jpg')
              : require('../../assets/images/s1.jpg'),
          title: 'Nombre salón',
          location: 'ubicación',
          price: '$precio',
        }))
      );
    } else if (buttonTexts[buttonIndex] === "Otros") {
      setCards(
        Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          image: require('../../assets/images/s1.jpg'),
          title: 'Nombre salón',
          location: 'ubicación',
          price: '$precio',
        }))
      );
    } else {
      setCards(
        Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          image: require('../../assets/images/s2.jpg'),
          title: 'Nombre salón',
          location: 'ubicación',
          price: '$precio',
        }))
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        className="flex-1 bg-white p-5"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Heading */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: user.profileImage }}
              style={{ width: 45, height: 45, borderRadius: 25, marginRight: 10 }}
            />
            <Text className="text-lg font-outfit-bold text-[#191D31]">{user.name}</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/notification.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-[#FBFBFD] rounded-[6px] px-4 py-2">
          <Image
            source={require('../../assets/images/search.png')}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <TextInput
            className="flex-1 font-outfit text-[#666876]"
            placeholder="Buscar"
            placeholderTextColor="#C4C4C4"
          />
        </View>

        {/* Texts aligned */}
        <View className="flex-row justify-between items-center mt-8">
          <Text className="text-lg font-outfit-bold">Más Buscados</Text>
          <Text className="text-lg font-outfit-bold text-[#8B5DFF]">Ver más</Text>
        </View>

        {/* Scrollable Images */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }} 
          style={{ height: 260 }}
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <View key={index} style={{ marginRight: 10, position: 'relative' }}>
              {/* Image */}
              <Image
                source={require(`../../assets/images/s1.jpg`)}
                style={{
                  width: 200,
                  height: 250,
                  borderRadius: 20,
                }}
              />

              {/* Text Overlay */}
              <View
                style={{
                  position: 'absolute',
                  top: 175,
                  left: 10,
                  zIndex: 1,
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Nombre salón</Text>
                <Text style={{ fontSize: 14, color: 'white' }}>xxxxx</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>$precio</Text>
              </View>

              {/* Rating Badge */}
              <View
                style={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                }}
              >
                <Image
                  source={require('../../assets/images/star.png')}
                  style={{ 
                    width: 16, 
                    marginTop: 3,
                    height: 16, 
                    marginRight: 4,
                    tintColor: '#FFD700'
                  }}
                />
                <Text style={{ 
                  fontWeight: 'bold', 
                  fontSize: 14, 
                  color: '#8B5DFF' 
                }}>4.8</Text>
              </View>

              {/* Heart Icon */}
              <TouchableOpacity
                onPress={() => toggleLike(index)}
                style={{
                  position: 'absolute',
                  top: 210,
                  right: 10,
                  padding: 8,
                  //backgroundColor: 'rgba(255,255,255,0.7)',
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require('../../assets/images/heart.png')}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: likedItems[index] ? 'rgb(255, 44, 125)' : 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Recomendaciones Section */}
        <View className="flex-row justify-between items-center mt-5">
          <Text className="text-lg font-outfit-bold">Recomendaciones</Text>
          <Text className="text-lg font-outfit-bold text-[#8B5DFF]">Ver más</Text>
        </View>

        {/* Scrollable Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10 }}
        >
          {buttonTexts.map((text, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleButtonPress(index)} 
              style={{
                backgroundColor: selectedButton === index ? '#8B5DFF' : '#8B5DFF0A',
                height: 40, 
                justifyContent: 'center',
                paddingHorizontal: 20,
                borderRadius: 20,
                marginRight: 10,
                borderWidth: 1, 
                borderColor: '#8B5DFF1A', 
              }}
            >
              <Text
                style={{
                  color: selectedButton === index ? 'white' : '#191D31',
                  fontWeight: selectedButton === index ? '600' : '400', 
                }}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cards Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 40 }}>
          {cards.map((card, index) => (
            <View
              key={card.id}
              style={{
                width: '48%',
                backgroundColor: 'white',
                borderRadius: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 30,
                elevation: 5,
                padding: 10,
                position: 'relative', // Ensure icons are positioned correctly
              }}
            >
              {/* Image */}
              <Image
                source={card.image}
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 15,
                }}
              />

              {/* Star Icon */}
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: 15,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                }}
              >
                <Image
                  source={require('../../assets/images/star.png')}
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 4,
                    tintColor: '#FFD700',
                  }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#8B5DFF' }}>4.8</Text>
              </View>

              {/* Heart Icon */}
              <TouchableOpacity
                onPress={() => toggleLike(index)}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  padding: 5,
                }}
              >
                <Image
                  source={require('../../assets/images/heart.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: likedItems[index] ? 'rgb(255, 44, 125)' : 'gray',
                  }}
                />
              </TouchableOpacity>

              {/* Text Content */}
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#191D31' }}>{card.title}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>{card.location}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#8B5DFF' }}>{card.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Banner */}
      <View style={styles.banner}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setSelectedTab("home");
            navigation.navigate("Inicio");
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
          onPress={() => setSelectedTab("search")}
        >
          <Image
            source={require('../../assets/images/search.png')} 
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
