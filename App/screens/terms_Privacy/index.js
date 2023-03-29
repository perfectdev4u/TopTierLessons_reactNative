import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native';
import colors from '../../theme/colors';
import {Loader} from '../../compnents/loader';
export default function Terms_Privacy({route}) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const weblink =
    route?.params?.type === 1
      ? 'https://toptier.beyondroot.com/terms'
      : 'https://toptier.beyondroot.com/privacy';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={route?.params?.type === 1 ? 'Terms of Services' : 'Privacy & Policy'}
      />
      <WebView
        source={{uri: weblink}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
      />
    </SafeAreaView>
  );
}
