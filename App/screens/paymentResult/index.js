import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import Images from '../../assets/Images';
import {CommonActions} from '@react-navigation/native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';
import CustomButton from '../../compnents/customButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useSelector} from 'react-redux';

export default function PaymentResult({route, navigation}) {
  console.log('payment_route==>', route);
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const capturePayLoad = {
    token: '',
    payerId: '',
  };
  const handlePaymentResponse = () => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.capturePayment, capturePayLoad)
      .then(res => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200) {
          console.log('paymentRes==>', res?.data?.data);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('paymentRes_err==>', err);
      });
  };
  const handleGoBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screenString.DRAWER}],
      }),
    );
  };
  return (
    <ImageBackground
      source={Images.appBackground}
      style={{
        flex: 1,
        backgroundColor: colors.BLACK,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 30,
        }}>
        <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
        <View />
        <View
          style={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'checkbox-marked-circle-outline'}
            size={80}
            color={colors.THEME_BTN}
          />
          <CustomText
            color={colors.THEME_BTN}
            marginTop={10}
            fontSize={25}
            textAlign={'center'}
            lineHeight={30}>
            SUCCESS
          </CustomText>
          <CustomText textAlign={'center'} fontSize={13} marginTop={10}>
            Thank you for your booking request.
          </CustomText>
          <CustomText textAlign={'center'} fontSize={13}>
            We are working hard to find the best service and deals for you.
          </CustomText>
          <CustomText
            textAlign={'center'}
            fontSize={13}
            color={'#AEAEAE'}
            marginTop={30}>
            Shortly you will find a confirmation in your email.
          </CustomText>
        </View>
        <CustomButton
          alignSelf={'center'}
          width={'80%'}
          lable={'Go Back Home'}
          onPress={() => handleGoBack()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
