import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import CustomInput from '../../compnents/CustomInput';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../compnents/customButton';
import screenString from '../../navigation/screenString';
import {LoginwithFsbk} from '../../compnents/socialLogin';

export default function Login({navigation}) {
  const [email, setEmail] = useState('abcd@gmail.com');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <ContainerBgImage>
      <CustomText
        fontSize={32}
        lineHeight={38}
        fontWeight={'700'}
        alignSelf={'center'}
        marginTop={80}>
        Sign In
      </CustomText>
      <CustomInput
        marginTop={84}
        borderBottomWidth={1}
        placeholder={'Your Mail'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <CustomInput
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Password'}
        value={password}
        onChangeText={txt => setPassword(txt)}
        secureTextEntry={!isPasswordShow}
        rightComponent={
          <PasswordEyeIcon
            isPasswordShow={isPasswordShow}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        }
      />
      <View
        style={[
          commonStyle.row('90%', 'space-between', 'center'),
          {marginTop: 27},
        ]}>
        <View style={commonStyle.row('50%', 'flex-start')}>
          <Icon
            size={20}
            name={
              isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
            }
            color={colors.THEME_BTN}
            onPress={() => setIsChecked(!isChecked)}
          />
          <CustomText marginLeft={10} fontSize={14} lineHeight={22}>
            Remember Me
          </CustomText>
        </View>
        <CustomText
          isPressable={true}
          onPress={() => navigation.navigate(screenString.FORGOTPASSWORD)}
          fontSize={14}
          lineHeight={22}>
          Forgot Password?
        </CustomText>
      </View>
      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Login"
        onPress={() => alert('in process')}
      />
      <View
        style={[
          commonStyle.row('90%', 'space-between', 'center'),
          {marginTop: 27},
        ]}>
        <View style={styles.rowLine}></View>
        <CustomText
          color="#96969B"
          fontWeight="400"
          fontSize={13}
          lineHeight={22}
          flex={1}>
          or
        </CustomText>
        <View style={styles.rowLine}></View>
      </View>
      <CustomButton
        backgroundColor="#1C1B1A"
        alignSelf={'center'}
        marginTop={32}
        flexDirection={'row'}
        icon={true}
        name={'apple'}
        lable="Continue with Apple"
        onPress={() => alert('in process')}
      />
      <CustomButton
        backgroundColor="#1E88E5"
        alignSelf={'center'}
        marginTop={22}
        flexDirection={'row'}
        icon={true}
        name={'facebook'}
        lable="Continue with Facebook"
        onPress={() => LoginwithFsbk()}
      />
      <View style={styles.botomRow}>
        <CustomText color="#96969B" fontSize={13} lineHeight={16}>
          Do you have an account?
        </CustomText>
        <CustomText
          onPress={() => navigation.navigate(screenString.REGISTER)}
          isPressable={true}
          fontWeight="500"
          fontSize={13}
          lineHeight={16}>
          {' '}
          Sign Up
        </CustomText>
      </View>
    </ContainerBgImage>
  );
}

const styles = StyleSheet.create({
  rowLine: {
    width: '40%',
    borderWidth: 0.7,
    borderColor: colors.BORDER_COLOR,
  },
  botomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
});
