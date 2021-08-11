import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './AppStack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Saira-Condensed': require('./assets/fonts/SairaCondensed-Regular.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading />
  }else{
    return (
      <React.Fragment>
        <StatusBar style="auto" />
        <AppStack />
      </React.Fragment>
    );
  }
}