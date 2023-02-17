import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import {CommonActions} from '@react-navigation/native';
import {Loader} from '../../compnents/loader';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {Alert} from 'react-native';

export default function ResetPassword({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmasswordShow] = useState(false);
  const resetPasswordPayload = {
    email: route?.params?.email,
    token: route?.params?._token,
    newPassword: newPassword.trim(),
  };
  const handleIsConfirm = () => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.resetPassword, resetPasswordPayload)
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200) console.log('res?.data?.data=>', res?.data);
        Alert.alert(res?.data?.returnMessage[0]);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: screenString.LOGIN}],
          }),
        );
      })
      .catch(err => {
        setIsLoading(false);
        console.log('error==>', err);
        Alert.alert(err?.returnMessage[0]);
      });
  };
  const isValidConfirm = () => {
    if (!newPassword) {
      Alert.alert('Please enter your new password.');
      return false;
    } else if (newPassword.length < 6) {
      Alert.alert('Password should be more than 5 character.');
      return false;
    } else if (!confirmPassword) {
      Alert.alert('Please enter confirm password.');
      return false;
    } else if (newPassword != confirmPassword) {
      Alert.alert('Password is mismatched.');
      return false;
    }
    return handleIsConfirm();
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
      />
      <CustomText
        fontSize={32}
        lineHeight={38}
        alignSelf={'center'}
        marginTop={60}>
        Reset Password
      </CustomText>
      <CustomText
        fontSize={15}
        lineHeight={22}
        alignSelf={'center'}
        color={'#BEBEBE'}
        margin={20}
        marginTop={80}>
        Please create new password to sign in to your account.
      </CustomText>

      <CustomInput
        marginTop={10}
        borderBottomWidth={1}
        placeholder={'New Password'}
        value={newPassword}
        onChangeText={txt => setNewPassword(txt)}
        secureTextEntry={!isNewPasswordShow}
        rightComponent={
          <PasswordEyeIcon
            isPasswordShow={isNewPasswordShow}
            onPress={() => setIsNewPasswordShow(!isNewPasswordShow)}
          />
        }
      />
      <CustomInput
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Confirm Password'}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
        secureTextEntry={!isConfirmPasswordShow}
        rightComponent={
          <PasswordEyeIcon
            isPasswordShow={isConfirmPasswordShow}
            onPress={() => setIsConfirmasswordShow(!isConfirmPasswordShow)}
          />
        }
      />

      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Confirm"
        onPress={isValidConfirm}
      />
    </ContainerBgImage>
  );
}
