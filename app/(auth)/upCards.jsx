import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function UpCards({ index, card, likedItems, toggleLike }) {
  return (
    <TouchableOpacity key={index} style={styles.card} onPress={() => router.push(`/cardDetail/${card.id}`)}>
      {/* Image */}
      <Image
        source={require("../../assets/images/s1.jpg")}
        style={styles.image}
      />

      {/* Text Overlay */}
      <View style={styles.textOverlay}>
        <Text style={styles.title}>{card.nombre}</Text>
        <Text style={styles.subtitle}>xxxxx</Text>
        <Text style={styles.price}>$precio</Text>
      </View>

      {/* Rating Badge */}
      <View style={styles.ratingBadge}>
        <Image
          source={require("../../assets/images/star.png")}
          style={styles.starIcon}
        />
        <Text style={styles.ratingText}>4.8</Text>
      </View>

      {/* Heart Icon */}
      <TouchableOpacity
        onPress={() => toggleLike(index)}
        style={styles.heartContainer}
      >
        <Image
          source={require("../../assets/images/heart.png")}
          style={[
            styles.heartIcon,
            { tintColor: likedItems[index] ? "rgb(255, 44, 125)" : "white" },
          ]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 20,
  },
  textOverlay: {
    position: "absolute",
    top: 175,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  ratingBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: "#FFD700",
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#8B5DFF",
  },
  heartContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
});
