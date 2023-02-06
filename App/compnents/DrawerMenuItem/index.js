import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../customText';
import colors from '../../theme/colors';

export default memo(function DrawerMenuItem({onPress, isActive, icon, label}) {
  return (
    <TouchableOpacity
      style={{
        marginTop: 5,
      }}
      onPress={onPress && onPress}>
      <View
        style={{
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: isActive ? colors.THEME_BTN : 'transparent',
          borderRadius: 10,
        }}>
        <Icon
          name={icon}
          color={isActive ? colors.WHITE : colors.FADED}
          size={20}
        />
        <CustomText
          color={isActive ? colors.WHITE : colors.FADED}
          fontSize={14}
          marginLeft={15}>
          {label}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
});
