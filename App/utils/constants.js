import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
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

export const goBackHandle = (navigation)=>{
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenString.DRAWER}],
    }),
  );
}
