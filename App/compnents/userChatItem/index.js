import React from 'react';
import {View} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';

export default function UserChatItem({isSender, message, time}) {
  return (
    <View
      style={{
        flexDirection: isSender ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
      }}>
      <View
        style={{
          marginLeft: isSender ? 10 : 0,
          marginRight: isSender ? 0 : 10,
        }}>
        <View
          style={{
            backgroundColor: isSender ? colors.THEME_BTN : '#161616',
            paddingHorizontal: 20,
            marginTop: 5,
            borderTopStartRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
          }}>
          <CustomText alignSelf={'center'}>{message}</CustomText>
        </View>
        <CustomText
          fontSize={10}
          color="rgba(255, 255, 255, 0.5)"
          alignSelf={isSender ? 'flex-end' : 'flex-start'}>
          {time}
        </CustomText>
      </View>
    </View>
  );
}
