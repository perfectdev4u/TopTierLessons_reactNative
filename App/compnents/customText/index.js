import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';

export default function CustomText({
  children: ChildComponent,
  fontSize = 15,
  fontWeight = '400',
  fontFamily = 'Poppins-Regular',
  lineHeight = 20,
  color = colors.WHITE,
  marginTop = 0,
  isPressable = false,
  onPress,
  alignSelf,
  ...props
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      disabled={!isPressable}
      onPress={onPress && onPress}
      style={{
        alignSelf,
      }}>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          fontSize,
          fontWeight,
          color,
          marginTop,
          fontFamily,
          lineHeight,
          ...props,
        }}>
        {ChildComponent}
      </Text>
    </TouchableOpacity>
  );
}
