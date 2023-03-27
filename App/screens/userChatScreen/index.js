import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
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
import screenString from '../../navigation/screenString';
import {CommonActions} from '@react-navigation/native';
import {FilesPop_Up} from '../../compnents/filesPop_Up/ndex';
export default function UserChatScreen({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [bottomPadding, setBottomPadding] = useState(0);
  const [isMsgList, setIsMsgList] = useState([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState([]);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(null);
  const [url, setUrl] = useState('');
  const [isPlusPressed, setIsPlusPressed] = useState(false);
  const latestChat = useRef(null);
  latestChat.current = isMsgList;
  const msgListPayload = {
    chatId: route?.params?.chatId,
    page: page,
    pageSize: 10,
  };
  const userChatPayload = {
    senderId: user?.user?.userId,
    reciverId: route?.params?.reciverId,
    type: 1,
    file: '',
    audioDuration: '',
  };
  const updateChatPayload = {
    chatId: route?.params?.chatId,
    senderId: user?.user?.userId,
    reciverId: route?.params?.reciverId,
    message: msg,
    file: '',
    audioDuration: '',
    isRead: false,
    type: 1,
    updatedOn: new Date(),
  };
  useEffect(() => {
    global.connect?.on('ReceiveMessage', message => {
      //console.log('useEffect ReceiveMessage==>', message);
      if (message?.chatId === route?.params?.chatId) {
        const updatedChat = [...latestChat.current];
        updatedChat.push(message);
        setIsMsgList(updatedChat);
      }
    });
  }, []);
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
  }, [page]);

  const getMsgList = () => {
    postReq(apiUrl.baseUrl + apiUrl.getChatById, msgListPayload)
      .then(res => {
        if (res?.data?.statusCode === 200) {
          setDataLength(res?.data?.data?.length);
          if (page === 1) setIsMsgList(res?.data?.data);
          else setIsMsgList([...res?.data?.data, ...isMsgList]);
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
    await global.connect
      .invoke('SendMessageSpecificClient', payload)
      .then(response => {
        if (file.length === 0) {
          const updatedChat = [...latestChat.current];
          updatedChat.push(updateChatPayload);
          console.log('updatedChat_Msg==>', updatedChat);
          setIsMsgList(updatedChat);
          return true;
        } else {
          const updatedChat = [...latestChat.current];
          updatedChat.push({
            ...payload,
            chatId: route?.params?.chatId,
            updatedOn: new Date(),
            isRead: false,
          });
          console.log('updatedChat_File==>', updatedChat);
          setIsMsgList(updatedChat);
          return true;
        }
      })
      .catch(err => console.error('submit error==>', err.toString()));
    setMsg('');
  };
  const handleMsgSend = () => {
    if (global.connect) {
      let toptierChatPayload = {...userChatPayload, message: msg};
      if (file.length > 0) {
        let handlerdm = {
          file: file || [],
          message: msg,
        };
        for (const [key, value] of Object.entries(handlerdm)) {
          if (key === 'file') {
            value.map(item => {
              //console.log(item);
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
          {height: 45, marginTop: 10},
        ]}>
        <View style={style.rowContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: screenString.CHATSCREEN}],
                }),
              );
            }}>
            <Icon size={30} name={'chevron-left'} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={style.rowContent}>
            <CustomImage
              style={style.profile}
              source={{uri: route?.params?.profileImage}}
            />
            <View style={{marginLeft: '5%'}}>
              <CustomText>{route?.params?.userName}</CustomText>
              <CustomText fontSize={9}>Active now</CustomText>
            </View>
          </TouchableOpacity>
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
          showsVerticalScrollIndicator={false}
          inverted
          contentContainerStyle={{flexGrow: 1, flexDirection: 'column-reverse'}}
          renderItem={({item, index}) => (
            <UserChatItem {...item} index={index} />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={({distanceFromEnd}) => {
            console.log(distanceFromEnd);
            if (distanceFromEnd > 0) setPage(page + 1);
          }}
          ListHeaderComponent={() => (
            <View style={{alignSelf: 'center', marginBottom: 10}}>
              {dataLength === 0 ? (
                <CustomText color={colors.THEME_BTN}>{''}</CustomText>
              ) : (
                <ActivityIndicator size={'small'} color={colors.WHITE} />
              )}
            </View>
          )}
        />
        {file.length > 0 && (
          <FilesPop_Up file={file} setFile={setFile} setUrl={setUrl} />
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
        height={50}
        multiline={true}
        value={msg}
        onChangeText={txt => setMsg(txt)}
        textColor={colors.BLACK}
        leftComponent={
          <TouchableOpacity
            onPressOut={() => setIsPlusPressed(false)}
            onPress={() => setIsPlusPressed(!isPlusPressed)}
            style={style.plusIcon}>
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
