import React, {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import Images from '../../assets/Images';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';

export default function Splash() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    // return () => StatusBar.setBarStyle('default');
  }, []);

  return (
    <View style={commonStyle.centeredContent(colors.BLACK)}>
      <Image source={Images.LOGO} />
    </View>
  );
}
