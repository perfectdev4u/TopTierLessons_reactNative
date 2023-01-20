import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';

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
      }}>
      <CustomText
        color={fontColor}
        fontSize={15}
        fontWeight="700"
        lineHeight={22}>
        {lable}
      </CustomText>
    </TouchableOpacity>
  );
}
