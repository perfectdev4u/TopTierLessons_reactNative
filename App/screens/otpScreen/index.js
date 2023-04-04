import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import colors from '../../theme/colors';
import ContainerBgImage from '../../compnents/containerBackground';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import OtpInputs from 'react-native-otp-inputs';
import {Loader} from '../../compnents/loader';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';

export default function OtpScreen({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const resendpayload = {
    email: route?.params?.email,
    otp: '',
  };
  const otppayload = {
    email: route?.params?.email,
    otp: otp.trim(),
  };
  const resendHandle = () => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.forgotPassword, resendpayload)
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200) console.log('res?.data?.data=>', res?.data);
        Alert.alert(res?.data?.returnMessage[0]);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err==>', err);
        Alert.alert(err?.returnMessage[0]);
      });
  };

  const isValidConfirm = () => {
    if (otp.length < 1) {
      alert('Please enter your OTP.');
      return false;
    } else if (otp.length != 4) {
      alert('Please enter four digits valid OTP.');
      return false;
    }
    return true;
  };
  const handleConfirm = () => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.forgotPassword, otppayload)
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200)
          navigation.navigate(screenString.RESETPASSWORD, {
            email: route?.params?.email,
            _token: res?.data?.data?.token,
          });
      })
      .catch(err => {
        setIsLoading(false);
        console.log('error==>', err);
        Alert.alert(err?.returnMessage[0]);
      });
  };
  const isConfirm = () => {
    if (isValidConfirm()) {
      handleConfirm();
    }
  };

  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
      />
      <CustomText
        marginTop={60}
        fontSize={32}
        lineHeight={38}
        color={colors.WHITE}
        textAlign={'center'}>
        Enter OTP
      </CustomText>
      <View>
        <OtpInputs
          handleChange={setOtp}
          numberOfInputs={4}
          // autofillFromClipboard={true}
          autoFocus={true}
          focusStyles={{
            borderColor: colors.THEME_BTN,
          }}
          inputStyles={{
            fontSize: 18,
            color: colors.WHITE,
            fontFamily: 'Gotham Bold',
            textAlign:"center"
          }}
          inputContainerStyles={{
            height: 45,
            borderWidth: 2,
            borderColor: colors.BORDER_COLOR,
            width: 40,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{
            width: '60%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50,
            maxWidth: 400,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity onPress={resendHandle} style={styles.resend}>
          <CustomText
            fontSize={17}
            lineHeight={20}
            color={colors.THEME_BTN}
            textAlign={'right'}
            textDecorationLine={'underline'}>
            Resend Otp
          </CustomText>
        </TouchableOpacity>
        <CustomButton
          alignSelf={'center'}
          marginTop={50}
          lable="Confirm"
          onPress={isConfirm}
        />
      </View>
    </ContainerBgImage>
  );
}

const styles = StyleSheet.create({
  resend: {
    marginTop: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
