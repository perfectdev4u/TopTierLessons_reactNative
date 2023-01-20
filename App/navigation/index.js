import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenString from './screenString';
import Splash from '../screens/splash';
import Onboarding from '../screens/onboarding';
import Login from '../screens/login';

const Stack = createStackNavigator();
export default function MainNavigationContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenString.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenString.ONBOARDING} component={Onboarding} />
      <Stack.Screen name={ScreenString.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}
