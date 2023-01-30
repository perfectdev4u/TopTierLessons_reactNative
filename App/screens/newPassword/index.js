import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import screenString from '../../navigation/screenString';

export default function NewPassword({navigation}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmasswordShow] = useState(false);
  return (
    <ContainerBgImage>
      <Icon
        size={35}
        name={'chevron-left'}
        style={{
          marginTop: 20,
        }}
        color={colors.WHITE}
        onPress={() => navigation.goBack()}
      />
      <CustomText
        fontSize={32}
        lineHeight={38}
        fontWeight={'700'}
        alignSelf={'center'}
        marginTop={60}>
        Set New Password
      </CustomText>
      <CustomText
        fontSize={15}
        lineHeight={22}
        fontWeight={'500'}
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
        onPress={() => navigation.navigate(screenString.LOGIN)}
      />
    </ContainerBgImage>
  );
}
