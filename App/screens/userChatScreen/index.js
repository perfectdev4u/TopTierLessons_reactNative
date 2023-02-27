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
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useSelector} from 'react-redux';
import {HubConnectionBuilder} from '@microsoft/signalr';
export default function UserChatScreen({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);

  // let defaultTypes = {
  //   message: 1,
  //   emoji: 2,
  //   image: 3,
  //   video: 4,
  //   audio: 5,
  // };
  const [bottomPadding, setBottomPadding] = useState(0);
  const [isMsgList, setIsMsgList] = useState([]);
  const [connection, setConnection] = useState();
  const [file, setFile] = useState([]);
  const [msg, setMsg] = useState('');
  const msgListPayload = {
    chatId: route?.params?.chatId,
  };
  const userChatPayload = {
    senderId: user?.user?.userId,
    reciverId: route?.params?.reciverId,
    type: 1,
    file: '',
    audioDuration: '',
  };
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
  useEffect(() => {
    getMsgList();
  }, [user]);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('https://api.toptierlessons.com:4436/chatHub')
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', message => {
            if (message) {
              console.log('ReceiveMessage==>', message);
              const updatedChat = [...isMsgList];
              updatedChat.push(message);
              setIsMsgList(updatedChat);
            }
          });
          connection
            .invoke('GetClientId', user?.user?.userId)
            .then(function (res) {
              console.log('ConnectionId==>', res);
            });
        })
        .catch(error => console.log('connection-err --->', error));
    }
  }, [connection]);

  const getMsgList = () => {
    postReq(apiUrl.baseUrl + apiUrl.getChatById, msgListPayload)
      .then(res => {
        if (res?.data?.statusCode === 200) {
          //console.log(res?.data?.data);
          setIsMsgList(res?.data?.data);
        }
      })
      .catch(err => {
        console.log('_err==>', err);
      });
  };

  const senderHandle = async payload => {
    console.log(payload);
    await connection
      .invoke('SendMessageSpecificClient', payload)
      .then(response => getMsgList())
      .catch(err => console.error('submit error==>', err.toString()));
    setMsg('');
  };
  const handleMsgSend = () => {
    senderHandle({...userChatPayload, message: msg});
  };
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
            style={{
              marginLeft: '5%',
              height: 50,
              width: 50,
              borderRadius: 50,
              alignSelf: 'center',
              //resizeMode:'contain'
            }}
            source={{uri: route?.params?.profileImage}}
          />
          <View style={{marginLeft: '5%'}}>
            <CustomText>{route?.params?.userName}</CustomText>
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
          data={isMsgList}
          renderItem={({item, index}) => <UserChatItem {...item} />}
          showsVerticalScrollIndicator={false}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
        />
      </ImageBackground>
      <CustomInput
        backgroundColor={'#F8EDE6'}
        borderRadius={5}
        placeholder={'Type a message'}
        placeholderTextColor={'rgba(67, 62, 62, 0.5)'}
        paddingHorizontal={10}
        marginBottom={20}
        multiline={true}
        value={msg}
        onChangeText={txt => setMsg(txt)}
        textColor={colors.BLACK}
        leftComponent={
          <TouchableOpacity
            style={{
              backgroundColor: '#FFD0B3',
              borderRadius: 2,
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon size={25} name={'plus'} color={colors.THEME_BTN} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            disabled={!msg || !file ? true : false}
            onPress={handleMsgSend}>
            <Icon size={25} name={'send'} color={colors.THEME_BTN} />
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
