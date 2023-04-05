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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';
import moment from 'moment';
import {PaymentInfo} from '../../compnents/paymentInfo';
import commonStyle from '../../theme/commonStyle';
let data;
export default function CreateBooking({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [slotsList, setSlotList] = useState([]);
  const types = ['Suggest a location to me', 'I have location in my mind'];
  const [isActive, setIsActive] = useState(0);
  const [childId, setChildId] = useState(0);
  const [venueList, setVenueList] = useState(user?.coachVenue);
  const [venue, setVenue] = useState('Select Venue');
  const [venueId, setVenueId] = useState(0);
  const [isVenueDropDown, setIsVenueDropDown] = useState(false);
  const [address, setAddress] = useState({name: '', lat: 0, lan: 0});
  const [lessonTime, setLessonTime] = useState('How Long Lesson Do you Want');
  const [lessonTimeDropDown, setLessonTimeDropDown] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friendCount, setFriendCount] = useState(
    'Add a friend for $10 per hour!',
  );
  const [friendDropDown, setFriendDropDown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lessonTimming = ['30 Minutes', '60 Minutes'];
  const frndsCount = [1, 2, 3, 4, 5];
  const venuePayload = {
    venueId: venueId,
  };
  const bookingPayload = {
    slotsList: slotsList,
    lessonsDuration: lessonTime === '30 Minutes' ? 1 : 2,
    addFriend:
      friendCount === 'Add a friend for $10 per hour!' ? 0 : friendCount,
    coachId: 4,
    venueId: venueId,
    childId: childId,
    address: address.name,
    latitude: address.lat,
    longitude: address.lan,
  };
  useEffect(() => {
    timeSlotList();
  }, []);
  useEffect(() => {
    if (venueId) hanleAddFriend();
    if (isActive === 1) {
      setVenue('Select Venue');
      setVenueId(0);
      setIsFriend(false);
      setFriendCount('Add a friend for $10 per hour!');
    }
  }, [venueId, isActive]);
  const timeSlotList = async () => {
    let newData = await route.params?.slotsBooked.map(item => {
      let {date, slotId} = item;
      return {date: new Date(date).toUTCString(), slotId};
    });
    setSlotList(newData);
  };
  const hanleAddFriend = () => {
    postReq(apiUrl.baseUrl + apiUrl.venueById, venuePayload, user?.access_token)
      .then(res => {
        if (res?.data?.statusCode === 200) {
          //console.log('venueDetail==>', res?.data?.data);
          setIsFriend(res?.data?.data?.alowGeust);
        }
      })
      .catch(err => {
        console.log('venueDetail_err==>', err);
      });
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
        Alert.alert(err?.returnMessage[0]);
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
              <CustomText alignSelf={'flex-start'}>
                Date :-{' '}
                {
                  <CustomText color={colors.THEME_BTN}>
                    {' '}
                    {moment(val.date).format('DD-MM-YYYY')}
                  </CustomText>
                }
              </CustomText>
              <CustomText alignSelf={'flex-start'} marginTop={2}>
                Time :-{' '}
                {
                  <CustomText color={colors.THEME_BTN}>
                    {' '}
                    {moment(val.entry, ['h:mm:ss']).format('hh:mm A')}
                  </CustomText>
                }
              </CustomText>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={[
          commonStyle.row('90%', 'space-between', 'center'),
          {
            marginTop: 20,
          },
        ]}>
        {types?.map((val, index) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setIsActive(index)}
              key={index}>
              <Icon
                size={15}
                name={isActive === index ? 'circle-slice-8' : 'circle-outline'}
                color={isActive === index ? colors.THEME_BTN : colors.FADED}
              />
              <CustomText
                color={isActive === index ? colors.THEME_BTN : colors.WHITE}
                marginLeft={3}
                fontSize={12}
                textAlign={'center'}>
                {val}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>

      {isActive === 0 ? (
        <View>
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
              {venueList === undefined && (
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
                        venueId === val.venueId
                          ? colors.THEME_BTN
                          : colors.BLACK
                      }
                      size={18}
                    />
                    <CustomText
                      color={
                        venueId === val.venueId
                          ? colors.THEME_BTN
                          : colors.BLACK
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
        </View>
      ) : (
        <GooglePlacesAutocomplete
          placeholder="Address"
          listViewDisplayed={false}
          onPress={(data, details = null) => {
            setAddress({
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lan: details?.geometry?.location?.lng,
            });
          }}
          query={{
            key: 'AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ',
            language: 'en',
          }}
          returnKeyType={'default'}
          fetchDetails={true}
          enablePoweredByContainer={false}
          textInputProps={{
            value: address.name,
            placeholderTextColor: '#D4D4D4',
            onChangeText: address => setAddress(address),
          }}
          styles={{
            textInputContainer: {
              marginTop: 30,
              borderColor: colors.BORDER_COLOR,
              borderWidth: 1,
            },
            textInput: {
              height: 35,
              color: colors.WHITE,
              fontSize: 16,
              backgroundColor: 'black',
            },
            container: {
              width: '90%',
              alignSelf: 'center',
            },
          }}
        />
      )}
      {isFriend && (
        <DropDown
          width={'90%'}
          marginTop={30}
          isDropDown={lessonTimeDropDown}
          lable={friendCount}
          setLable={setFriendCount}
          onPress={() => setFriendDropDown(!friendDropDown)}
          isShown={friendDropDown}
          data={frndsCount}
          onSelect={() => setFriendDropDown(!friendDropDown)}
        />
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
