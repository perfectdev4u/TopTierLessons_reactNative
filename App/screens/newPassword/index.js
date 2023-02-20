import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import {Loader} from '../../compnents/loader';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import { goBackHandle } from '../../utils/constants';

export default function NewPassword({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordShow, setIsCurrentPasswordShow] = useState(false);
  const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmasswordShow] = useState(false);
  const changePasswordPayload = {
    oldPassword: currentPassword.trim(),
    newPassword: newPassword.trim(),
  };
  const changePasswordHandler = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.changePassword,
      changePasswordPayload,
      user?.access_token,
    )
      .then(res => {
        if (res?.data?.statusCode === 200) {
          setIsLoading(false);
          Alert.alert(res?.data?.returnMessage[0]);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: screenString.DRAWER}],
            }),
          );
        }
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert(err?.returnMessage[0]);
        console.log(err);
      });
  };
  const isValidConfirm = () => {
    if (!currentPassword) Alert.alert('please enter your current password');
    else if (!newPassword) Alert.alert('please enter your new password');
    else if (newPassword.length < 6)
      Alert.alert('Password should be more than 5 character.');
    else if (!confirmPassword) Alert.alert('please confirm your new password');
    else if (newPassword != confirmPassword)
      Alert.alert('password not matched');
    else changePasswordHandler();
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => goBackHandle(navigation)}
      />
      <CustomText
        fontSize={32}
        lineHeight={38}
        alignSelf={'center'}
        marginTop={60}>
        Change Password
      </CustomText>
      <CustomInput
        marginTop={50}
        borderBottomWidth={1}
        placeholder={'Current Password'}
        value={currentPassword}
        onChangeText={txt => setCurrentPassword(txt)}
        secureTextEntry={!isCurrentPasswordShow}
        rightComponent={
          <PasswordEyeIcon
            isPasswordShow={isCurrentPasswordShow}
            onPress={() => setIsCurrentPasswordShow(!isCurrentPasswordShow)}
          />
        }
      />
      <CustomInput
        marginTop={30}
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
        onPress={() => isValidConfirm()}
      />
    </ContainerBgImage>
  );
}
