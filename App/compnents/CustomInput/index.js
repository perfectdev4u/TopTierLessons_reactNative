import React from 'react';
import {TextInput, View} from 'react-native';
import colors from '../../theme/colors';

export default function CustomInput({
  width = '90%',
  height = 35,
  borderColor = colors.BORDER_COLOR,
  backgroundColor,
  borderRadius = 0,
  leftComponent,
  rightComponent,
  placeholder = '',
  value="",
  textColor = colors.WHITE,
  marginTop = 0,
  secureTextEntry = false,
  keyboardType = 'default',
  borderWidth = 0,
  borderBottomWidth = 0,
  paddingHorizontal = 0,
  onChangeText,
}) {
  return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width,
          height,
          borderColor,
          borderWidth,
          borderBottomWidth,
          backgroundColor,
          borderRadius,
          paddingHorizontal,
          alignSelf: 'center',
          marginTop
        }}>
        {leftComponent && leftComponent}
        <View
          style={{
            flex: 1,
            marginLeft: leftComponent ? 10 : 0,
            marginRight: rightComponent ? 10 : 0,
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#D4D4D4'}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            cursorColor={colors.WHITE}
            value={value}
            style={{
              flex: 1,
              fontSize: 14,
              color: textColor,
              fontWeight: '400',
              lineHeight: 22,
              paddingBottom: 8,
              fontFamily: 'Poppins-Regular',
            }}
          />
        </View>
        {rightComponent && rightComponent}
      </View>
  );
}
