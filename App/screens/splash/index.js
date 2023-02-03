import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import Images from '../../assets/Images';
import CustomImage from '../../compnents/customImage';
import commonStyle from '../../theme/commonStyle';
import {useNavigation} from '@react-navigation/native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';

export default function Splash() {
  const {navigate} = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigate(screenString.ONBOARDING);
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
