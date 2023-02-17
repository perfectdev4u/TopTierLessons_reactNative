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
import {isValidEmail} from '../../utils/constants';

export default function ContactUs({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const contactUsPayload = {
    name: name.trim(),
    userEmail: email.trim(),
    subject: subject.trim(),
    comment: comment.trim(),
  };
  const contactUsHandler = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.contactUs,
      contactUsPayload,
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
  const isValidcontactUs = () => {
    if (!name) Alert.alert('please enter your name');
    else if (!email) Alert.alert('please enter your email id');
    else if (!isValidEmail(email)) Alert.alert('please enter valid email id');
    else if (!subject) Alert.alert('please enter your subject');
    else if (!comment) Alert.alert('please enter your comments');
    else contactUsHandler();
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Contact Us'}
        rightIcon={true}
      />
      <CustomText
        fontSize={32}
        lineHeight={38}
        alignSelf={'center'}
        marginTop={60}>
        Need Help!
      </CustomText>
      <CustomInput
        marginTop={50}
        borderBottomWidth={1}
        placeholder={'Name'}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <CustomInput
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Email'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <CustomInput
        marginTop={30}
        borderBottomWidth={1}
        placeholder={'Subject'}
        value={subject}
        onChangeText={txt => setSubject(txt)}
      />
      <CustomInput
        height={70}
        marginTop={40}
        borderWidth={1}
        placeholder={'Comments'}
        multiline={true}
        value={comment}
        onChangeText={txt => setComment(txt)}
      />
      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Submit"
        onPress={() => isValidcontactUs()}
      />
    </ContainerBgImage>
  );
}
