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
import {VenuesList} from '../../compnents/addVenues';
import {goBackHandle} from '../../utils/constants';

export default function Venues({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVenueList, setIsVenueList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [venueId, setVenueId] = useState(null);
  const [latLan, setLatLan] = useState({lat: null, lan: null});
  const [radius, setRadius] = useState(0);
  const [sportsId, setSportsId] = useState(null);
  const removePayload = {
    coachVenueId: venueId,
  };
  const venuesPayload = {
    lat: latLan.lat,
    long: latLan.lan,
    radius: radius,
    sportId: sportsId,
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
          console.log(data?.data);
          setIsVenueList(data?.data?.venueList);
          setLatLan({lat: data?.data?.latitude, lan: data?.data?.longitude});
          setRadius(data?.data?.radius);
          setSportsId(data?.data?.sportId);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const getVenueList = () => {
    postReq(
      apiUrl.baseUrl + apiUrl.getNearVenue,
      venuesPayload,
      user?.access_token,
    )
      .then(res => {
        setVenueList(res?.data?.data);
        setIsModalVisible(true);
      })
      .catch(err => console.log('err==>', err));
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
      {!isLoading && (
        <View style={{flex: 1}}>
          <CustomHeader
            leftIcon={'chevron-left'}
            leftIconClick={() => goBackHandle(navigation)}
            title={true}
            lable={'Venues'}
            rightIcon={true}
          />
          {/* <CustomButton
            marginTop={30}
            lable={'Add'}
            width={'25%'}
            height={35}
            alignSelf={'flex-end'}
            marginRight={'2.5%'}
            onPress={() => getVenueList()}
          /> */}
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
                      <Icon
                        name={'account'}
                        color={colors.THEME_BTN}
                        size={15}
                      />
                      <CustomText marginLeft={3} fontSize={13}>
                        {val.alowGuest ? 'Yes' : 'No'}
                      </CustomText>
                    </View>
                  </View>
                </View>
                {/* <TouchableOpacity onPress={() => setVenueId(val.venueId)}>
                  <Icon name={'delete'} color={colors.THEME_BTN} size={35} />
                </TouchableOpacity> */}
              </View>
            );
          })}
        </View>
      )}
      <VenuesList
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        data={venueList}
        setData={setVenueList}
        update={getUserProfile}
      />
    </ContainerBgImage>
  );
}
