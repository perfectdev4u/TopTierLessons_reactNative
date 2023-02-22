import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native';
import colors from '../../theme/colors';
import {goBackHandle} from '../../utils/constants';
import {Loader} from '../../compnents/loader';
export default function Payment({route}) {
  const navigation = useNavigation();
  const weblink = route?.params?.paymentLink;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => goBackHandle(navigation)}
        title={true}
        lable={'Payment'}
      />
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
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
