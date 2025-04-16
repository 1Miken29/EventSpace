import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './inicio';
import CardDetail from './cardDetail';
import formUser from './formUser';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="inicio" 
        component={Inicio} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="cardDetail" 
        component={CardDetail} 
        options={{ title: 'Detalle de la Tarjeta' }}
      />
      <Stack.Screen 
        name="formUser" 
        component={formUser} 
        options={{ title: 'User Profile' }}
      />
    </Stack.Navigator>
  );
}
