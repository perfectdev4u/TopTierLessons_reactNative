import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../../theme/colors';
import CustomText from '../customText';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from '../customImage';

export default function UserChatItem({
  message,
  senderId,
  updatedOn,
  index,
  file,
}) {
  var Sound = require('react-native-sound');
  Sound.setCategory('Playback');
  const {user} = useSelector(state => state.authReducer);
  const [audio, setAudio] = useState(null);
  const [type, setType] = useState('');
  let audioExe = ['mp3', 'wav', 'aac', 'flac', 'alac', 'dsd', 'aiff', 'm3u8'];
  useEffect(() => {
    if (file) {
      let res = file.split('.');
      let resIndex = res.length - 1;
      let exten = res[resIndex];
      setType(exten);
    }
  }, [file]);

  var voice = new Sound(file, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        voice.getDuration() +
        'number of channels: ' +
        voice.getNumberOfChannels(),
    );
    // Play the sound with an onEnd callback
    voice.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
  
  const audioPlay = (url, index) => {
    setAudio(index);
    if (audio) {
      voice = new Sound(url, (err, _sound) => {
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
      key={index}
      style={{
        flexDirection: user?.user?.userId === senderId ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
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
             // height: 30,
            }}>
            {audioExe.includes(type) ? (
              <TouchableOpacity
                onPress={() => audioPlay(file, index)}
                style={{alignItems: 'flex-start'}}>
                <Icon name={'play'} color={colors.WHITE} size={20} />
              </TouchableOpacity>
            ) : (
              <CustomImage
                source={{uri: file}}
                style={{
                  height: 150,
                  width: 150,
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
              paddingHorizontal: 20,
              marginTop: 5,
              borderTopStartRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
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
