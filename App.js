import React from 'react';
import 'react-native-gesture-handler';
import MainNavigationContainer from './App/navigation';
import {NavigationContainer} from '@react-navigation/native';
function App() {
  return (
    <NavigationContainer>
      <MainNavigationContainer />
    </NavigationContainer>
  );
}

export default App;
