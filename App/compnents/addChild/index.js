import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomInput from '../CustomInput';
import DropDown from '../dropDown';
import CustomButton from '../customButton';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
export const AddChild = ({
  setModalVisible,
  title,
  bttnTitle,
  name,
  setName,
  address,
  setAddress,
  dateOfBirth,
  setDateOfBirth,
  skill,
  setSkill,
  handleBttn,
}) => {
  const [open, setOpen] = useState(false);
  const [isSkillDropDown, setIsSkillDropDown] = useState(false);
  const SkillType = ['Begginer', 'Intermidate', 'Expert'];
  const handleClosePopup = () => {
    setModalVisible(false);
    setName('');
    setAddress('');
    setDateOfBirth(new Date());
    setSkill('Select Skill');
  };
  return (
    // <Modal
    //   animationType="fade"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={() => {
    //     setModalVisible(false);
    //   }}>
    <SafeAreaView style={styles.centeredView}>
      <View style={styles.card}>
        <View style={styles.header}>
          <CustomText>{title}</CustomText>
          <TouchableOpacity onPress={() => handleClosePopup()}>
            <Icon name={'close'} color={colors.THEME_BTN} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <CustomInput
          marginTop={15}
          borderWidth={1}
          placeholder={'Child Name'}
          value={name}
          onChangeText={name => setName(name)}
        />
        <CustomInput
          editable={false}
          marginTop={20}
          borderWidth={1}
          value={
            dateOfBirth === new Date()
              ? 'Select (D.O.B (YYYY-MM-DD))'
              : `${moment(dateOfBirth).format('YYYY-MM-DD')} - (D.O.B)`
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={{marginRight: 10}}>
              <Icon
                name="calendar-month-outline"
                color={colors.BORDER_COLOR}
                size={25}
              />
            </TouchableOpacity>
          }
        />
        <GooglePlacesAutocomplete
          placeholder="Address"
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
              marginTop: 20,
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
        {open && (
          <DatePicker
            modal
            mode="date"
            open={open}
            date={dateOfBirth}
            onConfirm={date => {
              setDateOfBirth(date);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}

        <DropDown
          marginTop={20}
          isDropDown={isSkillDropDown}
          lable={skill}
          setLable={setSkill}
          onPress={() => setIsSkillDropDown(!isSkillDropDown)}
          isShown={isSkillDropDown}
          onSelect={() => setIsSkillDropDown(!isSkillDropDown)}
          data={SkillType}
        />
        <CustomButton
          marginTop={30}
          marginBottom={20}
          lable={bttnTitle}
          width={'80%'}
          alignSelf={'center'}
          onPress={() => {
            handleClosePopup();
            handleBttn();
          }}
        />
      </View>
    </SafeAreaView>
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
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  divider: {
    backgroundColor: '#595959',
    height: 2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
