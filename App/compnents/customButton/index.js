import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/Fontisto';

export default function CustomButton({
  width = '90%',
  height = 46,
  backgroundColor = colors.THEME_BTN,
  marginTop = 0,
  borderRadius = 0,
  maxWidth = 400,
  lable = '',
  fontColor = colors.WHITE,
  onPress,
  isLoading = false,
  disabled = false,
  shadowProp = {},
  icon = false,
  name,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
      style={{
        width,
        height,
        backgroundColor,
        marginTop,
        borderRadius,
        maxWidth,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadowProp,
        ...props,
      }}>
      {icon && (
        <Icon
          size={21}
          name={name}
          color={colors.WHITE}
          style={{marginRight: 10}}
        />
      )}
      <CustomText
        color={fontColor}
        fontSize={15}
        lineHeight={22}>
        {lable}
      </CustomText>
    </TouchableOpacity>
  );
}
