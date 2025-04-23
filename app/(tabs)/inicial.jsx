import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Cards from "../(auth)/Cards"; // Import the Cards component
import UpCards from "../(auth)/upCards"; // Import the UpCards component
import axios from "axios";

export default function Inicial() {
  const baseURL = "https://backend-production-dc84.up.railway.app";
  // const navigation = useNavigation();
  // const user = {
  //   name: "Adrian Hajdin",
  //   profileImage: "https://picsum.photos/50",
  // };
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const obtenerSalones = async () => {
      const response = await axios.get(`${baseURL}/salones`);
      setCards(response.data);
    };
    obtenerSalones();
  }, []);

  const cardPrueba = {
    id: 1,
    nombre: "Salon",
    ubicacion: "Algun lugar"
  };

  const [buttonTexts, setButtonTexts] = useState([
    "Todo",
    "Bodas",
    "XV años",
    "Infantiles",
    "Otros",
  ]);
  const [selectedButton, setSelectedButton] = useState("Todo");
  const [likedItems, setLikedItems] = useState(Array(12).fill(false));

  const toggleLike = (index) => {
    const updatedLikes = [...likedItems];
    updatedLikes[index] = !updatedLikes[index];
    setLikedItems(updatedLikes);
  };

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);

    // if (buttonTexts[buttonIndex] === "Bodas") {
    //   setCards(
    //     Array.from({ length: 12 }, (_, i) => ({
    //       id: i + 1,
    //       image: require("../../assets/images/boda.jpg"),
    //       title: "Nombre salón",
    //       location: "ubicación",
    //       price: "$precio",
    //     }))
    //   );
    // } else if (buttonTexts[buttonIndex] === "XV años") {
    //   setCards(
    //     Array.from({ length: 12 }, (_, i) => ({
    //       id: i + 1,
    //       image: require("../../assets/images/q.jpg"),
    //       title: "Nombre salón",
    //       location: "ubicación",
    //       price: "$precio",
    //     }))
    //   );
    // } else if (buttonTexts[buttonIndex] === "Infantiles") {
    //   setCards(
    //     Array.from({ length: 12 }, (_, i) => ({
    //       id: i + 1,
    //       image: require("../../assets/images/in.jpg"),
    //       title: "Nombre salón",
    //       location: "ubicación",
    //       price: "$precio",
    //     }))
    //   );
    // } else if (buttonTexts[buttonIndex] === "Todo") {
    //   setCards(
    //     Array.from({ length: 12 }, (_, i) => ({
    //       id: i + 1,
    //       image:
    //         i % 4 === 0
    //           ? require("../../assets/images/boda.jpg")
    //           : i % 4 === 1
    //           ? require("../../assets/images/q.jpg")
    //           : i % 4 === 2
    //           ? require("../../assets/images/in.jpg")
    //           : require("../../assets/images/s1.jpg"),
    //       title: "Nombre salón",
    //       location: "ubicación",
    //       price: "$precio",
    //     }))
    //   );
    // } else if (buttonTexts[buttonIndex] === "Otros") {
    //   setCards(
    //     Array.from({ length: 12 }, (_, i) => ({
    //       id: i + 1,
    //       image: require("../../assets/images/s1.jpg"),
    //       title: "Nombre salón",
    //       location: "ubicación",
    //       price: "$precio",
    //     }))
    //   );
    // } else {
    //   setCards(
    //     Array.from({ length: 12 }, (_, i) => ({
    //       id: i + 1,
    //       image: require("../../assets/images/s2.jpg"),
    //       title: "Nombre salón",
    //       location: "ubicación",
    //       price: "$precio",
    //     }))
    //   );
    // }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        className="flex-1 bg-white p-5"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-outfit-bold text-xl">Más buscados</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
          style={{ height: 260 }}
        >
          {cards.map((card, index) => (
            <UpCards
              key={index}
              card={card}
              index={index}
              likedItems={likedItems}
              toggleLike={toggleLike}
            />
          ))}
        </ScrollView>
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="font-outfit-bold text-xl">Recomendaciones</Text>
          <Text className="font-outfit-bold text-lg text-[#8B5DFF]">
            Ver más
          </Text>
        </View>
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
                backgroundColor:
                  selectedButton === index ? "#8B5DFF" : "#8B5DFF0A",
                height: 40,
                justifyContent: "center",
                paddingHorizontal: 20,
                borderRadius: 20,
                marginRight: 10,
                borderWidth: 1,
                borderColor: "#8B5DFF1A",
              }}
            >
              <Text
                style={{
                  color: selectedButton === index ? "white" : "#191D31",
                  fontWeight: selectedButton === index ? "600" : "400",
                }}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="flex flex-row flex-wrap justify-around mt-3">
          {cards.map((card, index) => (
            <Cards
              key={index}
              index={index}
              card={card}
              toggleLike={toggleLike}
              likedItems={likedItems}
            />
          ))}
          <Cards
            index={1}
            card={cardPrueba}
            toggleLike={toggleLike}
            likedItems={likedItems}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#666876",
  },
  iconText: {
    fontSize: 12,
    color: "#666876",
    marginTop: 4,
  },
});
