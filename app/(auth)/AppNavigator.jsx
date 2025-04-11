import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './inicio';
import CardDetail from './cardDetail'; // Correct the import path for CardDetail

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="inicio" 
        component={Inicio} 
        options={{ headerShown: false }} // Hide header for Inicio screen
      />
      <Stack.Screen 
        name="cardDetail" 
        component={CardDetail} 
        options={{ title: 'Detalle de la Tarjeta' }} // Ensure the name matches exactly
      />
    </Stack.Navigator>
  );
}
