import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {SafeAreaView, View} from 'react-native';
import colors from '../../theme/colors';
export default function Terms_Privacy({route}) {
  const navigation = useNavigation();
  const weblink =
    route?.params === 1
      ? 'https://toptier.beyondroot.com/terms'
      : 'https://toptier.beyondroot.com/privacy';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={route?.params === 1 ? 'Terms of Services' : 'Privacy & Policy'}
      />
      <WebView source={{uri: weblink}} />
    </SafeAreaView>
  );
}
