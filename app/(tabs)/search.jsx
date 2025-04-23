import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import Cards from "../(auth)/Cards";
import Filtros from "../(auth)/filtros"; // Importa el componente Filtros
import Ing from "../(auth)/Ing"; // Importa el componente Ing
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Search() {
  const baseURL = 'https://backend-production-dc84.up.railway.app'
  const navigation = useNavigation();

  // Hooks de estado
  const [likedItems, setLikedItems] = useState(Array(12).fill(false));
  const [sortOption, setSortOption] = useState("Relevancia");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  // Datos de las tarjetas
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const obtenerSalones = async () => {
      const response = await axios.get(`${baseURL}/salones`);
      setCards(response.data);
    };
    obtenerSalones();
  }, []);

  // Filtrar las tarjetas según el texto de búsqueda
  const filteredCards = cards.filter((card) =>
    card.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Funciones
  const toggleLike = (index) => {
    const updatedLikes = [...likedItems];
    updatedLikes[index] = !updatedLikes[index];
    setLikedItems(updatedLikes);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("inicial")}
            style={styles.backButton}
          >
            <Image
              source={require("../../assets/images/back.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Encuentra tu salón ideal</Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/notification.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#C4C4C4"
            value={searchText}
            onChangeText={(text) => setSearchText(text)} // Actualiza el texto de búsqueda
          />
          <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
            <Image
              source={require("../../assets/images/filtro.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Mostrar encabezado dinámico */}
        {searchText.length > 0 ? (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredCards.length}{" "}
              {filteredCards.length === 1
                ? "salón encontrado"
                : "salones encontrados"}
            </Text>
          </View>
        ) : (
          <View style={styles.recommendations}>
            <Text style={styles.recommendationsText}>Recomendados</Text>
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.sortButton}
            >
              <View style={styles.sortButtonContent}>
                <Text style={styles.sortText}>Ordenar por:</Text>
                <Text style={styles.sortOption}>{sortOption}</Text>
                <Image
                  source={require("../../assets/images/abajo.png")}
                  style={styles.sortIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Dropdown Menu */}
        {isDropdownVisible && (
          <View style={[styles.dropdownMenu, { zIndex: 10 }]}>
            {["Relevancia", "Más baratos", "Más caros", "Más recientes"].map(
              (option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSortOption(option)}
                >
                  <View style={styles.dropdownItemContent}>
                    <Text style={styles.dropdownText}>{option}</Text>
                    {sortOption === option && (
                      <Image
                        source={require("../../assets/images/ok.png")}
                        style={styles.okIcon}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )
            )}
          </View>
        )}

        {/* Mostrar tarjetas o mensaje de "No se han encontrado salones" */}
        {searchText.length > 0 ? (
          filteredCards.length > 0 ? (
            <Ing
              cards={filteredCards} // Pasa las tarjetas filtradas
              toggleLike={toggleLike} // Pasa la función para manejar los likes
              likedItems={likedItems} // Pasa los elementos con like
              isSearchMode={true} // Activa el modo búsqueda
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No se han encontrado salones
              </Text>
            </View>
          )
        ) : (
          <View className="flex flex-row flex-wrap justify-around mt-3">
            {cards.map((card, index) => (
              <Cards
                key={index}
                index={index}
                card={card} // Muestra todas las tarjetas si no hay búsqueda
                toggleLike={toggleLike}
                likedItems={likedItems}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal de Filtros */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <Filtros onClose={() => setIsFilterModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8B5DFF1A",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191D31",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 22,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#C4C4C4",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#666876",
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  recommendations: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },
  recommendationsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#191D31",
  },
  sortButton: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderColor: "#C4C4C4",
    borderWidth: 1,
  },
  sortButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 14,
    color: "#666876",
  },
  sortOption: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#191D31",
    marginLeft: 4,
  },
  sortIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  dropdownMenu: {
    position: "absolute",
    top: 200,
    width: 180,
    right: 0,
    backgroundColor: "white",
    border: 1,
    borderColor: "#C4C4C4",
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownText: {
    fontSize: 14,
    color: "#666876",
    flex: 1,
  },
  okIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  resultsHeader: {
    marginTop: 22,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#191D31",
  },
  noResultsContainer: {
    marginTop: 300,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 22,
    color: "black",
  },
});
