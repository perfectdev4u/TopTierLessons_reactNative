import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import {View, Alert} from 'react-native';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import CalendarPicker from 'react-native-calendar-picker';
import ContainerBgImage from '../../compnents/containerBackground';
import {useSelector} from 'react-redux';
import style from './style';
import {SlotsList} from '../../compnents/availableSlots';
import CustomButton from '../../compnents/customButton';
import DropDown from '../../compnents/dropDown';
import screenString from '../../navigation/screenString';

export default function DateTime({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [slotsBook, setSlotsBook] = useState([]);
  const [isRecurring, setIsRecurring] = useState('Select Slots Type');
  const [isTypeDropdown, setIsTypeDropdown] = useState(false);
  const type = ['Reccuring', 'Weekly'];
  const availabilityPayload = {
    coachId: 4,
    date: date,
    isRecurring: isRecurring === 'Reccuring' ? true : false,
  };
  const availabilityHandle = date => {
    setDate(date);
    if (isRecurring === 'Select Slots Type')
      Alert.alert('you have to select slot type');
    else {
      setIsLoading(true);
      postReq(
        apiUrl.baseUrl + apiUrl.checkAvailability,
        availabilityPayload,
        user?.access_token,
      )
        .then(res => {
          setIsLoading(false);
          if (res?.data?.statusCode === 200) {
            console.log('Slotsss==>', res?.data.data);
            setSlots(res?.data?.data);
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('Slot_err==>', err);
        });
    }
  };
  const onNext = () => {
    if (slotsBook.length == 0) {
      Alert.alert('you have to select time slot.');
    } else {
      navigation.navigate(screenString.CREATEBOOKING, {
        id: 4,
        slotsBooked: slotsBook,
      });
    }
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Select Date And Time'}
        rightIcon={true}
      />
      <View style={{paddingHorizontal: '5%', flex: 1}}>
        <CustomText marginTop={20} fontSize={20} lineHeight={25}>
          Availability
        </CustomText>
        <DropDown
          width={'100%'}
          marginTop={20}
          isDropDown={isTypeDropdown}
          lable={isRecurring}
          setLable={setIsRecurring}
          onPress={() => setIsTypeDropdown(!isTypeDropdown)}
          isShown={isTypeDropdown}
          data={type}
          onSelect={() => setIsTypeDropdown(!isTypeDropdown)}
        />
        <View style={style.calenderContainer}>
          <CalendarPicker
            selectedStartDate={date}
            selectedDayColor={colors.THEME_BTN}
            selectedDayTextColor={colors.WHITE}
            onDateChange={date => availabilityHandle(date)}
            previousComponent={
              <Icon name="chevron-left" size={30} color={colors.THEME_BTN} />
            }
            nextComponent={
              <Icon name="chevron-right" size={30} color={colors.THEME_BTN} />
            }
          />
        </View>

        {!isLoading && (
          <View style={{marginTop: 30}}>
            {slots === null ? (
              <CustomText
                fontSize={20}
                color={colors.THEME_BTN}
                alignSelf={'center'}>
                No Time Slots Found!
              </CustomText>
            ) : (
              <SlotsList
                Arr={slots}
                slotsBook={slotsBook}
                setSlotsBook={setSlotsBook}
                date={date}
              />
            )}
          </View>
        )}
      </View>
      {!isLoading && (
        <CustomButton
          marginTop={100}
          alignSelf={'center'}
          lable={'Next'}
          onPress={() => onNext()}
        />
      )}
    </ContainerBgImage>
  );
}
