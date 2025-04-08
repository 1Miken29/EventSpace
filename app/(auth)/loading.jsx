import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#246BFD" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3B6E3',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#246BFD',
    fontFamily: 'Outfit-Medium',
  },
})