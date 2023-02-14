import React, {useState, useEffect} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import customImage from '../customImage';
import CustomText from '../customText';
import DrawerMenuItem from '../DrawerMenuItem';
import {useDispatch, useSelector} from 'react-redux';
import {reset} from '../../redux/reducers/authReducer';
import screenString from '../../navigation/screenString';
import {SafeAreaView, ScrollView, View, TouchableOpacity} from 'react-native';
import commonStyle from '../../theme/commonStyle';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from '../customImage';
import Images from '../../assets/Images';
import style from './style';
import {getReq} from '../../api';
import apiUrl from '../../api/apiUrl';
import {addUser} from '../../redux/reducers/authReducer';

export default function DrawerMenu(props) {
  const {user} = useSelector(state => state.authReducer);
  console.log('user==>', user?.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userMenuItems = [
    {
      isActive: false,
      icon: 'bell-ring-outline',
      label: 'Notifications',
      screen: screenString.NOTIFICATIONS,
    },
    {
      isActive: false,
      icon: 'file-document-outline',
      label: 'Lessons',
      screen: screenString.LESSONS,
    },
    {
      isActive: false,
      icon: 'alert-circle-outline',
      label: 'Terms of Services',
      screen: screenString.TERMS_PRIVACY,
      type: 1,
    },
    {
      isActive: false,
      icon: 'file-document-outline',
      label: 'Privacy Policy',
      screen: screenString.TERMS_PRIVACY,
      type: 2,
    },
    {
      isActive: true,
      icon: 'account-key-outline',
      label: 'Change Password',
      screen: screenString.NEWPASSWORD,
    },
    {
      isActive: false,
      icon: 'alert-circle-outline',
      label: 'Help',
      screen: screenString.HELP,
    },
  ];
  const coachMenuItems = [
    {
      isActive: false,
      icon: 'bell-ring-outline',
      label: 'Notifications',
      screen: screenString.NOTIFICATIONS,
    },
    {
      isActive: false,
      icon: 'timelapse',
      label: 'Slots',
      screen: screenString.SLOTS,
    },
    {
      isActive: false,
      icon: 'file-document-outline',
      label: 'Documents',
      screen: screenString.DOCUMENTS,
    },
    {
      isActive: false,
      icon: 'newspaper-variant-outline',
      label: 'Venue',
      screen: screenString.VENUE,
    },
    {
      isActive: false,
      icon: 'book-outline',
      label: 'Booking',
      screen: screenString.BOOKING,
    },
    {
      isActive: true,
      icon: 'account-key-outline',
      label: 'Change Password',
      screen: screenString.NEWPASSWORD,
    },
    {
      isActive: false,
      icon: 'alert-circle-outline',
      label: 'Terms of Services',
      screen: screenString.TERMS_PRIVACY,
      type: 1,
    },
    {
      isActive: false,
      icon: 'file-document-outline',
      label: 'Privacy Policy',
      screen: screenString.TERMS_PRIVACY,
      type: 2,
    },
    {
      isActive: false,
      icon: 'alert-circle-outline',
      label: 'Help',
      screen: screenString.HELP,
    },
  ];
  const [activeRoute, setActiveRoute] = useState(screenString.RESETPASSWORD);
  const handleNavigation = (screen, params, method) =>
    screen && navigation[method || 'navigate'](screen, params);
  useEffect(() => {
    const {state} = props;
    const {routes, index} = state;
    const fousedRoute = routes[index].name;
    setActiveRoute(fousedRoute);
  }, [props]);
  useEffect(() => {
    getUserProfile();
  }, [user?.access_token]);

  const getUserProfile = () => {
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(res => {
        dispatch(
          addUser({
            ...user,
            userName: res?.data?.data?.name,
            userEmail: res?.data?.data?.email,
            userImage: res?.data?.data?.profileImage,
          }),
        );
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={commonStyle.container(colors.BLACK)}>
      <ScrollView
        style={commonStyle.container(colors.BLACK)}
        horizontal={false}
        showsVerticalScrollIndicator={false}>
        <View style={style.headerContainer}>
          <Icon
            size={30}
            name={'chevron-left'}
            color={colors.WHITE}
            onPress={() => navigation.goBack()}
          />
          <View style={style.imageContaioner}>
            <CustomImage
              source={{uri: user?.userImage}}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                alignSelf: 'center',
                //resizeMode: 'contain',
              }}
            />
            <TouchableOpacity style={style.iconContainer}>
              <Icon
                size={10}
                name={'pencil'}
                color={colors.THEME_BTN}
                onPress={() => alert('inprocess')}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 10}}>
            <CustomText fontSize={13} fontWeight={'600'}>
              {user?.userName}
            </CustomText>
            <CustomText fontSize={10}>{user?.userEmail}</CustomText>
          </View>
        </View>
        <View style={[commonStyle.container(colors.BLACK), {marginTop: 35}]}>
          {user?.user?.userType === 2
            ? coachMenuItems?.map((item, index) => (
                <DrawerMenuItem
                  {...item}
                  isActive={activeRoute === item.screen}
                  key={index}
                  onPress={() => handleNavigation(item.screen, item.type)}
                />
              ))
            : userMenuItems?.map((item, index) => (
                <DrawerMenuItem
                  {...item}
                  isActive={activeRoute === item.screen}
                  key={index}
                  onPress={() => handleNavigation(item.screen, item.type)}
                />
              ))}
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: 30,
        }}>
        <DrawerMenuItem
          icon={'logout'}
          label="Logout"
          screen={screenString.ONBOARDING}
          onPress={() => {
            dispatch(reset());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: screenString.ONBOARDING}],
              }),
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
