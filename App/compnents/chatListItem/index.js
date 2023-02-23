import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../customImage';
import CustomText from '../customText';
import moment from 'moment';

export default function ChatListItem({
  profileImage,
  userName,
  updatedOn,
  isActive = true,
  lastMessage,
  chatId,
  navigation,
}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenString.USERCHATSCREEN,{chatId:chatId,profileImage:profileImage,userName:userName})}
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
        <CustomImage
          source={{uri: profileImage}}
          style={{height: 50, width: 50, borderRadius: 50, alignSelf: 'center'}}
        />
        <View style={{marginLeft: 10}}>
          <View style={style.rowContent}>
            <CustomText fontSize={13}>{userName}</CustomText>
            <CustomText color={colors.FADED} marginLeft={'10%'} fontSize={10}>
              {moment(updatedOn).format('HH:mm')}
            </CustomText>
          </View>
          <CustomText numberOfLines={1} color={colors.THEME_BTN}>{lastMessage}</CustomText>
        </View>
      </View>
      <View
        style={[
          style.activeDot,
          {backgroundColor: isActive ? colors.THEME_BTN : colors.WHITE},
        ]}></View>
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
  activeDot: {
    height: 12,
    width: 12,
    borderRadius: 12,
    marginRight: '5%',
  },
});
