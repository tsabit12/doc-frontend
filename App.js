import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import AppStack from './AppStack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './rootReducers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)

export default function App() {
  const [updateAvailable, setupdateAvailable] = useState(false);

  let [fontsLoaded] = useFonts({
    'Saira-Condensed': require('./assets/fonts/SairaCondensed-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    //'Arial-Regular': require('./assets/fonts/arialn.ttf')
  });

  useEffect(() => {
    if(fontsLoaded){
      (async () => {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setupdateAvailable(true);
          }
        } catch (error) {
          
        }
      })();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
    return <AppLoading />
  }else{
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <AppStack updateAvailable={updateAvailable} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}