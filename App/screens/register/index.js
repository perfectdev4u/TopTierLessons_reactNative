import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import CustomButton from '../../compnents/customButton';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import DropDown from '../../compnents/dropDown';
import screenString from '../../navigation/screenString';
import {useSelector, useDispatch} from 'react-redux';
import {addUser} from '../../redux/reducers/authReducer';
import {isValidEmail} from '../../utils/constants';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {Loader} from '../../compnents/loader';
import Icon from 'react-native-vector-icons/Octicons';
import colors from '../../theme/colors';
import {OtpVerify} from '../../compnents/otpPop_Up';
import commonStyle from '../../theme/commonStyle';

export default function Register({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [account, setAccount] = useState('I am creating this account');
  const accountType = ['My Self', 'My Children'];
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    userAccount(account);
  }, [account]);
  const registerPayload = {
    email: email.trim(),
    name: name.trim(),
    password: password.trim(),
    phoneNumber: phonenumber.trim(),
    userType: user?.userType,
    fcmToken: '',
  };
  const verificationPayload = {
    email: email.trim(),
    otp: '',
  };
  const handleEmailVerification = () => {
    if (!isValidEmail(email)) return Alert.alert('Please enter valid email.');
    postReq(
      apiUrl.baseUrl + apiUrl.VerifyEmailAddress,
      verificationPayload,
      null,
    )
      .then(res => {
        Alert.alert(res?.data?.returnMessage[0]);
        if (res?.data?.returnStatus === true) setPopUp(true);
        else setPopUp(false);
        console.log('isVerified-Status==>', res?.data?.returnStatus);
      })
      .catch(err => {
        console.log('isVerified-Err', err);
        Alert.alert(err?.returnMessage[0]);
        setEmail('');
      });
  };
  const userAccount = type => {
    if (type === 'My Self') dispatch(addUser({...user, userType: 3}));
    else if (type === 'My Children') dispatch(addUser({...user, userType: 4}));
    else null;
  };
  const handleSignUp = () => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.register, registerPayload)
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200)
          dispatch(
            addUser({
              access_token: res?.data?.data?.access_token,
              user: res?.data?.data,
            }),
          );
        user?.userType === 2
          ? navigation.navigate(screenString.COACHPROFILESETUP)
          : navigation.navigate(screenString.USERPROFILESETUP);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err==>', err);
        Alert.alert(err?.errors?.email);
      });
  };
  const isValidSignUp = () => {
    if (!name) Alert.alert('Please fill your full name.');
    else if (!email) Alert.alert('Please fill your email.');
    else if (!isValidEmail(email)) Alert.alert('Please enter valid email.');
    else if (!phonenumber) Alert.alert('Please fill your phonenumber.');
    else if (phonenumber.length != 10)
      Alert.alert('Please enter valid 10 digits phonenumber.');
    else if (!password) Alert.alert('Please fill your password.');
    else if (password.length < 6)
      Alert.alert('Password should be more than 5 character.');
    else if (isVerified !== true) {
      Alert.alert('Please Verify your email before sign up.');
    } else handleSignUp();
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomText
        fontSize={32}
        lineHeight={38}
        alignSelf={'center'}
        marginTop={80}>
        Sign Up
      </CustomText>
      <CustomInput
        marginTop={84}
        borderBottomWidth={1}
        placeholder={'Your Name'}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <CustomInput
        editable={isVerified ? false : true}
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Your Verified Email'}
        value={email}
        onChangeText={txt => setEmail(txt)}
        rightComponent={
          <TouchableOpacity
            disabled={isVerified ? true : false}
            onPress={handleEmailVerification}>
            <Icon
              name={isVerified ? 'verified' : 'unverified'}
              size={22}
              color={isVerified ? 'green' : colors.BORDER_COLOR}
            />
          </TouchableOpacity>
        }
      />
      <CustomInput
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Phone Number'}
        keyboardType={'numeric'}
        value={phonenumber}
        onChangeText={txt => setPhonenumber(txt)}
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
      {user?.userType === 2 ? null : (
        <DropDown
          marginTop={30}
          isDropDown={isDropDown}
          lable={account}
          setLable={setAccount}
          onPress={() => setIsDropDown(!isDropDown)}
          isShown={isDropDown}
          onSelect={() => {
            setIsDropDown(!isDropDown);
          }}
          data={accountType}
        />
      )}
      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Sign up"
        onPress={() => isValidSignUp()}
      />
      <CustomText
        marginTop={30}
        alignSelf={'center'}
        fontSize={15}
        lineHeight={20}
        color={'#E4E4E4'}>
        By signing up you agree to our
      </CustomText>
      <View
        style={[commonStyle.row('95%', 'center', 'center'), {marginTop: 5}]}>
        <CustomText
          onPress={() =>
            navigation.navigate(screenString.TERMS_PRIVACY, {type: 1})
          }
          isPressable={true}
          fontSize={15}
          lineHeight={20}
          color={colors.THEME_BTN}>
          {' '}
          Terms of Service
        </CustomText>
        <CustomText fontSize={15} lineHeight={20} color={'#E4E4E4'}>
          {' '}
          &
        </CustomText>
        <CustomText
          isPressable={true}
          onPress={() =>
            navigation.navigate(screenString.TERMS_PRIVACY, {type: 2})
          }
          fontSize={15}
          lineHeight={20}
          color={colors.THEME_BTN}>
          {' '}
          Privacy Policy
        </CustomText>
      </View>
      <View style={styles.botomRow}>
        <CustomText color="#96969B" fontSize={13} lineHeight={16}>
          If you allready have an account?
        </CustomText>
        <CustomText
          onPress={() => navigation.navigate(screenString.LOGIN)}
          isPressable={true}
          fontSize={13}
          lineHeight={16}>
          {' '}
          Log In
        </CustomText>
      </View>
      <OtpVerify
        modalVisible={popUp}
        setModalVisible={setPopUp}
        email={email}
        setEmail={setEmail}
        otp={otp}
        setOtp={setOtp}
        setIsVerified={setIsVerified}
      />
    </ContainerBgImage>
  );
}

const styles = StyleSheet.create({
  botomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
});
