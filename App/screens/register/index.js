import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import CustomButton from '../../compnents/customButton';
import {View, StyleSheet} from 'react-native';
import DropDown from '../../compnents/dropDown';
import screenString from '../../navigation/screenString';
import {useSelector, useDispatch} from 'react-redux';
import {addUser} from '../../redux/reducers/authReducer';
import {isValidEmail} from '../../utils/constants';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {Loader} from '../../compnents/loader';

export default function Register({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [account, setAccount] = useState('I am creating this account');
  const accountType = ['My Self', 'My Children'];
  const [isLoading, setIsLoading] = useState(false);
  const registerPayload = {
    email: email.trim(),
    name: name.trim(),
    password: password.trim(),
    phoneNumber: phonenumber.trim(),
    userType: user?.userType,
    fcmToken: '',
  };
  const userAccount = type => {
    console.log('type=>', type);
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
        alert(err?.returnMessage[0]);
      });
  };
  const isValidSignUp = () => {
    if (!name) alert('Please fill your full name.');
    else if (!email) alert('Please fill your email.');
    else if (!isValidEmail(email)) alert('Please enter valid email.');
    else if (!phonenumber) alert('Please fill your phonenumber.');
    else if (phonenumber.length != 10) alert('Please enter valid 10 digits phonenumber.');
    else if (!password) alert('Please fill your password.');
    else if (password.length < 6)
      alert('Password should be more than 5 character.');
    else handleSignUp();
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomText
        fontSize={32}
        lineHeight={38}
        fontWeight={'700'}
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
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Your Email'}
        value={email}
        onChangeText={txt => setEmail(txt)}
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
            userAccount(account);
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
        By signing up you agree to our Terms of
      </CustomText>
      <CustomText
        marginTop={5}
        alignSelf={'center'}
        fontSize={15}
        lineHeight={20}
        color={'#E4E4E4'}>
        {' '}
        Use and Privacy Policy
      </CustomText>
      <View style={styles.botomRow}>
        <CustomText color="#96969B" fontSize={13} lineHeight={16}>
          If you allready have an account?
        </CustomText>
        <CustomText
          onPress={() => navigation.goBack()}
          isPressable={true}
          fontWeight="500"
          fontSize={13}
          lineHeight={16}>
          {' '}
          Log In
        </CustomText>
      </View>
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
