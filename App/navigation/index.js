import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScreenString from './screenString';
import Splash from '../screens/splash';
import Onboarding from '../screens/onboarding';
import Login from '../screens/login';
import ForgotPassword from '../screens/forgotPassword';
import OtpScreen from '../screens/otpScreen';
import Register from '../screens/register';
import ResetPassword from '../screens/resetPassword';
import NewPassword from '../screens/newPassword';
import UserProfileSetUp from '../screens/userProfileSetUp';
import CoachProfileSetUp from '../screens/coachProfileSetUp';
import EditProfile from '../screens/editProfile';
import UserHome from '../screens/userHome';
import CoachDetails from '../screens/coachDetails';
import Notifications from '../screens/notification';
import Slots from '../screens/slots';
import Documents from '../screens/document';
import Venues from '../screens/venues';
import Booking from '../screens/booking';
import Terms_Privacy from '../screens/terms_Privacy';
import ChatScreen from '../screens/chatScreen';
import UserChatScreen from '../screens/userChatScreen';
import ContactUs from '../screens/contactUs';
import screenString from './screenString';
import DrawerMenu from '../compnents/DrawerMenu';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={screenString.USERHOME}
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '60%',
        },
      }}>
      <Drawer.Screen name={screenString.USERHOME} component={UserHome} />
      <Drawer.Screen name={screenString.EDITPROFILE} component={EditProfile} />
      <Drawer.Screen
        name={screenString.NOTIFICATIONS}
        component={Notifications}
      />
      <Drawer.Screen name={screenString.SLOTS} component={Slots} />
      <Drawer.Screen name={screenString.DOCUMENTS} component={Documents} />
      <Drawer.Screen name={screenString.VENUE} component={Venues} />
      <Drawer.Screen name={screenString.BOOKING} component={Booking} />
      <Drawer.Screen name={screenString.NEWPASSWORD} component={NewPassword} />
      <Drawer.Screen
        name={screenString.TERMS_PRIVACY}
        component={Terms_Privacy}
      />
      <Drawer.Screen name={screenString.CONTACTUS} component={ContactUs} />
    </Drawer.Navigator>
  );
};
export default function MainNavigationContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenString.LOGIN}>
      <Stack.Screen name={ScreenString.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenString.ONBOARDING} component={Onboarding} />
      <Stack.Screen name={ScreenString.LOGIN} component={Login} />
      <Stack.Screen
        name={ScreenString.FORGOTPASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen name={ScreenString.OTPSCREEN} component={OtpScreen} />
      <Stack.Screen
        name={ScreenString.RESETPASSWORD}
        component={ResetPassword}
      />
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
      <Stack.Screen name={ScreenString.CHATSCREEN} component={ChatScreen} />
      <Stack.Screen
        name={ScreenString.USERCHATSCREEN}
        component={UserChatScreen}
      />
    </Stack.Navigator>
  );
}
