import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
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
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useDispatch} from 'react-redux';
import {isValidEmail} from '../../utils/constants';
import {Loader} from '../../compnents/loader';
import {addUser} from '../../redux/reducers/authReducer';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getRememberUser();
  }, []);
  const loginpayload = {
    email: email.trim(),
    password: password.trim(),
    refreshToken: '',
    extrenalLoginToken: '',
    grantType: 'password',
    fcmToken: '',
  };
  const handleLogin = () => {
    if (isChecked)
      AsyncStorage.setItem('@remember_user', JSON.stringify({email, password}));
    else AsyncStorage.removeItem('@remember_user', null);
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.logIn, loginpayload)
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200)
          dispatch(
            addUser({
              access_token: res?.data?.data?.access_token,
              user: res?.data?.data,
            }),
          );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: screenString.DRAWER}],
          }),
        );
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err==>', err);
        Alert.alert(err?.returnMessage[0]);
      });
  };
  const isValidLogin = () => {
    if (!email) Alert.alert('Please fill your email.');
    else if (!isValidEmail(email)) Alert.alert('Please enter valid email.');
    else if (!password) Alert.alert('Please fill your password.');
    // else if (password.length < 6)
    //   Alert.alert('Password should be more than 5 character.');
    else handleLogin();
  };
  const getRememberUser = async () => {
    const jsonValue = await AsyncStorage.getItem('@remember_user');
    if (jsonValue != null) {
      const user_Remember = JSON.parse(jsonValue);
      setEmail(user_Remember?.email);
      setPassword(user_Remember?.password);
      setIsChecked(true);
    }
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomText
        fontSize={32}
        lineHeight={38}
        alignSelf={'center'}
        marginTop={80}>
        Sign In
      </CustomText>
      <CustomInput
        marginTop={84}
        borderBottomWidth={1}
        placeholder={'Your Email'}
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
        onPress={() => isValidLogin()}
      />
      <View
        style={[
          commonStyle.row('90%', 'space-between', 'center'),
          {marginTop: 27},
        ]}>
        <View style={styles.rowLine}></View>
        <CustomText color="#96969B" fontSize={13} lineHeight={22} flex={1}>
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
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: screenString.REGISTER}],
              }),
            )
          }
          isPressable={true}
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
