import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import screenString from '../navigation/screenString';

export const userType = 'userType';
export const accountType = 'accountType';

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const isValidEmail = email => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const goBackHandle = navigation => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenString.DRAWER}],
    }),
  );
};

export let audioFormat = [
  'mp3',
  'wav',
  'aac',
  'flac',
  'alac',
  'dsd',
  'aiff',
  'm3u8',
];
export let videoFormat = ['mp4', 'mov', 'mkv', 'avi', 'avchd', 'webm', 'wmv'];
export let imgFormat = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'tiff',
  'psd',
  'pdf',
  'ai',
  'indd',
  'raw',
];
export const defaultpic =
  'https://toptierlessons.s3.amazonaws.com/218f9004-7432-4ade-bcf2-dc69b21d4489_user.png';
