import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/Images';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {View, TouchableOpacity, Alert} from 'react-native';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {getReq, postReq} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import style from './style';
import CustomImage from '../../compnents/customImage';

export default function Venues({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [isVenueList, setIsVenueList] = useState([]);
  const [venueId, setVenueId] = useState(null);
  const removePayload = {
    coachVenueId: venueId,
  };
  useEffect(() => {
    getUserProfile();
  }, [user]);
  useEffect(() => {
    if (venueId) deleteById();
  }, [venueId]);
  const getUserProfile = () => {
    setIsLoading(true);
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          setIsVenueList(data?.data?.venueList);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const deleteById = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.deleteVenue,
      removePayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          Alert.alert(data?.returnMessage[0]);
          getUserProfile();
        }
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert(err?.returnMessage[0]);
        console.log('DeleteId=>', err);
      });
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Venues'}
        rightIcon={true}
      />
      <CustomButton
        marginTop={30}
        lable={'Add'}
        width={'25%'}
        height={35}
        alignSelf={'flex-end'}
        marginRight={'2.5%'}
      />

      {isVenueList?.map((val, index) => {
        return (
          <View
            key={index}
            style={[
              commonStyle.row('95%', 'space-between', 'center'),
              {
                height: 70,
                backgroundColor: '#1F1F1F',
                marginTop: 10,
                paddingHorizontal: 10,
              },
            ]}>
            <View style={style.rowContent}>
              <CustomImage source={Images.USERPROFILE} />
              <View style={{marginLeft: '5%'}}>
                <CustomText fontSize={13}>{val.name}</CustomText>
                <View style={style.rowContent}>
                  <Icon
                    name={'map-marker'}
                    color={colors.THEME_BTN}
                    size={15}
                  />
                  <CustomText marginLeft={3} fontSize={13}>
                    {val.address}
                  </CustomText>
                </View>
                <View style={style.rowContent}>
                  <Icon name={'account'} color={colors.THEME_BTN} size={15} />
                  <CustomText marginLeft={3} fontSize={13}>
                    {val.alowGuest ? 'Yes' : 'No'}
                  </CustomText>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => setVenueId(val.venueId)}>
              <Icon name={'delete'} color={colors.THEME_BTN} size={35} />
            </TouchableOpacity>
          </View>
        );
      })}
    </ContainerBgImage>
  );
}
