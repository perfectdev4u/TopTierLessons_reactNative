import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScreenString from './screenString';
import Splash from '../screens/splash';
import Onboarding from '../screens/onboarding';
import Login from '../screens/login';
import ForgotPassword from '../screens/forgotPassword';
import Register from '../screens/register';
import ResetPassword from '../screens/resetPassword';
import NewPassword from '../screens/newPassword';
import UserProfileSetUp from '../screens/userProfileSetUp';
import CoachProfileSetUp from '../screens/coachProfileSetUp';
import UserHome from '../screens/userHome';
import CoachDetails from '../screens/coachDetails';
import DrawerMenu from '../compnents/DrawerMenu';
import screenString from './screenString';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '60%',
        },
      }}
      initialRouteName={screenString.USERHOME}>
      <Drawer.Screen name={screenString.USERHOME} component={UserHome} />
      <Drawer.Screen
        name={screenString.RESETPASSWORD}
        component={ResetPassword}
      />
    </Drawer.Navigator>
  );
};
export default function MainNavigationContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenString.COACHDETAILS}>
      <Stack.Screen name={ScreenString.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenString.ONBOARDING} component={Onboarding} />
      <Stack.Screen name={ScreenString.LOGIN} component={Login} />
      <Stack.Screen
        name={ScreenString.FORGOTPASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen name={ScreenString.NEWPASSWORD} component={NewPassword} />
      <Stack.Screen name={ScreenString.REGISTER} component={Register} />
      <Stack.Screen
        name={ScreenString.USERPROFILESETUP}
        component={UserProfileSetUp}
      />
      <Stack.Screen
        name={ScreenString.COACHPROFILESETUP}
        component={CoachProfileSetUp}
      />
      <Stack.Screen name={ScreenString.DRAWER} component={DrawerContainer} />
      <Stack.Screen name={ScreenString.COACHDETAILS} component={CoachDetails} />
    </Stack.Navigator>
  );
}
