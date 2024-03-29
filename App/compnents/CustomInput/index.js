import React from 'react';
import {TextInput, View} from 'react-native';
import colors from '../../theme/colors';

export default function CustomInput({
  width = '90%',
  height = 40,
  borderColor = colors.BORDER_COLOR,
  backgroundColor,
  borderRadius = 0,
  leftComponent,
  rightComponent,
  placeholder = '',
  placeholderTextColor = '#D4D4D4',
  value = '',
  textColor = colors.WHITE,
  marginTop = 0,
  secureTextEntry = false,
  keyboardType = 'default',
  borderWidth = 0,
  borderBottomWidth,
  paddingHorizontal = 0,
  padding = 8,
  onChangeText,
  editable = true,
  multiline = false,
  onPressIn,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        borderColor,
        borderWidth,
        borderBottomWidth,
        backgroundColor,
        borderRadius,
        paddingHorizontal,
        alignSelf: 'center',
        marginTop,
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
          onPressIn={onPressIn && onPressIn}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          cursorColor={colors.WHITE}
          editable={editable}
          value={value}
          multiline={multiline}
          style={{
            flex: 1,
            fontSize: 14,
            color: textColor,
            lineHeight: 18,
            padding,
            fontFamily: 'Gotham Bold',
          }}
        />
      </View>
      {rightComponent && rightComponent}
    </View>
  );
}
