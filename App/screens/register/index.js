import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import PasswordEyeIcon from '../../compnents/passwordEyeIcon';
import CustomButton from '../../compnents/customButton';
import {View, StyleSheet} from 'react-native';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('abcd@gmail.com');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  return (
    <ContainerBgImage>
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
      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Sign up"
        onPress={() => alert('in process')}
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
