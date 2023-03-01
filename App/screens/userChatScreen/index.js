import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  ScrollView,
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
import {postReq, profileImageReq} from '../../api';
import {audioFormat, videoFormat, imgFormat} from '../../utils/constants';
import {openCamera, launchGallery} from '../../compnents/imageUpload';
import {useSelector} from 'react-redux';
import {HubConnectionBuilder} from '@microsoft/signalr';
import screenString from '../../navigation/screenString';
import {CommonActions} from '@react-navigation/native';
export default function UserChatScreen({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [bottomPadding, setBottomPadding] = useState(0);
  const [isMsgList, setIsMsgList] = useState([]);
  const [connection, setConnection] = useState();
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState([]);
  console.log('file=>', file.length);
  const [isPlusPressed, setIsPlusPressed] = useState(false);
  const latestChat = useRef(null);
  latestChat.current = isMsgList;
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
              if (message?.chatId === route?.params?.chatId) {
                const updatedChat = [...latestChat.current];
                updatedChat.push(message);
                setIsMsgList(updatedChat);
              } else null;
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
  const getFile = async url => {
    let fileUpload = new FormData();
    fileUpload.append('file', {
      name: url.fileName || url.name,
      type: url.type,
      uri: Platform.OS === 'ios' ? url.uri.replace('file://', '') : url.uri,
    });
    profileImageReq(
      apiUrl.baseUrl + apiUrl.uploadFile,
      fileUpload,
      user?.access_token,
    )
      .then(({data}) => {
        if (data?.statusCode === 200) {
          console.log(data?.data?.url);
          setFile([...file, data?.data?.url]);
        } else Alert.alert('Something went wrong');
      })
      .catch(err => {
        console.log('error==>', err);
        Alert.alert('Something went wrong');
      });
  };
  const senderHandle = async payload => {
    await connection
      .invoke('SendMessageSpecificClient', payload)
      .then(response => getMsgList())
      .catch(err => console.error('submit error==>', err.toString()));
    setMsg('');
  };
  const handleMsgSend = () => {
    if (connection) {
      let toptierChatPayload = {...userChatPayload, message: msg};
      if (file.length > 0) {
        let handlerdm = {
          file: file || [],
          message: msg,
        };
        for (const [key, value] of Object.entries(handlerdm)) {
          if (key === 'file') {
            value.map(item => {
              // promiseArr.push(apiCall(item.file));
              console.log(item);
              senderHandle(item);
              let res = item.split('.');
              let resIndex = res.length - 1;
              let exten = res[resIndex];
              if (imgFormat.includes(exten)) {
                toptierChatPayload = {
                  ...toptierChatPayload,
                  file: item,
                  type: 3,
                  message: '',
                };
                senderHandle(toptierChatPayload);
              } else if (audioFormat.includes(exten)) {
                toptierChatPayload = {
                  ...toptierChatPayload,
                  file: item,
                  type: 5,
                  message: '',
                };
                senderHandle(toptierChatPayload);
              } else if (videoFormat.includes(exten)) {
                toptierChatPayload = {
                  ...toptierChatPayload,
                  file: item,
                  type: 4,
                  message: '',
                };
                senderHandle(toptierChatPayload);
              }
            });
            setFile([]);
          }
          if (key === 'message') {
            senderHandle({...userChatPayload, [key]: value});
          }
        }
      } else senderHandle({...userChatPayload, message: msg});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <View
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {height: 45},
        ]}>
        <View style={style.rowContent}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: screenString.CHATSCREEN}],
                }),
              )
            }>
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
          renderItem={({item, index}) => (
            <UserChatItem {...item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
        />
        {file.length > 0 && (
          <View
            style={[
              commonStyle.row('100%', 'flex-start', 'center'),
              {
                backgroundColor: '#0008',
                padding: 15,
                position: 'absolute',
                zIndex: 1,
                bottom: 5,
              },
            ]}>
            <ScrollView
              style={{flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {file.map((url, index) => {
                console.log('url==>', url);
                return (
                  <View
                    style={{
                      backgroundColor: '#ebcc91',
                      height: 130,
                      width: 130,
                      marginLeft: 5,
                      padding: 15,
                    }}
                    key={index}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        zIndex: 1,
                        // top: 2,
                        // right: 2,
                      }}>
                      <Icon
                        name={'x-circle'}
                        size={20}
                        color={colors.THEME_BTN}
                      />
                    </TouchableOpacity>
                    <CustomImage
                      source={{uri: url}}
                      style={{
                        height: 100,
                        width: 100,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
        {isPlusPressed && (
          <View
            style={[
              commonStyle.row('100%', 'space-around', 'center'),
              {
                backgroundColor: '#1F1F1F',
                padding: 15,
                position: 'absolute',
                zIndex: 1,
                bottom: 5,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setIsPlusPressed(false);
                openCamera(getFile);
              }}
              style={{alignItems: 'center'}}>
              <Icon name="camera" color={colors.THEME_BTN} size={30} />
              <CustomText fontSize={10}>Camera</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsPlusPressed(false);
                launchGallery(getFile);
              }}
              style={{alignItems: 'center'}}>
              <Icon name="image" color={colors.THEME_BTN} size={30} />
              <CustomText fontSize={10}>Gallery</CustomText>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>

      <CustomInput
        width="95%"
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
            onPressOut={() => setIsPlusPressed(false)}
            onPress={() => setIsPlusPressed(!isPlusPressed)}
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
            disabled={!msg && file.length === 0 ? true : false}
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
