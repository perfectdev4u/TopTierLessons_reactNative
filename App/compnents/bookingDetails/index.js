import React from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../customText';
import CustomImage from '../customImage';
import moment from 'moment';
import commonStyle from '../../theme/commonStyle';
import {useSelector} from 'react-redux';

export const BookingDetails = ({modalVisible, setModalVisible}) => {
  const {user} = useSelector(state => state.authReducer);
  const RowContents = ({
    iconLeft,
    titleLeft,
    subTitleLeft,
    iconRight,
    titleRight,
    subTitleRight,
  }) => {
    return (
      <View
        style={[
          commonStyle.row('90%', 'space-between', 'center'),
          {marginTop: 25},
        ]}>
        <View style={styles.bookingsContents}>
          <Icon name={iconLeft} color={colors.THEME_BTN} size={30} />
          <View style={{marginLeft: 10}}>
            <CustomText color={colors.THEME_BTN}>{titleLeft}</CustomText>
            <CustomText numberOfLines={1}>{subTitleLeft}</CustomText>
          </View>
        </View>
        <View style={styles.bookingsContents}>
          <Icon name={iconRight} color={colors.THEME_BTN} size={30} />
          <View style={{marginLeft: 10}}>
            <CustomText color={colors.THEME_BTN}>{titleRight}</CustomText>
            <CustomText>{subTitleRight}</CustomText>
          </View>
        </View>
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
        <View style={styles.card}>
          <View style={styles.header}>
            <CustomText>{'Booking Details'}</CustomText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name={'close'} color={colors.THEME_BTN} size={22} />
            </TouchableOpacity>
          </View>
          <CustomImage
            source={{uri: user?.bookingDetails?.studentImage}}
            style={styles.profile}
          />
          <CustomText
            alignSelf={'center'}
            marginTop={10}
            color={colors.THEME_BTN}>
            {user?.bookingDetails?.studentName}
          </CustomText>
          <RowContents
            iconLeft={'cellphone'}
            titleLeft={'Contact'}
            subTitleLeft={user?.bookingDetails?.phone}
            iconRight={'credit-card-outline'}
            titleRight={'Payment'}
            subTitleRight={
              user?.bookingDetails?.paymentStatus === 1 ? 'pending' : 'Done'
            }
          />
          <RowContents
            iconLeft={'cellphone'}
            titleLeft={'Location'}
            subTitleLeft={user?.bookingDetails?.location}
            iconRight={'credit-card-outline'}
            titleRight={'Price'}
            subTitleRight={user?.bookingDetails?.price}
          />
          <RowContents
            iconLeft={'cellphone'}
            titleLeft={'Email'}
            subTitleLeft={user?.bookingDetails?.email}
            iconRight={'credit-card-outline'}
            titleRight={'Date'}
            subTitleRight={moment(user?.bookingDetails?.bookingDate).format(
              'YYYY-MM-DD',
            )}
          />
          {user?.bookingDetails?.slotsList.length===0&&<CustomText
            alignSelf={'center'}
            marginTop={20}
            marginBottom={20}
            color={colors.THEME_BTN}>
            {"No slots are available"}
          </CustomText>}
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
    padding: 10,
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
    marginTop:10
  },
  profile: {
    alignSelf: 'center',
    height: 60,
    width: 60,
    borderRadius: 50,
    marginTop: 10,
  },
  bookingsContents: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
  },
});
