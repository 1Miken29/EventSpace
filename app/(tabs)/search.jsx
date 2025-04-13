import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'; // Import ScrollView
import Cards from '../(auth)/Cards';
import { useNavigation } from 'expo-router';

export default function Search() {
  const navigation = useNavigation()
  const [likedItems, setLikedItems] = useState(Array(12).fill(false));
  const [sortOption, setSortOption] = useState('Relevancia');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const cards = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: require('../../assets/images/s1.jpg'),
    title: 'Nombre salón',
    location: 'ubicación',
    price: '$precio',
    rating: 4.8,
  }));

  const toggleLike = (index) => {
    const updatedLikes = [...likedItems];
    updatedLikes[index] = !updatedLikes[index];
    setLikedItems(updatedLikes);
  };

  const sortOptions = ['Relevancia', 'Más Baratos', 'Más Caros', 'Más recientes'];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setIsDropdownVisible(false);
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.ratingBadge}>
        <Image
          source={require('../../assets/images/star.png')}
          style={styles.starIcon}
        />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.heartContainer}>
        <Image
          source={require('../../assets/images/heart.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('inicial')} style={styles.backButton}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Encuentra tu salón ideal</Text>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/notification.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#C4C4C4"
          />
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/filtro.png')}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Recomendados and Sort */}
        <View style={styles.recommendations}>
          <Text style={styles.recommendationsText}>Recomendados</Text>
          <TouchableOpacity onPress={toggleDropdown} style={styles.sortButton}>
            <View style={styles.sortButtonContent}>
              <Text style={styles.sortText}>Ordenar por:</Text>
              <Text style={styles.sortOption}>{sortOption}</Text>
              <Image
                source={require('../../assets/images/abajo.png')}
                style={styles.sortIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        {isDropdownVisible && (
          <View style={[styles.dropdown, { position: 'absolute' }]}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleSortOption(option)}
                style={styles.dropdownOption}
              >
                <Text style={styles.dropdownText}>{option}</Text>
                {option === sortOption && (
                  <Image
                    source={require('../../assets/images/ok.png')}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Cards
          cards={cards}
          navigation={navigation}
          toggleLike={toggleLike}
          likedItems={likedItems}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35, 
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5DFF1A', // Circle background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D31',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFD',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 22,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#C4C4C4',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#666876',
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  recommendations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
  },
  recommendationsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D31',
    
  },
  sortButton: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: 'center', // Center content vertically
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  sortButtonContent: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
  },
  sortText: {
    fontSize: 14,
    fontFamily: 'Outfit',
    color: '#666876',
  },
  sortOption: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Outfit',
    color: '#191D31',
    marginLeft: 4,
  },
  sortIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  dropdown: {
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 8,
    padding: 8,
    width: '40%',
    height: 'auto',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    top: 180,
    right: 16,
    zIndex: 3,
  },
  dropdownOption: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Outfit',
    color: '#191D31',
    flex: 1,
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  cardsContainer: {
    marginTop: 16,
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
    tintColor: '#FFD700',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B5DFF',
  },
  cardContent: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D31',
  },
  cardLocation: {
    fontSize: 12,
    color: '#666',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5DFF',
  },
  heartContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: 'gray',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute items evenly
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60, // Fixed height for consistency
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    position: 'absolute', // Fix the banner at the bottom
    bottom: 0,
    width: '100%',
    zIndex: 1000, // Ensure it stays above other content
  },
  iconContainer: {
    alignItems: 'center', // Center icons and text vertically
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center', // Center text horizontally
  },
});
