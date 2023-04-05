import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import Images from '../../assets/Images';
import CustomImage from '../../compnents/customImage';
import commonStyle from '../../theme/commonStyle';
import {CommonActions} from '@react-navigation/native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';
import {useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
export default function Splash({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  // useEffect(() => {
  //   NetInfo.addEventListener(state => {
  //     console.log('state.isConnected==>', state.isConnected);
  //     if (state.isConnected === false) {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           routes: [{name: screenString.NO_INTERNET}],
  //         }),
  //       );
  //     }
  //   });
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      if (user?.access_token) {
        if (user?.user?.userType === 2) {
          if (user?.coach_address || user?.userEmail)
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: screenString.DRAWER,
                    params: {screen: screenString.BOOKING},
                  },
                ],
              }),
            );
          else navigation.navigate(screenString.COACHPROFILESETUP);
        } else if (user?.user?.userType !== 2) {
          if (user?.user_address || user?.userEmail)
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: screenString.DRAWER}],
              }),
            );
          else navigation.navigate(screenString.USERPROFILESETUP);
        }
      } else
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: screenString.ONBOARDING}],
          }),
        );
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={Images.appBackground}
      style={commonStyle.centeredContent(colors.BLACK)}>
      <CustomImage source={Images.LOGO} />
    </ImageBackground>
  );
}
