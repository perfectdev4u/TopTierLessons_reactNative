import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import colors from '../../theme/colors';
import Images from '../../assets/Images';
import CustomText from '../../compnents/customText';
import UserChatItem from '../../compnents/userChatItem';
import commonStyle from '../../theme/commonStyle';
import Icon from 'react-native-vector-icons/Feather';
import style from './style';
import CustomImage from '../../compnents/customImage';
import CustomInput from '../../compnents/CustomInput';
export default function UserChatScreen({navigation}) {
  const [bottomPadding, setBottomPadding] = useState(0);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    let keyboardWillShow;
    let keyboardWillHide;
    keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      ({endCoordinates: {height}}) => {
        setBottomPadding(height);
      },
    );
    keyboardWillHide = Keyboard.addListener('keyboardWillHide', () =>
      setBottomPadding(0),
    );
    return () => {
      if (keyboardWillShow) keyboardWillShow.remove();
      if (keyboardWillHide) keyboardWillHide.remove();
    };
  }, []);
  const chatData = [
    {
      isSender: false,
      message: 'Hi',
      time: '10:03 Am',
    },
    {
      isSender: true,
      message: 'Hi',
      time: '10:13 Am',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <View
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {height: 45},
        ]}>
        <View style={style.rowContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon size={30} name={'chevron-left'} color={colors.WHITE} />
          </TouchableOpacity>
          <CustomImage
            style={{marginLeft: '10%'}}
            source={Images.USERPROFILE}
          />
          <View style={{marginLeft: '5%'}}>
            <CustomText>Martin</CustomText>
            <CustomText fontSize={9}>Active now</CustomText>
          </View>
        </View>
        <TouchableOpacity onPress={() => alert('in process')}>
          <Icon size={30} name={'more-horizontal'} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
      <View style={style.divider} />
      <ImageBackground
        source={Images.appBackground}
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
        }}>
        <FlatList
          data={chatData}
          renderItem={({item}) => <UserChatItem {...item} />}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
      <CustomInput
        backgroundColor={'#F8EDE6'}
        borderRadius={5}
        placeholder={'Type a message'}
        placeholderTextColor={'rgba(67, 62, 62, 0.5)'}
        paddingHorizontal={10}
        multiline={true}
        value={msg}
        onChangeText={txt => setMsg(txt)}
        textColor={colors.BLACK}
        leftComponent={
          <TouchableOpacity
            style={{
              backgroundColor: '#FFD0B3',
              borderRadius: 2,
              height: 25,
              width: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon size={20} name={'plus'} color={colors.THEME_BTN} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity>
            <Icon size={20} name={'send'} color={colors.THEME_BTN} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          height: bottomPadding,
        }}
      />
    </SafeAreaView>
  );
}
