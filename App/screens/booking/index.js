import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from 'react-native';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import Images from '../../assets/Images';
import CustomImage from '../../compnents/customImage';
import style from './style';
import {BookingDetails} from '../../compnents/bookingDetails';
import {addUser} from '../../redux/reducers/authReducer';
import { goBackHandle } from '../../utils/constants';

export default function Booking({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [isBookingsList, setIsBookingsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState({
    bookingId: null,
    bookingStatus: null,
    coachId: null,
  });
  const title = [
    {name: 'Previous', width: '50%'},
    {name: 'Upcoming', width: '50%'},
  ];
  const bookingsPayload = {
    page: 1,
    pageSize: 20,
  };
  const updatePayload = {
    bookingId: id.bookingId,
    bookingStatus: id.bookingStatus,
    coachId: id.coachId,
  };
  const bookingDetailsPayload = {
    bookingId: id.bookingId,
  };
  useEffect(() => {
    if (isActive === 0) getBookingsList(apiUrl.previousBookings);
    else getBookingsList(apiUrl.upcomingBookings);
  }, [isActive]);
  useEffect(() => {
    if (id.coachId && id.bookingStatus && id.bookingId) updateBokingStatus();
    else if (id.bookingId && !id.coachId && !id.bookingStatus)
      getBookingDetails();
  }, [id.coachId, id.bookingStatus, id.bookingId]);
  const getBookingsList = type => {
    setIsLoading(true);
    postReq(apiUrl.baseUrl + type, bookingsPayload, user?.access_token)
      .then(res => {
        setIsLoading(false);
        setIsBookingsList(res?.data?.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Bookings_err==>', err);
      });
  };
  const bookingsItemList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setId({bookingId: item.bookingId});
        }}
        key={index}
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {
            height: 70,
            backgroundColor: '#1F1F1F',
            marginTop: 10,
            paddingHorizontal: 10,
          },
        ]}>
        <View style={style.rowContent}>
          <CustomImage source={Images.USERPROFILE} />
          <View style={{marginLeft: '5%'}}>
            <CustomText fontSize={13}>{item.studentName}</CustomText>
            <View style={style.rowContent}>
              <Icon name={'email-fast'} color={colors.THEME_BTN} size={15} />
              <CustomText marginLeft={3} fontSize={13}>
                {item.userName}
              </CustomText>
            </View>
            <View style={style.rowContent}>
              <Icon
                name={'whistle-outline'}
                color={colors.THEME_BTN}
                size={15}
              />
              <CustomText marginLeft={3} fontSize={13}>
                {item.sportName}
              </CustomText>
            </View>
          </View>
        </View>
        {isActive === 1 && (
          <View
            style={{
              width: '20%',
            }}>
            {item.bookingStatus === 'Pending' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setId({
                      bookingId: item.bookingId,
                      bookingStatus: 3,
                      coachId: item.coachId,
                    })
                  }>
                  <Icon name={'check-bold'} color={'green'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setId({
                      bookingId: item.bookingId,
                      bookingStatus: 2,
                      coachId: item.coachId,
                    })
                  }>
                  <Icon name={'close-thick'} color={'red'} size={25} />
                </TouchableOpacity>
              </View>
            ) : (
              <CustomText
                fontSize={16}
                alignSelf={'center'}
                color={item.bookingStatus === 'Approve' ? 'green' : 'red'}>
                {item.bookingStatus}
              </CustomText>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };
  const updateBokingStatus = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.updateBookingStatus,
      updatePayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        console.log(data);
        if (data?.statusCode === 200) {
          getBookingsList(isActive);
          Alert.alert(data?.returnMessage[0]);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('upDate_err==>', err);
      });
  };
  const getBookingDetails = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getBookingDetails,
      bookingDetailsPayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          dispatch(addUser({...user, bookingDetails: data.data}));
          setIsModalVisible(true);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('details_err==>', err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <ImageBackground
        style={{flex: 1, backgroundColor: colors.BLACK}}
        source={Images.appBackground}>
        <CustomHeader
          leftIcon={'chevron-left'}
          leftIconClick={() => goBackHandle(navigation)}
          title={true}
          lable={'Booking'}
          rightIcon={true}
        />
        <View
          style={[
            commonStyle.row('95%', 'space-between', 'center'),
            {marginTop: 20},
          ]}>
          {title.map((val, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setIsActive(index)}
                style={{
                  borderBottomWidth: 2,
                  borderColor:
                    isActive === index ? colors.THEME_BTN : '#595959',
                  width: val.width,
                  paddingBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  color={isActive === index ? colors.THEME_BTN : '#6B6B6B'}>
                  {val.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        <FlatList
          data={isBookingsList}
          renderItem={bookingsItemList}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
      <BookingDetails
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
      />
    </SafeAreaView>
  );
}
