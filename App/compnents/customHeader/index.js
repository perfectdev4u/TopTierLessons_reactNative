import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import screenString from '../../navigation/screenString';
import {useNavigation} from '@react-navigation/native';
export default function CustomHeader({
  width = '95%',
  height = 60,
  title = false,
  lable,
  rightIcon = false,
  leftIcon,
  leftIconClick,
  chat = true,
}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width,
        height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <TouchableOpacity onPress={leftIconClick && leftIconClick}>
        <Icon size={30} name={leftIcon} color={colors.WHITE} />
      </TouchableOpacity>
      {title && (
        <CustomText fontSize={16}>
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
         {chat&& <TouchableOpacity
            onPress={() => navigation.navigate(screenString.CHATSCREEN)}>
            <Icon size={20} name={'email-send-outline'} color={colors.WHITE} />
          </TouchableOpacity>}
            <TouchableOpacity
              style={{marginLeft: 5}}
              onPress={() => navigation.navigate(screenString.NOTIFICATIONS)}>
              <Icon size={20} name={'bell-badge'} color={colors.WHITE} />
            </TouchableOpacity>
        </View>
      )}
      {!rightIcon && <View />}
    </View>
  );
}
