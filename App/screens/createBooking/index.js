import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import colors from '../../theme/colors';
import {View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import ContainerBgImage from '../../compnents/containerBackground';
import {useSelector} from 'react-redux';
import CustomButton from '../../compnents/customButton';
import DropDown from '../../compnents/dropDown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';
import moment from 'moment';
import {PaymentInfo} from '../../compnents/paymentInfo';
let data;
export default function CreateBooking({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [slotsList, setSlotList] = useState([]);
  const [venueList, setVenueList] = useState(user?.coachVenue);
  const [venue, setVenue] = useState('Select Venue');
  const [venueId, setVenueId] = useState(null);
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
    venueId: venueId,
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
  // const handleAddId = val => {
  //   let newObj = {...val.venueId, venueId: val.venueId};
  //   let index = venueId.findIndex(item => item.venueId === val.venueId);
  //   if (index === -1) {
  //     setVenueId([...venueId, newObj]);
  //   } else {
  //     let copy = [...venueId];
  //     copy.splice(index, 1);
  //     setVenueId(copy);
  //   }
  // };

  // const setActiveValue = (index, list, setList) => {
  //   let copy = [...list];
  //   copy[index]['isSelected'] = copy[index]['isSelected']
  //     ? !copy[index]['isSelected']
  //     : true;
  //   setList(copy);
  // };
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
        width="90%"
        marginTop={30}
        isDropDown={isVenueDropDown}
        lable={venue}
        setLable={setVenue}
        onPress={() => setIsVenueDropDown(!isVenueDropDown)}
        isShown={false}
      />
      {isVenueDropDown && (
        <View
          style={{
            width: '90%',
            marginTop: 10,
            backgroundColor: colors.WHITE,
            alignSelf: 'center',
            padding: 10,
          }}>
          {venueList.length === 0 && (
            <CustomText color={colors.BLACK} fontSize={15} lineHeight={22}>
              {'No venues found'}
            </CustomText>
          )}

          {venueList?.map((val, index) => (
            <View key={index}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setVenue(val.name);
                  setVenueId(val.venueId);
                  setIsVenueDropDown(false);
                }}>
                <Icon
                  name={
                    venueId === val.venueId
                      ? 'checkbox-marked-outline'
                      : 'checkbox-blank-outline'
                  }
                  color={
                    venueId === val.venueId ? colors.THEME_BTN : colors.BLACK
                  }
                  size={18}
                />
                <CustomText
                  color={
                    venueId === val.venueId ? colors.THEME_BTN : colors.BLACK
                  }
                  fontSize={15}
                  marginLeft={'5%'}
                  lineHeight={22}>
                  {val.name}
                </CustomText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
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
