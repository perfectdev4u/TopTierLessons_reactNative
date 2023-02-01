import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('abcd@gmail.com');
  return (
    <ContainerBgImage>
      <CustomHeader />
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
        onPress={() => navigation.navigate(screenString.NEWPASSWORD)}
      />
    </ContainerBgImage>
  );
}
