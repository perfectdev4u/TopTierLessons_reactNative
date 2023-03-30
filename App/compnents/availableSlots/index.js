import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';

const SlotView = ({val, addedSlots, slotsBook, index, date}) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    checkIsActive();
  }, [slotsBook]);
  const checkIsActive = () => {
    let index = slotsBook.findIndex(
      item =>
        new Date(item.date).toDateString() === new Date(date).toDateString() &&
        item.slotId === val.slotId,
    );
    setIsActive(index !== -1);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        addedSlots(val);
      }}
      key={index}
      style={[
        styles.slotsView,
        {
          backgroundColor: isActive ? colors.THEME_BTN : '#717171',
        },
      ]}>
      <CustomText
        fontSize={12}
        fontWeight="400"
        lineHeight={18}
        color={colors.WHITE}
        textAlign={'left'}>
        {val.entry}
      </CustomText>
      <CustomText
        fontSize={12}
        fontWeight="400"
        lineHeight={18}
        color={colors.WHITE}
        textAlign={'left'}>
        {' '}
        to{' '}
      </CustomText>
      <CustomText
        fontSize={12}
        fontWeight="400"
        lineHeight={18}
        color={colors.WHITE}
        textAlign={'left'}>
        {val.exit}
      </CustomText>
    </TouchableOpacity>
  );
};

export const SlotsList = ({Arr, slotsBook, setSlotsBook, date}) => {
  const addedSlots = val => {
    let newObj = {...val, date};
    let index = slotsBook.findIndex(
      item =>
        new Date(item.date).toDateString() ===
          new Date(newObj.date).toDateString() && item.slotId === val.slotId,
    );
    if (index === -1) {
      setSlotsBook([...slotsBook, newObj]);
    } else {
      let copy = [...slotsBook];
      copy.splice(index, 1);
      setSlotsBook(copy);
    }
  };

  return (
    <ScrollView
      style={{marginTop: 10}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {Arr?.map((val, index) => (
        <View key={index}>
          <SlotView
            val={val}
            slotsBook={slotsBook}
            addedSlots={addedSlots}
            index={index}
            date={date}
          />
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  slotsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    padding: 8,
    margin: 3,
  },
});
