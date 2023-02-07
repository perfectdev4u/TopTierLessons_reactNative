import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import {View, FlatList, TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import Images from '../../assets/Images';
import CustomText from '../../compnents/customText';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyle from '../../theme/commonStyle';
import style from './style';
import CustomImage from '../../compnents/customImage';
export default function ChatScreen({navigation}) {
  const chatlist = [
    {
      profilePic: Images.USERPROFILE,
      name: 'Martin',
      mstTime: '2 hours ago',
      isActive: true,
      msg: 'Hi how are you ?',
    },
    {
      profilePic: Images.USERPROFILE,
      name: 'Emma',
      mstTime: '3 hours ago',
      isActive: false,
      msg: 'Hello',
    },
    {
      profilePic: Images.USERPROFILE,
      name: 'Martin',
      mstTime: '1 hours ago',
      isActive: true,
      msg: 'Hi how are you ?',
    },
  ];
  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Messages'}
        rightIcon={true}
        chat={false}
      />
      <View style={style.divider} />

      {chatlist.map((val, index) => {
        return (
          <TouchableOpacity
            key={index}
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
              <CustomImage source={val.profilePic} />
              <View style={{marginLeft: 10}}>
                <View style={style.rowContent}>
                  <CustomText fontSize={13} fontWeight={'500'}>
                    {val.name}
                  </CustomText>
                  <CustomText marginLeft={'5%'} fontSize={9}>
                    {val.mstTime}
                  </CustomText>
                </View>
                <CustomText color={colors.THEME_BTN} fontWeight={'600'}>
                  {val.msg}
                </CustomText>
              </View>
            </View>
            <View
              style={{
                backgroundColor: val.isActive ? colors.THEME_BTN : colors.WHITE,
                height: 12,
                width: 12,
                borderRadius: 12,
                marginRight: '5%',
              }}></View>
          </TouchableOpacity>
        );
      })}
    </ContainerBgImage>
  );
}
