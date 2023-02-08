import React, {useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useDispatch} from 'react-redux';
import {isValidEmail} from '../../utils/constants';
import {Loader} from '../../compnents/loader';
import {addUser} from '../../redux/reducers/authReducer';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const forgotpayload = {
    email: email.trim(),
    otp: '',
  };
  const handleConfirm = () => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.forgotPassword, forgotpayload)
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200)
          // dispatch(
          //   addUser({
          //     access_token: res?.data?.data?.access_token,
          //     user: res?.data?.data,
          //   }),
          // );
          navigation.navigate(screenString.OTPSCREEN);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err==>', err);
        alert(err?.returnMessage[0]);
      });
  };
  const isValidConfirm = () => {
    if (!email) alert('Please enter your registered email.');
    else if (!isValidEmail(email)) alert('Please enter valid email.');
    else handleConfirm();
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
        fontWeight={'700'}
        alignSelf={'center'}
        marginTop={60}>
        Forgot Password
      </CustomText>
      <CustomText
        fontSize={15}
        lineHeight={22}
        fontWeight={'500'}
        alignSelf={'center'}
        color={'#BEBEBE'}
        margin={20}
        marginTop={80}>
        Please enter registered email address to reset your password through
        link.
      </CustomText>
      <CustomInput
        marginTop={50}
        borderBottomWidth={1}
        placeholder={'Your Email'}
        value={email}
        onChangeText={txt => setEmail(txt)}
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
