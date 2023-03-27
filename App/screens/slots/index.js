import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {View, TouchableOpacity, Alert} from 'react-native';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import style from './style';
import {AddSlot} from '../../compnents/addSlots';
import moment from 'moment';
import {goBackHandle} from '../../utils/constants';

export default function Slots({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [slotList, setSlotList] = useState([]);
  const [slotId, setSlotId] = useState(null);
  const [type, setType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [group, setGroup] = useState('Age Group');
  const [slotDate, setSlotDate] = useState('');
  const [weekDays, setWeekDays] = useState([]);
  const title = [
    {name: 'Recuring', width: '50%'},
    {name: 'Weekly', width: '50%'},
  ];
  useEffect(() => {
    getAllTimeSlots();
  }, [isActive]);
  useEffect(() => {
    if (type === 'delete') deleteSlot();
    else if (type === 'edit') getSlotInfo();
    else null;
  }, [slotId, type]);
  const timeSlotsPayload = {
    isRecurring: isActive === 0 ? true : false,
    page: 1,
    pageSize: 20,
  };
  const slotIdPayload = {
    slotId: slotId,
  };
  const addSlotPayload = {
    isRecurring: isActive === 0 ? true : false,
    slotDate: slotDate,
    fromTime: startTime,
    toTime: endTime,
    ageGroup: group === 'Under Eleven' ? 1 : 2,
    weekDays: isActive === 0 ? weekDays : null,
  };
  const updateSlotPayload = {
    coachId: user?.user?.userId,
    slotId: slotId,
    fromTime: startTime,
    toTime: endTime,
    weekDays: isActive === 0 ? weekDays : null,
    ageGroup: group === 'Under Eleven' ? 1 : 2,
    slotDate: slotDate,
  };
  const getAllTimeSlots = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getAllTimeSlots,
      timeSlotsPayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        // console.log("All Slots==>",res?.data?.data);
        setSlotList(res?.data?.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('slots_err==>', err);
      });
  };
  const getDayName = day => {
    if (day === '1') return 'Mon';
    else if (day === '2') return 'Tue';
    else if (day === '3') return 'Wed';
    else if (day === '4') return 'Thu';
    else if (day === '5') return 'Fri';
    else if (day === '6') return 'Sat';
    else if (day === '7') return 'Sun';
  };
  const isValidSlot = () => {
    if (!startTime) return Alert.alert('Please select start time.');
    else if (!endTime) return Alert.alert('Please select end time.');
    else if (group === 'Age Group')
      return Alert.alert('Please select Age group.');
    else return true;
  };
  const handleAddSlot = () => {
    if (isValidSlot()) {
      setIsLoading(true);
      postReq(
        apiUrl.baseUrl + apiUrl.addSlot,
        addSlotPayload,
        user?.access_token,
      )
        .then(res => {
          if (res?.data?.statusCode === 200) {
            Alert.alert(res?.data?.returnMessage[0]);
            setIsLoading(false);
            setIsModalVisible(false);
            getAllTimeSlots();
            console.log('Addslot==>', res?.data);
          }
        })
        .catch(err => {
          Alert.alert(err?.returnMessage[0]);
          setIsLoading(false);
          console.log('Addslot_err==>', err);
        });
    } else null;
  };
  const deleteSlot = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.deleteTimeSlot,
      slotIdPayload,
      user?.access_token,
    )
      .then(res => {
        if (res?.data?.statusCode === 200) {
          setIsLoading(false);
          //console.log('slot_Delete==>', res?.data);
          getAllTimeSlots();
          Alert.alert(res?.data?.returnMessage[0]);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('delete_err==>', err);
      });
  };
  const getSlotInfo = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getSlotById,
      slotIdPayload,
      user?.access_token,
    )
      .then(res => {
        if (res?.data?.statusCode === 200) {
          setIsLoading(false);
          console.log('slotInfo==>', res?.data);
          setIsModalVisible(true);
          setStartTime(res?.data?.data?.fromTime);
          setEndTime(res?.data?.data?.toTime);
          setGroup(
            res?.data?.data?.ageGroup === 1 ? 'Under Eleven' : 'Above Eleven',
          );
          setSlotDate(moment(res?.data?.data?.slotDate).format('YYYY-MM-DD'));
        }
        setWeekDays(res?.data?.data?.weekDays);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('slotInfo_err==>', err);
      });
  };
  const handleUpdateSlot = () => {
    if (isValidSlot()) {
      setIsLoading(true);
      postReq(
        apiUrl.baseUrl + apiUrl.updateSlot,
        updateSlotPayload,
        user?.access_token,
      )
        .then(res => {
          if (res?.data?.statusCode === 200) {
            Alert.alert(res?.data?.returnMessage[0]);
            setIsLoading(false);
            setIsModalVisible(false);
            getAllTimeSlots();
            console.log('UpdateSlot==>', res?.data);
          }
        })
        .catch(err => {
          Alert.alert(err?.returnMessage[0]);
          setIsLoading(false);
          console.log('UpdateSlot_err==>', err);
        });
    } else null;
  };

  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      {!isLoading && (
        <View style={{flex: 1}}>
          <CustomHeader
            leftIcon={'chevron-left'}
            leftIconClick={() => goBackHandle(navigation)}
            title={true}
            lable={'Slots'}
            rightIcon={true}
          />
          <View
            style={[
              commonStyle.row('95%', 'space-between', 'center'),
              {marginTop: 20, flex: 1},
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
          <CustomButton
            marginTop={30}
            lable={'Add Slot'}
            width={'25%'}
            height={35}
            alignSelf={'flex-end'}
            marginRight={'2.5%'}
            onPress={() => {
              setIsModalVisible(true);
              setType('');
            }}
          />
          {slotList?.length === 0 && (
            <CustomText alignSelf={'center'} marginTop={30} fontSize={20}>
              Not Slots Found!
            </CustomText>
          )}
          {slotList?.map((val, index) => {
            return (
              <View
                key={index}
                style={[
                  commonStyle.row('95%', 'space-between', 'center'),
                  {
                    height: 60,
                    backgroundColor: '#1F1F1F',
                    marginTop: 20,
                    flex: 1,
                  },
                ]}>
                <View style={[style.colomContent]}>
                  <CustomText fontSize={15}>Start Time</CustomText>
                  <CustomText fontSize={12}>{val.fromTime}</CustomText>
                </View>
                <View style={[style.colomContent]}>
                  <CustomText fontSize={15}>End Time</CustomText>
                  <CustomText fontSize={12}>{val.toTime}</CustomText>
                </View>
                <View style={[style.colomContent]}>
                  <CustomText fontSize={15}>Slot day</CustomText>
                  {isActive === 1 && (
                    <CustomText fontSize={12}>
                      {moment(val.slotDate).format('YYYY-MM-DD')}
                    </CustomText>
                  )}
                  {isActive === 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {val?.weekDays?.map((day, index) => {
                        return (
                          <View key={index}>
                            {index <= 2 && (
                              <CustomText fontSize={12}>
                                {getDayName(day)}{' '}
                              </CustomText>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
                <View style={style.rowRight}>
                  <TouchableOpacity
                    onPress={() => {
                      setSlotId(val.slotId);
                      setType('edit');
                    }}>
                    <Icon
                      name={'square-edit-outline'}
                      color={colors.WHITE}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSlotId(val.slotId);
                      setType('delete');
                    }}>
                    <Icon name={'delete'} color={colors.WHITE} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
      <AddSlot
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        title={type === 'edit' ? 'Edit Booking Slot' : 'Add Booking Slot'}
        isRecuring={isActive === 1 ? true : false}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        group={group}
        setGroup={setGroup}
        slotDate={slotDate}
        setSlotDate={setSlotDate}
        weekDays={weekDays}
        setWeekDays={setWeekDays}
        handleSubmitSlot={type === 'edit' ? handleUpdateSlot : handleAddSlot}
      />
    </ContainerBgImage>
  );
}
