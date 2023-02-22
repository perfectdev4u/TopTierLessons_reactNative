import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import {View, FlatList, SafeAreaView, ImageBackground} from 'react-native';
import colors from '../../theme/colors';
import Images from '../../assets/Images';
import style from './style';
import ChatListItem from '../../compnents/chatListItem';
import {goBackHandle} from '../../utils/constants';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {useSelector} from 'react-redux';
export default function ChatScreen({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const inboxPayload = {
    userId: user?.user?.userId,
    page: 1,
    pageSize: 20,
  };
  useEffect(() => {
    getInbox();
  }, [user]);
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
          setChatList(res?.data?.data);
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
        <FlatList
          data={chatList}
          renderItem={({item}) => (
            <ChatListItem {...item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
