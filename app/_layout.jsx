import { SplashScreen, Stack } from "expo-router";

import "../global.css"
import { useFonts } from "expo-font"
import { useEffect } from "react";
import { UserProvider } from "../hooks/UserContext"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Outfit-Black": require('../assets/fonts/Outfit/Outfit-Black.ttf'),
    "Outfit-Bold": require('../assets/fonts/Outfit/Outfit-Bold.ttf'),
    "Outfit-ExtraBold": require('../assets/fonts/Outfit/Outfit-ExtraBold.ttf'),
    "Outfit-ExtraLight": require('../assets/fonts/Outfit/Outfit-ExtraLight.ttf'),
    "Outfit-Light": require('../assets/fonts/Outfit/Outfit-Light.ttf'),
    "Outfit-Medium": require('../assets/fonts/Outfit/Outfit-Medium.ttf'),
    "Outfit-Regular": require('../assets/fonts/Outfit/Outfit-Regular.ttf'),
    "Outfit-SemiBold": require('../assets/fonts/Outfit/Outfit-SemiBold.ttf'),
    "Outfit-Thin": require('../assets/fonts/Outfit/Outfit-Thin.ttf'),
  })

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if(!fontsLoaded) return null

  return(
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  )
}
