import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';

export default function PasswordEyeIcon({isPasswordShow, onPress}) {
  return (
    <TouchableOpacity onPress={onPress && onPress}>
      <Ionicons
        size={20}
        name={isPasswordShow ? 'eye-outline' : 'eye-off-outline'}
        color={colors.THEME_BTN}
      />
    </TouchableOpacity>
  );
}
