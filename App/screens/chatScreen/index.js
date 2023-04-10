import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import {
  View,
  FlatList,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import colors from '../../theme/colors';
import Images from '../../assets/Images';
import style from './style';
import ChatListItem from '../../compnents/chatListItem';
import {defaultpic, goBackHandle} from '../../utils/constants';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useSelector} from 'react-redux';
import CustomText from '../../compnents/customText';
import CustomImage from '../../compnents/customImage';
import screenString from '../../navigation/screenString';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HubConnectionBuilder} from '@microsoft/signalr';
export default function ChatScreen({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [connection, setConnection] = useState();
  const [userMenuShow, setUserMenuShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const inboxPayload = {
    userId: user?.user?.userId,
    page: page,
    pageSize: 10,
  };
  useEffect(() => {
    getUsersList();
    if (page) getInbox();
  }, [user, page]);
  useEffect(() => {
    global.connect = new HubConnectionBuilder()
      .withUrl('https://api.toptierlessons.com:4436/chatHub')
      .withAutomaticReconnect()
      .build();
    setConnection(global.connect);
  }, []);
  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        connection.on('ReceiveMessage', message => {
          if (message) {
            console.log('ReceiveMessage==>', message);
            getInbox();
          }
        });
        connection
          .invoke('GetClientId', user?.user?.userId)
          .then(response => {
            console.log('ConnectionId==>', response);
          })
          .catch(error => console.log('connection-err --->', error));
      });
    }
  }, [connection]);
  const getUsersList = () => {
    setLoading(true);
    postReq(apiUrl.baseUrl + apiUrl.getBookingUser, null, user?.access_token)
      .then(res => {
        setLoading(false);
        if (res?.data?.statusCode === 200) {
          setUserList(res?.data?.data);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('_err==>', err);
      });
  };
  const getInbox = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getChatInbox,
      inboxPayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200) {
          setDataLength(res?.data?.data?.length);
          if (page === 1) setChatList(res?.data?.data);
          else setChatList([...chatList, ...res?.data?.data]);
          // console.log(res?.data?.data);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('_err==>', err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => goBackHandle(navigation)}
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
        <TouchableOpacity
          onPress={() => setUserMenuShow(!userMenuShow)}
          style={style.userMenuIcon}>
          <Icon
            name={'account-multiple-plus-outline'}
            color={colors.WHITE}
            size={35}
          />
        </TouchableOpacity>
        <FlatList
          data={chatList}
          style={{marginTop: 20}}
          renderItem={({item}) => (
            <ChatListItem {...item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={({distanceFromEnd}) => {
            console.log(distanceFromEnd);
            if (distanceFromEnd > 0) setPage(page + 1);
          }}
          ListEmptyComponent={() =>
            !isLoading && (
              <CustomText
                marginTop={50}
                alignSelf={'center'}
                color={colors.THEME_BTN}>
                No Chat yet!
              </CustomText>
            )
          }
        />
        {userMenuShow && (
          <View
            style={{
              position: 'absolute',
              width: '80%',
              height: userList?.length >= 8 ? 300 : 200,
              top: 70,
              right: 20,
              zIndex: 100,
              backgroundColor: '#464747',
              padding: 10,
              paddingVertical: 20,
            }}>
            <CustomText marginBottom={10} color={colors.THEME_BTN}>
              {user?.user?.userType === 2
                ? 'Booked Students'
                : 'Booked Coaches'}
            </CustomText>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {loading ? (
                <View style={{alignSelf: 'center', marginTop: 60}}>
                  <ActivityIndicator color={'white'} size={'large'} />
                </View>
              ) : (
                <View style={{alignSelf: 'center'}}>
                  {userList.length === 0 && (
                    <CustomText marginTop={50}>
                      {user?.user?.userType === 2
                        ? 'No Students found!'
                        : 'No Coaches found!'}
                    </CustomText>
                  )}
                </View>
              )}
              {!loading && (
                <View>
                  {userList.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setUserMenuShow(false);
                        navigation.navigate(screenString.USERCHATSCREEN, {
                          chatId:
                            user?.user?.userId > item.userId
                              ? `${user?.user?.userId}_${item.userId}`
                              : `${item.userId}_${user?.user?.userId}`,
                          profileImage: item.profilePic
                            ? item.profilePic
                            : defaultpic,
                          userName: item.name,
                          reciverId: item.userId,
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#898989',
                        paddingBottom: 4,
                        paddingHorizontal: 10,
                      }}>
                      <CustomImage
                        style={{
                          aspectRatio: 1,
                          height: 35,
                          width: 35,
                          borderRadius: 30,
                          alignSelf: 'center',
                        }}
                        source={{
                          uri: item.profilePic ? item.profilePic : defaultpic,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 10,
                        }}>
                        <CustomText numberOfLines={1}> {item.name}</CustomText>
                      </View>
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor:
                            item.status === 'online' ? '#32F112' : '#F1122A',
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
