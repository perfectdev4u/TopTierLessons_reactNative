import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import CustomInput from '../../compnents/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '../../assets/Images';
import FeaturedCoach from './featuredCoachPannel';
import NearbyCoaches from './NearbyCoachesPannel';
import {useSelector, useDispatch} from 'react-redux';

export default function UserHome({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  console.log("user===>",user);
  const [searchTxt, setSearchTxt] = useState('');
  const featuredCoach = [
    {
      img: Images.COACH1,
      name: 'Bozenka Malina',
    },
    {img: Images.COACH2, name: 'Anastazja Ziemkowska'},
    {img: Images.COACH1, name: 'Magdealena Pomorska'},
    {
      img: Images.COACH1,
      name: 'Bozenka Malina',
    },
    {img: Images.COACH2, name: 'Anastazja Ziemkowska'},
    {img: Images.COACH1, name: 'Magdealena Pomorska'},
  ];
  const nearbyCoaches = [
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
    {
      img: Images.USERPROFILE,
      name: 'Bozenka Malina',
      address: 'Panjer,South Denpasar',
      ratings: '4.5/5',
      sports: 'Cricket',
      price: '105$',
    },
  ];
  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'menu'}
        leftIconClick={() => navigation.openDrawer()}
        title={true}
        lable={'Home'}
        rightIcon={true}
      />
      <CustomInput
        width="95%"
        marginTop={20}
        paddingHorizontal={10}
        backgroundColor={'#202020'}
        placeholder={'Search'}
        value={searchTxt}
        onChangeText={txt => setSearchTxt(txt)}
        rightComponent={<Icon name={'search'} color={'#A5A5A5'} size={18} />}
      />
      <FeaturedCoach
        data={featuredCoach}
        onPress={() => navigation.navigate(screenString.COACHDETAILS)}
      />
      <NearbyCoaches
        data={nearbyCoaches}
        onPress={() => navigation.navigate(screenString.COACHDETAILS)}
      />
    </ContainerBgImage>
  );
}
