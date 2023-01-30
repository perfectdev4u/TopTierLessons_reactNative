import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenString from './screenString';
import Splash from '../screens/splash';
import Onboarding from '../screens/onboarding';
import Login from '../screens/login';
import ForgotPassword from '../screens/forgotPassword';
import NewPassword from '../screens/newPassword';
import Register from '../screens/register';

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
      <Stack.Screen
        name={ScreenString.FORGOTPASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen name={ScreenString.NEWPASSWORD} component={NewPassword} />
      <Stack.Screen name={ScreenString.REGISTER} component={Register} />
    </Stack.Navigator>
  );
}
