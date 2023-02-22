import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import MainNavigationContainer from './App/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistore} from './App/redux';
import screenString from './App/navigation/screenString';

function App() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const linking = {
    prefixes: ['toptier://'],
    config: {
      screens: {PAYMENTRESULT: screenString.PAYMENTRESULT},
    },
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <NavigationContainer linking={linking}>
          <MainNavigationContainer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
