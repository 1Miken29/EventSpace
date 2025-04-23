import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Cards({ index, card, toggleLike, likedItems }) {
  return (
    <TouchableOpacity
      key={card.id}
      onPress={() => router.push(`/cardDetail/${card.id}`)}
      style={styles.card}
    >
      {/* Image */}
      <Image source={require("../../assets/images/s1.jpg")} style={styles.cardImage} />

      {/* Star Icon */}
      <View style={styles.starContainer}>
        <Image
          source={require("../../assets/images/star.png")}
          style={styles.starIcon}
        />
        <Text style={styles.starText}>4.8</Text>
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
            { tintColor: likedItems[index] ? "rgb(255, 44, 125)" : "gray" },
          ]}
        />
      </TouchableOpacity>

      {/* Text Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{card.nombre}</Text>
        <Text style={styles.cardLocation}>{card.ubicacion}</Text>
        <Text style={styles.cardPrice}>Precio</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 40,
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 5,
    padding: 10,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  starContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
  starText: {
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
    width: 20,
    height: 20,
  },
  cardContent: {
    marginTop: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#191D31",
  },
  cardLocation: {
    fontSize: 14,
    color: "#666",
  },
  cardPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#8B5DFF",
  },
});
