import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenString from './screenString';
import Splash from '../screens/splash';

const Stack = createStackNavigator();
export default function MainNavigationContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenString.SPLASH} component={Splash} />
    </Stack.Navigator>
  );
}
