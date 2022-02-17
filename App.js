import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import FashionHouse from './src/navigation';
import { useFonts } from 'expo-font';
import { initializeApp } from "firebase/app";
import AppContextProvider from './src/context/AppContext';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  
  const firebaseConfig = {
    apiKey: "AIzaSyCpSKR-6gL8CQ8Cev9QNHhwOEk9cVZ8CVw",
    authDomain: "fashionhouse-89f12.firebaseapp.com",
    projectId: "fashionhouse-89f12",
    storageBucket: "fashionhouse-89f12.appspot.com",
    messagingSenderId: "8948289888",
    appId: "1:8948289888:web:457b3f74cff87e052ece05"
  };

  // if (firebase.apps.length === 0) {
    initializeApp(firebaseConfig);
  // }

  const [loaded] = useFonts({
    ApparelDisplayBold: require('./assets/fonts/Apparel-Display-Bold.ttf'),
  });

  if(!loaded) return <AppLoading />
  
  return (
    <AppContextProvider>
      <FashionHouse />
    </AppContextProvider>
  );
}
