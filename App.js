import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './AppStack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './rootReducers';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)

export default function App() {
  let [fontsLoaded] = useFonts({
    'Saira-Condensed': require('./assets/fonts/SairaCondensed-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
  });

  if(!fontsLoaded){
    return <AppLoading />
  }else{
    return (
      <Provider store={store}>
        <StatusBar style="light" />
        <AppStack />
      </Provider>
    );
  }
}