import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from '../customImage';
import VideoPlayer from 'react-native-video-player';
import Sound from 'react-native-sound';
export default function UserChatItem({
  message,
  senderId,
  updatedOn,
  file,
  index,
}) {
  const {user} = useSelector(state => state.authReducer);
  const [audio, setAudio] = useState(null);
  const [type, setType] = useState('');
  let audioFormat = [
    'mp3',
    'wav',
    'aac',
    'flac',
    'alac',
    'dsd',
    'aiff',
    'm3u8',
  ];
  let videoFormat = ['mp4', 'mov', 'mkv', 'avi', 'avchd', 'webm', 'wmv'];
  useEffect(() => {
    if (file) {
      let url = file.split('.');
      let urlIndex = url.length - 1;
      let exten = url[urlIndex];
      setType(exten);
    }
  }, [file]);

  useEffect(() => {
    Sound.setCategory('Playback', true);
  }, []);

  const audioPlay = url => {
    setAudio(url);
    if (audio) {
      var voice = new Sound(url, (err, _sound) => {
        console.log(
          'duration in seconds: ' +
            voice.getDuration() +
            'number of channels: ' +
            voice.getNumberOfChannels(),
        );
        if (err) {
          console.log('sound_err=>', err);
        } else
          voice.play(() => {
            voice.release();
          });
      });
    }
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
              <TouchableOpacity
                onPress={() => audioPlay(file)}
                style={{alignItems: 'flex-start'}}>
                <Icon name={'play'} color={colors.WHITE} size={20} />
              </TouchableOpacity>
            ) : (
              <CustomImage
                source={{uri: file}}
                style={{
                  height: 250,
                  width: 250,
                  //resizeMode:'contain',
                  alignSelf: 'center',
                }}
              />
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
      {message && (
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
    </View>
  );
}
