import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from '../customImage';
import VideoPlayer from 'react-native-video-player';
import {ShomImage} from '../showImage';
import commonStyle from '../../theme/commonStyle';
import SoundPlayer from 'react-native-sound-player';
import Slider from '@react-native-community/slider';
import { audioFormat, videoFormat } from '../../utils/constants';
export default function UserChatItem({
  message,
  senderId,
  updatedOn,
  file,
  index,
}) {
  const {user} = useSelector(state => state.authReducer);
  const [audioIndex, setAudioIndex] = useState(null);
  const [audioIcon, setAudioIcon] = useState(false);
  const [type, setType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  
  useEffect(() => {
    if (file) {
      let url = file.split('.');
      let urlIndex = url.length - 1;
      let exten = url[urlIndex];
      setType(exten);
    }
  }, [file]);
  useEffect(() => {
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        console.log('finished playing', success);
      },
    );
    _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      ({success}) => {
        console.log('finished loading', success);
      },
    );
    _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingFile',
      ({success, name, type}) => {
        console.log('finished loading file', success, name, type);
      },
    );
    _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        console.log('finished loading url', success, url);
      },
    );
  }, []);
  const audioPlay = url => {
    setAudioIcon(true);
    try {
      // or play from url
      SoundPlayer.playUrl(url);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };
  const getInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('getInfo', info); // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e);
    }
  };
  const handlePlay = url => {
    audioPlay(url);
    getInfo();
  };
  const handleStop = () => {
    setAudioIcon(false);
    SoundPlayer.pause();
  };
  const openImage = url => {
    setImgUrl(url);
    setModalVisible(true);
  };
  return (
    <View
      style={{
        flexDirection: user?.user?.userId === senderId ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        flex: 1,
      }}>
      {file && (
        <View
          style={{
            marginLeft: user?.user?.userId === senderId ? 10 : 0,
            marginRight: user?.user?.userId === senderId ? 0 : 10,
          }}>
          <View
            style={{
              backgroundColor:
                user?.user?.userId === senderId ? colors.THEME_BTN : '#161616',
              padding: 10,
              marginTop: 5,
              borderTopStartRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              // height: 30,
            }}>
            {videoFormat.includes(type) ? (
              <VideoPlayer
                video={{uri: file}}
                // videoWidth={350}
                // videoHeight={350}
                thumbnail={{
                  uri: 'https://blog.logrocket.com/wp-content/uploads/2021/05/displaying-images-react-native-image-component.png',
                }}
              />
            ) : audioFormat.includes(type) ? (
              <View
                style={[commonStyle.row('50%', 'space-between', 'flex-start')]}>
                <TouchableOpacity
                  onPress={() => {
                    audioIcon ? handleStop(index) : handlePlay(file);
                  }}>
                  <Icon
                    name={audioIcon ? 'pause' : 'play'}
                    color={colors.WHITE}
                    size={35}
                  />
                </TouchableOpacity>
                <Slider
                  style={{width: 150, marginLeft: '5%'}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor={colors.THEME_BTN}
                  maximumTrackTintColor="#595959"
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => openImage(file)}>
                <CustomImage
                  source={{uri: file}}
                  style={{
                    height: 250,
                    width: 250,
                    //resizeMode:'contain',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            )}
            {message && (
              <CustomText marginTop={10} alignSelf={'flex-start'}>
                {message}
              </CustomText>
            )}
          </View>
          <CustomText
            fontSize={10}
            color="rgba(255, 255, 255, 0.5)"
            alignSelf={
              user?.user?.userId === senderId ? 'flex-end' : 'flex-start'
            }>
            {moment(updatedOn).format('HH:mm')}
          </CustomText>
        </View>
      )}
      {!file && message && (
        <View
          style={{
            marginLeft: user?.user?.userId === senderId ? 10 : 0,
            marginRight: user?.user?.userId === senderId ? 0 : 10,
          }}>
          <View
            style={{
              backgroundColor:
                user?.user?.userId === senderId ? colors.THEME_BTN : '#161616',
              padding: 10,
              marginTop: 5,
              borderTopStartRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <CustomText alignSelf={'center'}>{message}</CustomText>
          </View>
          <CustomText
            fontSize={10}
            color="rgba(255, 255, 255, 0.5)"
            alignSelf={
              user?.user?.userId === senderId ? 'flex-end' : 'flex-start'
            }>
            {moment(updatedOn).format('HH:mm')}
          </CustomText>
        </View>
      )}
      <ShomImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        url={imgUrl}
      />
    </View>
  );
}
