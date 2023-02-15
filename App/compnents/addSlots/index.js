import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from '../CustomInput';
import DropDown from '../dropDown';
import CustomButton from '../customButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
export const AddSlot = ({
  modalVisible,
  setModalVisible,
  title,
  isRecuring,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  group,
  setGroup,
  slotDate,
  setSlotDate,
  weekDays,
  setWeekDays,
  handleSubmitSlot,
}) => {
  const [isDropdownShow, setIsDropDownShow] = useState(false);
  const ageGroop = ['Under Eleven', 'Above Eleven'];
  const [week_Days, setWeek_Days] = useState([]);
  const [start_Time, setStart_Time] = useState(new Date());
  const [end_Time, setEnd_Time] = useState(new Date());
  const [slot_date, setSlot_Date] = useState(new Date());
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [showSlotDate, setShowSlotDate] = useState(false);
  useEffect(() => {
    setWeek_Days(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  }, []);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowSlotDate(false);
    setSlotDate(moment(currentDate).format('YYYY-MM-DD'));
    setSlot_Date(currentDate);
  };
  const onchangeStartTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowStartTime(false);
    setStartTime(moment(currentTime).format('HH:mm:ss'));
    setStart_Time(currentTime);
  };
  const onchangeEndTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowEndTime(false);
    setEndTime(moment(currentTime).format('HH:mm:ss'));
    setEnd_Time(currentTime);
  };
  const handleClosePopup = () => {
    setModalVisible(false);
    setStartTime('');
    setEndTime('');
    setGroup('Age Group');
    setSlotDate('');
    //setWeekDays([]);
  };
  const getDayNum = day => {
    if (day === 'Mon') return '1';
    else if (day === 'Tue') return '2';
    else if (day === 'Wed') return '3';
    else if (day === 'Thu') return '4';
    else if (day === 'Fri') return '5';
    else if (day === 'Sat') return '6';
    else if (day === 'Sun') return '7';
  };
  const handleAddDay = val => {
    let newIndex = [...val];
    let index = weekDays.findIndex(item => item === val);
    if (index === -1) {
      setWeekDays([...weekDays, newIndex]);
    } else {
      let copy = [...weekDays];
      copy.splice(index, 1);
      setWeekDays(copy);
    }
  };
  console.log(weekDays);

  const setActiveDay = (index, list, setList) => {
    let copy = [...list];
    copy[index]['isSelected'] = copy[index]['isSelected']
      ? !copy[index]['isSelected']
      : true;
    setList(copy);
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
            <CustomText>{title}</CustomText>
            <TouchableOpacity onPress={() => handleClosePopup()}>
              <Icon name={'close'} color={colors.THEME_BTN} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <CustomInput
            width="90%"
            onPressIn={() => setShowStartTime(!showStartTime)}
            placeholder={'Start Time'}
            placeholderTextColor={'rgba(212, 212, 212, 0.7)'}
            editable={false}
            marginTop={20}
            borderWidth={1}
            paddingHorizontal={10}
            borderColor={'rgba(212, 212, 212, 0.7)'}
            rightComponent={
              <Icon
                name={'timer-outline'}
                color={'rgba(212, 212, 212, 0.7)'}
                size={25}
              />
            }
            value={startTime}
          />
          {showStartTime && (
            <DateTimePicker
              value={start_Time}
              style={styles.dateTimePicker}
              mode={'time'}
              is24Hour={true}
              onChange={onchangeStartTime}
            />
          )}
          <CustomInput
            width="90%"
            onPressIn={() => setShowEndTime(!showEndTime)}
            marginTop={20}
            placeholder={'End Time'}
            placeholderTextColor={'rgba(212, 212, 212, 0.7)'}
            editable={false}
            borderWidth={1}
            paddingHorizontal={10}
            borderColor={'rgba(212, 212, 212, 0.7)'}
            rightComponent={
              <Icon
                name={'timer-outline'}
                color={'rgba(212, 212, 212, 0.7)'}
                size={25}
              />
            }
            value={endTime}
          />
          {showEndTime && (
            <DateTimePicker
              value={end_Time}
              style={styles.dateTimePicker}
              mode={'time'}
              is24Hour={true}
              onChange={onchangeEndTime}
            />
          )}
          <DropDown
            width={'90%'}
            paddingHorizontal={15}
            marginTop={20}
            isDropDown={isDropdownShow}
            lable={group}
            setLable={setGroup}
            onPress={() => setIsDropDownShow(!isDropdownShow)}
            isShown={isDropdownShow}
            onSelect={() => setIsDropDownShow(!isDropdownShow)}
            data={ageGroop}
          />

          {isRecuring ? (
            <View>
              <CustomInput
                width="90%"
                onPressIn={() => setShowSlotDate(!showSlotDate)}
                placeholder={'Slot Date'}
                placeholderTextColor={'rgba(212, 212, 212, 0.7)'}
                marginTop={20}
                editable={false}
                borderWidth={1}
                paddingHorizontal={10}
                borderColor={'rgba(212, 212, 212, 0.7)'}
                rightComponent={
                  <Icon
                    name={'calendar-month'}
                    color={'rgba(212, 212, 212, 0.7)'}
                    size={25}
                  />
                }
                value={slotDate}
              />
              {showSlotDate && (
                <DateTimePicker
                  value={slot_date}
                  style={styles.dateTimePicker}
                  mode={'date'}
                  is24Hour={true}
                  onChange={onChangeDate}
                />
              )}
            </View>
          ) : (
            <View style={styles.week_days}>
              <ScrollView horizontal={true}>
                {week_Days.map((val, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        // handleAddDay(val);
                        //setActiveDay(index, week_Days, setWeek_Days);
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <CustomText
                        color={
                          val?.isSelected ? colors.THEME_BTN : colors.WHITE
                        }
                        marginLeft={5}
                        fontSize={14}>
                        {val}
                      </CustomText>
                      <Icon
                        name={'radiobox-marked'}
                        color={
                          val?.isSelected
                            ? colors.THEME_BTN
                            : 'rgba(212, 212, 212, 0.7)'
                        }
                        size={20}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
          <CustomButton
            marginTop={30}
            lable={'Submit'}
            width={'80%'}
            alignSelf={'center'}
            onPress={() => handleSubmitSlot()}
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
    backgroundColor: colors.BLACK,
    borderRadius: 10,
    padding: 10,
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
  dateTimePicker: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  week_days: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
