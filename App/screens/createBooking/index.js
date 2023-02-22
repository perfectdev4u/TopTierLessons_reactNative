import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import colors from '../../theme/colors';
import {View, Alert, ScrollView} from 'react-native';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import ContainerBgImage from '../../compnents/containerBackground';
import {useSelector} from 'react-redux';
import CustomButton from '../../compnents/customButton';
import DropDown from '../../compnents/dropDown';
import style from './style';
import moment from 'moment';
import {PaymentInfo} from '../../compnents/paymentInfo';
let data;
export default function CreateBooking({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [slotsList, setSlotList] = useState([]);
  const [venue, setVenue] = useState('Select Venue');
  const [venueId, setVenueId] = useState('');
  const [isVenueDropDown, setIsVenueDropDown] = useState(false);
  const [lessonTime, setLessonTime] = useState('How Long Lesson Do you Want');
  const [lessonTimeDropDown, setLessonTimeDropDown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lessonTimming = ['30 Minutes', '60 Minutes'];
  const bookingPayload = {
    slotsList: slotsList,
    lessonsDuration: lessonTime === '30 Minutes' ? 1 : 2,
    addFriend: 0,
    coachId: 4,
    venueId: 3,
    childId: 0,
  };
  useEffect(() => {
    timeSlotList();
  }, []);
  const timeSlotList = async () => {
    let newData = await route.params?.slotsBooked.map(item => {
      let {date, slotId} = item;
      return {date: new Date(date).toUTCString(), slotId};
    });
    setSlotList(newData);
  };
  const onConfirm = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.createBooking,
      bookingPayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200) {
          data = res?.data?.data;
          Alert.alert(res?.data?.returnMessage[0]);
          setIsModalVisible(true);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('_err==>', err);
      });
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Create Booking'}
        rightIcon={true}
      />
      <ScrollView
        style={style.rowScroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {route.params?.slotsBooked.map((val, index) => {
          return (
            <View key={index} style={style.dateTime}>
              <CustomText color={colors.WHITE}>
                Date :-{' '}
                {
                  <CustomText marginTop={2} color={colors.THEME_BTN}>
                    {' '}
                    {moment(val.date).format('DD-MM-YYYY')}
                  </CustomText>
                }
              </CustomText>
              <CustomText marginTop={2} color={colors.WHITE}>
                Time :-{' '}
                {
                  <CustomText marginTop={2} color={colors.THEME_BTN}>
                    {' '}
                    {val.entry}
                  </CustomText>
                }
              </CustomText>
            </View>
          );
        })}
      </ScrollView>

      <DropDown
        width={'90%'}
        marginTop={60}
        isDropDown={isVenueDropDown}
        lable={venue}
        setLable={setVenue}
        onPress={() => setIsVenueDropDown(!isVenueDropDown)}
        isShown={isVenueDropDown}
        data={[]}
        onSelect={() => setIsVenueDropDown(!isVenueDropDown)}
      />
      <DropDown
        width={'90%'}
        marginTop={30}
        isDropDown={lessonTimeDropDown}
        lable={lessonTime}
        setLable={setLessonTime}
        onPress={() => setLessonTimeDropDown(!lessonTimeDropDown)}
        isShown={lessonTimeDropDown}
        data={lessonTimming}
        onSelect={() => setLessonTimeDropDown(!lessonTimeDropDown)}
      />
      <CustomButton
        marginTop={100}
        alignSelf={'center'}
        width={'80%'}
        lable={'Confirm'}
        onPress={() => onConfirm()}
      />
      <PaymentInfo
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        bookingId={data?.bookingId}
        price={data?.bookingPrice}
        serviceCharge={data?.gatewayCharge}
        totalPrice={data?.totalPrice}
        navigation={navigation}
      />
    </ContainerBgImage>
  );
}
