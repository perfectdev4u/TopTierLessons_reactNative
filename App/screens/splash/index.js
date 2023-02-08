import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import Images from '../../assets/Images';
import CustomImage from '../../compnents/customImage';
import commonStyle from '../../theme/commonStyle';
import {CommonActions} from '@react-navigation/native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
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
