import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './src/component/Landing';
import styles from './src/component/Landing/styles';

import { AppLoading } from 'expo';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_700Bold
} from '@expo-google-fonts/archivo';

import { Poppins_400Regular,Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';

export default function App() {

  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <AppStack />
        <StatusBar style="auto" />
      </>

    );
  }
}


