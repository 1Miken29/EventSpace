import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';

export default function Filtros({ onClose }) {
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedSalon, setSelectedSalon] = useState(null);

  // Función para restablecer todos los filtros
  const handleResetFilters = () => {
    setSelectedRating(null);
    setSelectedZone(null);
    setSelectedOption(null);
    setSelectedAmenity(null);
    setSelectedService(null);
    setSelectedSpace(null);
    setSelectedSalon(null);
  };

  // Función para aplicar los filtros y cerrar el modal
  const handleApplyFilters = () => {
    console.log('Filtros aplicados:', {
      selectedRating,
      selectedZone,
      selectedOption,
      selectedAmenity,
      selectedService,
      selectedSpace,
      selectedSalon,
    });
    onClose(); // Cierra el modal
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.modalBackIcon}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filtros</Text>
          <TouchableOpacity onPress={handleResetFilters}>
            <Text style={styles.resetText}>Restablecer</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido desplazable */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.filterSection}>
            {/* Tipo de salón */}
            <Text style={styles.filterTitle}>Tipo de salón</Text>
            <View style={styles.filterOptions}>
              {['BODAS', 'XV AÑOS', 'BAUTIZOS', 'CONCIERTOS', 'CONFERENCIAS', 'INFANTILES', 'FIN DE AÑO', 'CAPACITACIONES'].map(
                (filter, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterButton,
                      selectedSalon === filter && styles.filterButtonSelected, // Estilo al seleccionar
                    ]}
                    onPress={() => setSelectedSalon(selectedSalon === filter ? null : filter)} // Toggle selección
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedSalon === filter && styles.filterButtonTextSelected, // Texto al seleccionar
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            <Text style={styles.filterTitle}>Calificación</Text>
            <View style={styles.ratingButtons}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  style={[
                    styles.ratingButton,
                    selectedRating === star && styles.ratingButtonSelected,
                  ]}
                  onPress={() => setSelectedRating(star)} // Cambia la calificación seleccionada
                >
                  <View style={styles.ratingContent}>
                    {Array.from({ length: star }).map((_, i) => (
                      <Image
                        key={i}
                        source={require('../../assets/images/star.png')}
                        style={styles.starIcon}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            <Text style={styles.filterTitle}>Precio</Text>
            
            <View style={styles.DesdeHasta}>
              <Text style={styles.priceLabel}>Desde</Text>
              <Text style={styles.priceLabel}>Hasta</Text>
            </View>

            <View style={styles.priceSection}>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="$000,000,000"
                  placeholderTextColor="#000"
                />
              </View>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="$000,000,000"
                  placeholderTextColor="#000"
                />
              </View>
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            <Text style={styles.filterTitle}>Capacidad</Text>

            <View style={styles.DesdeHasta}>
              <Text style={styles.priceLabel}>Desde</Text>
              <Text style={styles.priceLabel}>Hasta</Text>
            </View>

            <View style={styles.priceSection}>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="$000,000,000"
                  placeholderTextColor="#000"
                />
              </View>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="$000,000,000"
                  placeholderTextColor="#000"
                />
              </View>
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            <Text style={styles.filterTitle}>Ubicación</Text>
            <View style={styles.locationSection}>
              {[
                { title: 'ZONA NORTE', options: ['Azcapotzalco', 'Gustavo A. Madero', 'Lindavista', 'Vallejo', 'Cuautepec'] },
                { title: 'ZONA CENTRO', options: ['Cuauhtémoc', 'Centro Histórico', 'Roma Norte / Roma Sur', 'Juárez', 'Doctores', 'San Rafael'] },
                { title: 'ZONA PONIENTE', options: ['Miguel Hidalgo', 'Polanco', 'Lomas de Chapultepec', 'Santa Fe', 'Tacuba', 'Tacubaya'] },
                { title: 'ZONA ORIENTE', options: ['Iztacalco', 'Iztapalapa', 'Agrícola Oriental', 'Pantitlán', 'Santa Martha Acatitla'] },
                { title: 'ZONA SUR', options: ['Benito Juárez', 'Coyoacán', 'Tlalpan', 'Xochimilco', 'San Ángel'] },
              ].map((zone, index) => (
                <View
                  key={index}
                  style={[
                    styles.zoneContainer,
                    selectedZone === index && { backgroundColor: '#FAF9FF', borderColor: '#000', borderWidth: 1 }, // Borde negro al desplegar
                  ]}
                >
                  <TouchableOpacity
                    style={styles.zoneButton}
                    onPress={() => setSelectedZone(selectedZone === index ? null : index)} // Toggle desplegable
                  >
                    <Text style={styles.zoneTitle}>{zone.title}</Text>
                    <Image
                      source={require('../../assets/images/abajo.png')} // Imagen de flecha
                      style={[
                        styles.zoneArrowIcon,
                        { transform: [{ rotate: selectedZone === index ? '180deg' : '0deg' }] }, // Rotación para desplegado
                      ]}
                    />
                  </TouchableOpacity>
                  {selectedZone === index && (
                    <View style={styles.zoneOptions}>
                      {zone.options.map((option, i) => (
                        <TouchableOpacity
                          key={i}
                          style={styles.optionButton}
                          onPress={() => setSelectedOption(option)} 
                        >
                          <Image
                            source={
                              selectedOption === option
                                ? require('../../assets/images/Flocation.png') 
                                : require('../../assets/images/location.png') 
                            }
                            style={[
                              styles.optionIcon,
                              selectedOption === option && { tintColor: '#8B5DFF', width: 16, height: 20 },
                            ]}
                          />
                          <Text
                            style={[
                              styles.optionText,
                              selectedOption === option && { color: '#8B5DFF' }, 
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Amenidades */}
            <Text style={styles.filterTitle}>Amenidades</Text>
            <View style={styles.filterOptions}>
              {['COMODIDADES', 'TECNOLOGIA', 'ACCESIBILIDAD', 'SEGURIDAD'].map((amenity, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterButton,
                    selectedAmenity === amenity && styles.filterButtonSelected, // Estilo al seleccionar
                  ]}
                  onPress={() => setSelectedAmenity(selectedAmenity === amenity ? null : amenity)} // Toggle selección
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedAmenity === amenity && styles.filterButtonTextSelected, // Texto al seleccionar
                    ]}
                  >
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Servicios */}
            <Text style={styles.filterTitle}>Servicios</Text>
            <View style={styles.filterOptions}>
              {['CATERING', 'DECORACION', 'AUDIO', 'ILUMINACION', 'ENTRETENIMIENTO', 'INFANTILES', 'FOTOGRAFIA Y VIDEO'].map(
                (service, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterButton,
                      selectedService === service && styles.filterButtonSelected, // Estilo al seleccionar
                    ]}
                    onPress={() => setSelectedService(selectedService === service ? null : service)} // Toggle selección
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedService === service && styles.filterButtonTextSelected, // Texto al seleccionar
                      ]}
                    >
                      {service}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Espacios al Aire Libre */}
            <Text style={styles.filterTitle}>Espacios al Aire Libre</Text>
            <View style={styles.filterOptions}>
              {['TERRAZA', 'BALCONES', 'PISCINA', 'JARDIN'].map((space, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterButton,
                    selectedSpace === space && styles.filterButtonSelected, // Estilo al seleccionar
                  ]}
                  onPress={() => setSelectedSpace(selectedSpace === space ? null : space)} // Toggle selección
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedSpace === space && styles.filterButtonTextSelected, // Texto al seleccionar
                    ]}
                  >
                    {space}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botón Aplicar Filtros */}
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
          <Text style={styles.applyButtonText}>Aplicar filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '70%',
  },
  scrollContent: {
    paddingBottom: 25, 
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalBackIcon: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D31',
  },
  resetText: {
    fontSize: 14,
    color: '#8B5DFF',
  },
  filterSection: {
    marginTop: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D31',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#8B5DFF0A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#8B5DFF1A',
  },
  filterButtonSelected: {
    backgroundColor: '#8B5DFF4D',
    borderColor: '#8B5DFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: 'black', // Texto por defecto en negro
  },
  filterButtonTextSelected: {
    color: '#8B5DFF', // Texto al seleccionar
    fontWeight: 'bold',
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ratingButton: {
    backgroundColor: '#8B5DFF0A',
    borderWidth: 1,
    borderColor: '#8B5DFF1A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  ratingButtonSelected: {
    backgroundColor: '#8B5DFF4D',
    borderColor: '#8B5DFF',
  },
  ratingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16, // Aumenta el ancho
    height: 16, // Aumenta la altura
    marginRight: 2,
    tintColor: '#FFAB38',
  },
  DesdeHasta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 150,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceInputContainer: {
    flex: 1,
  marginRight: 16, // Incrementa el espacio entre los contenedores
  borderWidth: 1,
  borderColor: '#fffff',
  borderRadius: 13,
  backgroundColor: 'white',
  paddingVertical: 6,
  alignItems: 'center', // Centra el contenido horizontalmente
  justifyContent: 'center', // Centra el contenido verticalmente
  height: 40,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Outfit',
    color: '#000',
    marginBottom: 4,
  },
  priceInput: {
    fontSize: 14,
    color: '#191D31',
    textAlign: 'center',
  },
  divider: {
    width: '90%',
    height: 3,
    backgroundColor: '#8B5DFF4D',
    alignSelf: 'center',
    marginVertical: 16,
  },
  locationSection: {
    marginTop: 8,
  },
  zoneContainer: {
    borderWidth: 1,
  },
  zoneButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF9FF',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  zoneTitle: {
    fontSize: 17,
    fontWeight: 'medium',
    color: '#191D31',
  },
  zoneArrowIcon: {
    width: 16,
    height: 16,
  },
  zoneOptions: {
    marginTop: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 16,
  },
  optionIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  optionText: {
    fontSize: 17,
    color: '#191D31',
  },
  applyButton: {
    width: '95%',
    backgroundColor: '#8B5DFF',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 100,

  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
    textAlign: 'center',
  },
});