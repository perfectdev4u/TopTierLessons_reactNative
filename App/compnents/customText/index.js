import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';

export default function CustomText({
  children: ChildComponent,
  fontSize = 15,
  fontWeight = 'normal',
  fontFamily = 'Poppins-Regular',
  lineHeight=20,
  color = colors.WHITE,
  marginTop = 0,
  isPressable = false,
  onPress,
  alignSelf,
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
        style={{
          fontSize,
          fontWeight,
          color,
          marginTop,
          fontFamily,
          lineHeight
        }}>
        {ChildComponent}
      </Text>
    </TouchableOpacity>
  );
}
