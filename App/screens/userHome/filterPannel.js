import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../../compnents/customText';
import Back from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../compnents/customButton';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DropDown from '../../compnents/dropDown';
import commonStyle from '../../theme/commonStyle';

export const FilterModal = ({
  modalVisible,
  setModalVisible,
  sliderValue,
  SliderValuesChange,
  sport,
  setSport,
  sportsList,
  priceValue,
  priceValueChange,
  onFilter,
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
            style={{
              alignSelf: 'flex-end',
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
            onPress={() => setModalVisible(false)}>
            <Back name="close" color={colors.THEME_BTN} size={25} />
          </TouchableOpacity>
          <CustomText marginTop={20} alignSelf={'flex-start'}>
            Radius
          </CustomText>
          <View
            style={[
              commonStyle.row('100%', 'space-between', 'center'),
              {marginTop: 5},
            ]}>
            <MultiSlider
              values={[sliderValue]}
              sliderLength={200}
              onValuesChange={SliderValuesChange}
              min={10}
              max={90}
              step={1}
              snapped={true}
              enabledTwo={true}
              containerStyle={{
                height: 30,
                width: '100%',
                marginLeft: '6.5%',
              }}
            />
            <CustomText textAlign={'right'}>{sliderValue}</CustomText>
          </View>
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
          <CustomText marginTop={20} alignSelf={'flex-start'}>
            Price Range
          </CustomText>
          <View style={styles.sliderValue}>
            <CustomText textAlign={'center'}>{priceValue[0]}</CustomText>
            <CustomText textAlign={'center'}>To</CustomText>
            <CustomText textAlign={'center'}>{priceValue[1]}</CustomText>
          </View>
          <View style={{alignSelf: 'center', marginTop: 10}}>
            <MultiSlider
              values={[priceValue[0], priceValue[1]]}
              sliderLength={230}
              onValuesChange={priceValueChange}
              min={0}
              max={500}
              step={5}
              allowOverlap={true}
              snapped={true}
              containerStyle={{
                height: 30,
                width: '100%',
              }}
            />
          </View>
          <CustomButton
            width="50%"
            marginTop={50}
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
  sliderValue: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%',
  },
  bttn: {
    margin: 20,
    width: '90%',
  },
});
