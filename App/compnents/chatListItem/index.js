import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../customImage';
import CustomText from '../customText';

export default function ChatListItem({
  profilePic,
  name,
  msgTime,
  isActive,
  msg,
  navigation,
}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenString.USERCHATSCREEN)}
      style={[
        commonStyle.row('95%', 'space-between', 'center'),
        {
          height: 70,
          marginTop: 20,
          borderBottomWidth: 2,
          paddingBottom: 20,
          borderColor: '#595959',
        },
      ]}>
      <View style={style.rowContent}>
        <CustomImage source={profilePic} />
        <View style={{marginLeft: 10}}>
          <View style={style.rowContent}>
            <CustomText fontSize={13} fontWeight={'500'}>
              {name}
            </CustomText>
            <CustomText marginLeft={'5%'} fontSize={9}>
              {msgTime}
            </CustomText>
          </View>
          <CustomText color={colors.THEME_BTN} fontWeight={'600'}>
            {msg}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: isActive ? colors.THEME_BTN : colors.WHITE,
          height: 12,
          width: 12,
          borderRadius: 12,
          marginRight: '5%',
        }}></View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  rowContent: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRight: {
    backgroundColor: colors.THEME_BTN,
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 30,
  },
});
