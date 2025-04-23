import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
export default function CardDetail() {
  const baseURL = "https://backend-production-dc84.up.railway.app";
  const { cardId } = useLocalSearchParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerInfo = async () => {
      const response = await axios.get(`${baseURL}/salonInfo/${cardId}`);
      setInfo(response.data);
      setLoading(false)
    };
    obtenerInfo();
  }, [cardId]);

  if (loading) {
    return (
      <View style={styles.errorContainer}>
        <ActivityIndicator size="large" color="#8B5DFF" />
        <Text style={{ marginTop: 10 }}>Cargando información...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Card Image */}
      <Image
        source={require("../../../assets/images/s1.jpg")}
        style={styles.cardImage}
      />

      {/* Card Details */}
      <View style={styles.content}>
        {/*Puede borrar este Text */}
        <Text style={styles.title}>ID recibido: {cardId}</Text>
        <Text style={styles.title}>Nombre del salon: {info.nombre}</Text>
        <Text style={styles.location}>Ubicacion: {info.ubicacion}</Text>
        <Text style={styles.price}>Precio</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardImage: {
    width: "100%",
    height: 300, // Large image at the top
    resizeMode: "cover",
  },
  content: {
    padding: 20,
    alignItems: "left",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#191D31",
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B5DFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
