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
import {TextInputMask} from 'react-native-masked-text';
import CustomButton from '../customButton';

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
  addSlot,
}) => {
  const [isDropdownShow, setIsDropDownShow] = useState(false);
  const ageGroop = ['Under Eleven', 'Above Eleven'];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            backgroundColor: colors.BLACK,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <CustomText>{title}</CustomText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name={'close'} color={colors.THEME_BTN} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <CustomInput
            width="90%"
            marginTop={20}
            borderWidth={1}
            paddingHorizontal={10}
            borderColor={'rgba(212, 212, 212, 0.7)'}
            placeholder={'Start Time'}
            placeholderTextColor={'rgba(212, 212, 212, 0.7)'}
            keyboardType={'numeric'}
            rightComponent={
              <Icon
                name={'timer-outline'}
                color={'rgba(212, 212, 212, 0.7)'}
                size={25}
              />
            }
            value={startTime}
            onChangeText={txt => setStartTime(txt)}
          />
          <CustomInput
            width="90%"
            marginTop={20}
            borderWidth={1}
            paddingHorizontal={10}
            borderColor={'rgba(212, 212, 212, 0.7)'}
            placeholder={'End Time'}
            placeholderTextColor={'rgba(212, 212, 212, 0.7)'}
            keyboardType={'numeric'}
            rightComponent={
              <Icon
                name={'timer-outline'}
                color={'rgba(212, 212, 212, 0.7)'}
                size={25}
              />
            }
            value={endTime}
            onChangeText={txt => setEndTime(txt)}
          />
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
            <TextInputMask
              type={'datetime'}
              placeholder={'Slot Date (DD/MM/YYYY)'}
              placeholderTextColor={'rgba(212, 212, 212, 0.7)'}
              options={{
                format: 'YYYY-MM-DD',
              }}
              value={slotDate}
              onChangeText={txt => setSlotDate(txt)}
              style={styles.slotDateInput}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 20,
                width: '90%',
                alignSelf: 'center',
              }}>
              <ScrollView horizontal={true}>
                {weekDays.map((val, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <CustomText marginLeft={5} fontSize={14}>
                        {val}
                      </CustomText>
                      <Icon
                        name={'radiobox-marked'}
                        color={'rgba(212, 212, 212, 0.7)'}
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
            onPress={() => addSlot()}
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
  divider: {
    backgroundColor: '#595959',
    height: 2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  slotDateInput: {
    borderWidth: 1,
    borderColor: 'rgba(212, 212, 212, 0.7)',
    width: '90%',
    alignSelf: 'center',
    height: 40,
    fontSize: 14,
    color: colors.WHITE,
    fontWeight: '400',
    paddingHorizontal: 12,
    fontFamily: 'Gotham Bold',
    marginTop: 20,
  },
});
