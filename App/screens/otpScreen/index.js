import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import colors from '../../theme/colors';
import ContainerBgImage from '../../compnents/containerBackground';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import {useFocusEffect} from '@react-navigation/native';

export default function OtpScreen({navigation}) {
  const [otp, setOtp] = useState(['-', '-', '-', '-']);
  const [otpVal, setOtpVal] = useState('');
  const [isFocus, setIsFocus] = useState(true);
  const resendHandle = () => {};

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
  const handleConfirm = () => {};
  const isConfirm = () => {
    if (isValidConfirm()) {
      handleConfirm();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsFocus(true);
    }, [isFocus]),
  );

  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
      />
      <CustomText
        marginTop={60}
        fontSize={32}
        fontWeight="700"
        lineHeight={38}
        color={colors.WHITE}
        textAlign={'center'}>
        Enter OTP
      </CustomText>
      <View>
        <TextInput
          onChangeText={value => {
            if (isNaN(value)) {
              return;
            }
            if (value.length > 4) {
              return;
            }
            let val = value + '----'.substr(0, 4 - value.length);
            let a = [...val];
            setOtpVal(a);
            setOtp(value);
          }}
          style={{height: 0}}
          autoFocus={isFocus}
          maxLength={4}
          keyboardType={'numeric'}
          isFocused={isFocus}
        />
        <View style={styles.otpBoxesContainer}>
          {[0, 1, 2, 3].map((item, index) => (
            <Text
              onPress={() => setIsFocus(!isFocus)}
              style={styles.otpBox}
              key={index}>
              {otp[item]}
            </Text>
          ))}
        </View>
        <TouchableOpacity onPress={resendHandle} style={styles.resend}>
          <CustomText
            fontSize={17}
            fontWeight="500"
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
          onPress={() => navigation.navigate(screenString.NEWPASSWORD)}
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

  otpBoxesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 50,
  },
  otpBox: {
    padding: 10,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.THEME_BTN,
    height: 40,
    width: 40,
    textAlign: 'center',
    color: colors.WHITE,
  },
});
