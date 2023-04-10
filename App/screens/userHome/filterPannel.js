import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../../compnents/customText';
import Back from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../compnents/customButton';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DropDown from '../../compnents/dropDown';

export const FilterModal = ({
  modalVisible,
  setModalVisible,
  onFilter,
  sport,
  setSport,
  sportsList,
}) => {
  const [isSportsDropDown, setIsSportsDropDown] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setModalVisible(false)}>
            <Back name="close" color={colors.THEME_BTN} size={25} />
          </TouchableOpacity>
          <DropDown
            width="100%"
            marginTop={20}
            isDropDown={isSportsDropDown}
            lable={sport.name}
            setLable={setSport}
            onPress={() => setIsSportsDropDown(!isSportsDropDown)}
            isShown={false}
          />
          {isSportsDropDown && (
            <View
              style={{
                width: '100%',
                marginTop: 10,
                backgroundColor: colors.WHITE,
                alignSelf: 'center',
                padding: 10,
              }}>
              {sportsList?.map((val, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSport({name: val.sportName, id: val.sportId});
                      setIsSportsDropDown(!isSportsDropDown);
                    }}>
                    <CustomText
                      color={colors.BLACK}
                      fontSize={15}
                      lineHeight={22}>
                      {val.sportName}
                    </CustomText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <CustomButton
            width="50%"
            marginTop={30}
            onPress={onFilter}
            lable="Filter"
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
    backgroundColor: '#0008',
  },
  modalView: {
    backgroundColor: '#1F1F1F',
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.THEME_BTN,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  bttn: {
    margin: 20,
    width: '90%',
  },
});
