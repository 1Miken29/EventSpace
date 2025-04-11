import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function CardDetail({ route }) {
  const card = route?.params?.card; // Safely access route.params.card

/*  if (!card) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: No se encontraron datos de la tarjeta</Text>
      </View>
    );
  } */

  return (
    <View style={styles.container}>
      {/* Card Image */}
      <Image source={card.image} style={styles.cardImage} />

      {/* Card Details */}
      <View style={styles.content}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.location}>{card.location}</Text>
        <Text style={styles.price}>{card.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardImage: {
    width: '100%',
    height: 300, // Large image at the top
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D31',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5DFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
