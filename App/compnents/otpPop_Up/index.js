import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OtpInputs from 'react-native-otp-inputs';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {Loader} from '../loader';

export const OtpVerify = ({
  modalVisible,
  setModalVisible,
  email,
  otp,
  setOtp,
  setIsVerified,
}) => {
  const [loading, setLoading] = useState(false);
  const verificationPayload = {
    email: email,
    otp: otp,
  };
  const handleEmailVerification = () => {
    setLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.VerifyEmailAddress,
      verificationPayload,
      null,
    )
      .then(res => {
        setLoading(false);
        if (res?.data?.statusCode === 200) {
          setModalVisible(false);
          setIsVerified(true);
          console.log('isVerified-Otp==>', res?.data?.data);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('isVerified-Otp-Err', err);
      });
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <Loader modalVisible={loading} setModalVisible={setLoading} />
        <View style={styles.card}>
          <View style={styles.header}>
            <CustomText>{'Enter Otp'}</CustomText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name={'close'} color={colors.THEME_BTN} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <OtpInputs
            handleChange={setOtp}
            numberOfInputs={4}
            // autofillFromClipboard={true}
            autoFocus={true}
            focusStyles={{
              borderColor: colors.THEME_BTN,
            }}
            inputStyles={{
              fontSize: 18,
              color: colors.WHITE,
              fontFamily: 'Gotham Bold',
            }}
            inputContainerStyles={{
              height: 40,
              borderWidth: 2,
              borderColor: colors.BORDER_COLOR,
              width: 40,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{
              width: '60%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 50,
              maxWidth: 400,
              alignSelf: 'center',
            }}
          />
          <CustomButton
            marginTop={30}
            marginBottom={20}
            lable={'Submit'}
            width={'80%'}
            alignSelf={'center'}
            onPress={() => handleEmailVerification()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005',
  },
  card: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '50%',
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  divider: {
    backgroundColor: '#595959',
    height: 2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
