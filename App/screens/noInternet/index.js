import React from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/Images';
import {CommonActions} from '@react-navigation/native';
import screenString from '../../navigation/screenString';
export default function NoInternet({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.BLACK,
      }}>
      <ImageBackground
        source={Images.appBackground}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="emoticon-sad" size={60} color={colors.THEME_BTN} />
        <CustomText marginTop={10} alignSelf={'center'}>
          No Internet Connection!
        </CustomText>
        <CustomButton
          marginTop={20}
          lable="Reload"
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: screenString.SPLASH}],
              }),
            )
          }
          width="30%"
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
