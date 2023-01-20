import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import MainNavigationContainer from './App/navigation';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'react-native';
function App() {

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <NavigationContainer>
      <MainNavigationContainer />
    </NavigationContainer>
  );
}

export default App;
