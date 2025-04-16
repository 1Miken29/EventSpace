import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ing({ cards, toggleLike, likedItems, isSearchMode }) {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <View
          key={card.id}
          style={[styles.card, isSearchMode && styles.cardSearchMode]} // Cambia el estilo si está en modo búsqueda
        >
          <Image
            source={card.image}
            style={[styles.cardImage, isSearchMode && styles.cardImageSearchMode]} // Cambia el tamaño de la imagen
          />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, isSearchMode && styles.cardTitleSearchMode]}>
                {card.title}
              </Text>
            </View>
            <Text style={styles.cardLocation}>{card.location}</Text>
          </View>
          {/* Ícono del corazón en la esquina superior derecha */}
          <TouchableOpacity
            onPress={() => toggleLike(index)}
            style={styles.heartContainer}
          >
            <Image
              source={require('../../assets/images/heart.png')}
              style={[
                styles.heartIcon,
                { tintColor: likedItems[index] ? 'rgb(255, 44, 125)' : '#C4C4C4' },
              ]}
            />
          </TouchableOpacity>
          {/* Precio en la esquina inferior derecha */}
          <Text style={styles.cardPrice}>{card.price}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
    position: 'relative', // Habilita posicionamiento absoluto para los elementos internos
  },
  cardSearchMode: {
    padding: 12, // Ajusta el padding para el modo búsqueda
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cardImageSearchMode: {
    width: 100, // Imagen más grande en modo búsqueda
    height: 100,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D31',
  },
  cardTitleSearchMode: {
    fontSize: 18, // Título más grande en modo búsqueda
  },
  cardLocation: {
    fontSize: 14,
    color: '#666876',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5DFF',
    position: 'absolute', // Posiciona el precio
    bottom: 16, // Espaciado desde la parte inferior
    right: 16, // Espaciado desde la parte derecha
  },
  heartContainer: {
    position: 'absolute', // Posiciona el ícono del corazón
    top: 16, // Espaciado desde la parte superior
    right: 16, // Espaciado desde la parte derecha
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});