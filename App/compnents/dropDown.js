import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../theme/colors';
import CustomText from './customText';
import Icon from 'react-native-vector-icons/AntDesign';
export default memo(function DropDown({
  width = '90%',
  height = 40,
  borderColor = colors.BORDER_COLOR,
  backgroundColor,
  borderRadius = 0,
  textColor = colors.WHITE,
  marginTop = 0,
  borderWidth = 1,
  paddingHorizontal = 10,
  onPress,
  isDropDown,
  lable,
  setLable,
  isShown,
  data,
  onSelect,
}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress && onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width,
          height,
          borderColor,
          borderWidth,
          backgroundColor,
          borderRadius,
          paddingHorizontal,
          alignSelf: 'center',
          marginTop,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <CustomText color={textColor} fontSize={15} lineHeight={22}>
            {lable}
          </CustomText>
        </View>
        <Icon
          size={15}
          name={isDropDown ? 'caretup' : 'caretdown'}
          color={colors.THEME_BTN}
        />
      </TouchableOpacity>
      {isShown && (
        <View
          style={{
            width,
            marginTop: 10,
            borderRadius,
            backgroundColor: textColor,
            alignSelf: 'center',
            padding: 10,
          }}>
          {data.map((val, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setLable(val);
                onSelect();
              }}>
              <CustomText color={colors.BLACK} fontSize={15} lineHeight={22}>
                {val}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
});
