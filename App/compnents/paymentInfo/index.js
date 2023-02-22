import React, {useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity, Alert} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../customText';
import commonStyle from '../../theme/commonStyle';
import CustomButton from '../customButton';
import {postReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {useSelector} from 'react-redux';
import {Loader} from '../loader';
import screenString from '../../navigation/screenString';

export const PaymentInfo = ({
  modalVisible,
  setModalVisible,
  bookingId,
  totalPrice,
  price,
  serviceCharge,
  navigation,
}) => {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const createOrderPayload = {
    bookingId: bookingId,
    currency: 'USD',
    redirectUrl: 'toptier://PAYMENTRESULT',
  };
  const onPayment = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.createOrder,
      createOrderPayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200) {
          console.log('onPay=>', res?.data?.data);
          Alert.alert(res?.data?.returnMessage[0]);
          setModalVisible(false);
          navigation.navigate(screenString.PAYMENT, {
            paymentLink: res?.data?.data?.paymentLink,
          });
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('_err==>', err);
      });
  };
  const PriceInfo = ({title, price}) => {
    return (
      <View
        style={[
          commonStyle.row('85%', 'space-between', 'center'),
          {marginTop: 20},
        ]}>
        <CustomText color={colors.THEME_BTN}>{title}</CustomText>
        <CustomText>${price}</CustomText>
      </View>
    );
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
        <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
        <View style={styles.card}>
          <View style={styles.header}>
            <CustomText>{'Payment Information'}</CustomText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name={'close'} color={colors.THEME_BTN} size={22} />
            </TouchableOpacity>
          </View>
          <PriceInfo title={'Booking Charges'} price={price} />
          <PriceInfo title={'Service Charges'} price={serviceCharge} />
          <PriceInfo title={'Total Charges'} price={totalPrice} />
          <CustomButton
            marginTop={40}
            alignSelf={'center'}
            width={'80%'}
            lable={'Pay'}
            onPress={() => onPayment()}
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
    backgroundColor: '#0009',
  },
  card: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#595959',
    alignSelf: 'center',
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
});
