import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../customImage';
import CustomText from '../customText';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultpic } from '../../utils/constants';

export default function ChatListItem({
  profileImage,
  name,
  updatedOn,
  isActive = true,
  lastMessage,
  chatId,
  reciverId,
  senderId,
  navigation,
}) {
  const {user} = useSelector(state => state.authReducer);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screenString.USERCHATSCREEN, {
          chatId: chatId,
          profileImage: profileImage ? profileImage : defaultpic,
          userName: name,
          reciverId: user?.user?.userId === reciverId ? senderId : reciverId,
        })
      }
      style={[
        commonStyle.row('95%', 'space-between', 'center'),
        {
          height: 70,
          marginTop: 10,
          borderBottomWidth: 2,
          paddingBottom: 10,
          borderColor: '#595959',
        },
      ]}>
      <View style={style.rowContent}>
        <CustomImage
          source={{uri: profileImage ? profileImage : defaultpic}}
          style={{height: 50, width: 50, borderRadius: 50, alignSelf: 'center'}}
        />
        <View style={{marginLeft: 10, width: '70%'}}>
          <View style={style.rowContent}>
            <CustomText numberOfLines={1} fontSize={13}>
              {name}
            </CustomText>
            <CustomText color={colors.FADED} marginLeft={'10%'} fontSize={10}>
              {moment(updatedOn).format('HH:mm')}
            </CustomText>
          </View>
          {lastMessage ? (
            <CustomText numberOfLines={1} color={colors.THEME_BTN}>
              {lastMessage}
            </CustomText>
          ) : (
            <Icon name={'file-image'} color={colors.THEME_BTN} size={25} />
          )}
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
