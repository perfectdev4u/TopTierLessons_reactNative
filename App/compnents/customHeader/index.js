import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomHeader({
  width = '95%',
  height = 40,
  title = false,
  lable,
  rightIcon = false,
  leftIcon,
  leftIconClick,
}) {
  return (
    <View
      style={{
        width,
        height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
      }}>
      <TouchableOpacity onPress={leftIconClick && leftIconClick}>
        <Icon size={30} name={leftIcon} color={colors.WHITE} />
      </TouchableOpacity>
      {title && (
        <CustomText fontSize={16} fontWeight={'500'}>
          {lable}
        </CustomText>
      )}
      {rightIcon && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => alert('process')}>
            <Icon size={20} name={'email-send-outline'} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('process')}>
            <Icon size={20} name={'bell-badge'} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
