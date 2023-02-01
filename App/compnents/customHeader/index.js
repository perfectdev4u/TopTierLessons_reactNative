import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function CustomHeader({
  width = '90%',
  height = 40,
  title = false,
  lable,
  rightIcon = false,
}) {
  const {navigate, goBack} = useNavigation();
  return (
    <View
      style={{
        width,
        height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon size={35} name={'chevron-left'} color={colors.WHITE} />
      </TouchableOpacity>
      {title && <CustomText>{lable}</CustomText>}
      {rightIcon && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '10%',
          }}>
          <TouchableOpacity onPress={() => alert('process')}>
            <Icon size={23} name={'email-send-outline'} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => alert('process')}>
            <Icon size={23} name={'bell-badge'} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
