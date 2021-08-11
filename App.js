import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './AppStack';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <AppStack />
    </React.Fragment>
  );
}