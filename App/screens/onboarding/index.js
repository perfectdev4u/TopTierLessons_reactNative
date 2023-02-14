import React from 'react';
import {ImageBackground} from 'react-native';
import Images from '../../assets/Images';
import CustomButton from '../../compnents/customButton';
import CustomText from '../../compnents/customText';
import commonStyle from '../../theme/commonStyle';
import screenString from '../../navigation/screenString';
import colors from '../../theme/colors';
import {useSelector, useDispatch} from 'react-redux';
import {addUser} from '../../redux/reducers/authReducer';
import {CommonActions} from '@react-navigation/native';

export default function Onboarding({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const handleNavigation = screen =>
    screen &&
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen}],
      }),
    );
  return (
    <ImageBackground
      source={Images.appBackground}
      style={commonStyle.centeredContent(colors.BLACK)}>
      <CustomText fontSize={24} lineHeight={38}>
        TOP TIER COACHES FOR
      </CustomText>
      <CustomText
        marginTop={5}
        fontSize={24}
        lineHeight={38}>
        TOP TIER ATHLETES
      </CustomText>
      <CustomButton
        marginTop={46}
        lable="Find Lessons"
        onPress={() => {
          handleNavigation(screenString.LOGIN);
          dispatch(addUser({...user, userType: 3}));
        }}
      />
      <CustomButton
        marginTop={20}
        lable="I'm student athlete"
        onPress={() => {
          handleNavigation(screenString.LOGIN);
          dispatch(addUser({...user, userType: 2}));
        }}
      />
    </ImageBackground>
  );
}
