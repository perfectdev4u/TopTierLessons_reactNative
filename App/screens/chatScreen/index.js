import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import {View, FlatList, SafeAreaView, ImageBackground} from 'react-native';
import colors from '../../theme/colors';
import Images from '../../assets/Images';
import style from './style';
import ChatListItem from '../../compnents/chatListItem';
export default function ChatScreen({navigation}) {
  const chatlist = [
    {
      profilePic: Images.USERPROFILE,
      name: 'Martin',
      msgTime: '2 hours ago',
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
    {
      profilePic: Images.USERPROFILE,
      name: 'Martin',
      mstTime: '1 hours ago',
      isActive: true,
      msg: 'Hi how are you ?',
    },
    {
      profilePic: Images.USERPROFILE,
      name: 'Martin',
      mstTime: '1 hours ago',
      isActive: false,
      msg: 'Hi how are you ?',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Messages'}
        rightIcon={true}
        chat={false}
      />
      <View style={style.divider} />
      <ImageBackground
        source={Images.appBackground}
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
        }}>
        <FlatList
          data={chatlist}
          renderItem={({item}) => (
            <ChatListItem {...item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
