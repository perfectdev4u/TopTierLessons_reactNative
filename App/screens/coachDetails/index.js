import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {View, TouchableOpacity} from 'react-native';
import CustomImage from '../../compnents/customImage';
import CustomText from '../../compnents/customText';
import style from './style';
import CustomButton from '../../compnents/customButton';
import MapView, {Marker} from 'react-native-maps';
import Star from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import {addUser} from '../../redux/reducers/authReducer';
import screenString from '../../navigation/screenString';
export default function CoachDetails({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviews, setIsReviews] = useState([]);
  const title = [
    {name: 'Bio', width: '33.3%'},
    {name: 'Location', width: '33.4%'},
    {name: 'Reviews', width: '33.3%'},
  ];
  const detailsPayload = {
    coachId: 4,
  };
  const reviewsPayload = {
    userId: 4,
    page: 1,
    pageSize: 20,
  };
  useEffect(() => {
    if (isActive === 2) getAllReviews();
    else getCoachDetails();
  }, [isActive]);
  const getCoachDetails = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getCoachById,
      detailsPayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          dispatch(addUser({...user, coachDetails: data.data}));
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('getCoachDetails_err==>', err);
      });
  };
  const getAllReviews = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getAllReviews,
      reviewsPayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          setIsReviews(data.data);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('getAllReviews_err==>', err);
      });
  };
  const bio = txt => {
    return (
      <View
        style={{
          marginTop: 20,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignSelf: 'center',
          width: '95%',
        }}>
        <View
          style={{
            height: 7,
            width: 7,
            backgroundColor: '#C2C2C2',
            borderRadius: 5,
            marginTop: 6,
          }}
        />
        <CustomText fontSize={16} color={'#C2C2C2'} marginLeft={'3%'}>
          {txt}
        </CustomText>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
      }}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <ContainerBgImage>
        <CustomHeader
          leftIcon={'chevron-left'}
          leftIconClick={() => navigation.goBack()}
          title={true}
          lable={'Coach Detail'}
          rightIcon={true}
        />
        <View
          style={[
            commonStyle.row('95%', 'space-between', 'center'),
            {
              height: 70,
              backgroundColor: '#1F1F1F',
              marginTop: 20,
            },
          ]}>
          <View style={style.rowContent}>
            <CustomImage
              style={style.profile}
              source={{uri: user?.coachDetails?.profileImage}}
            />
            <View style={{marginLeft: '5%'}}>
              <CustomText fontSize={13}>{user?.coachDetails?.name}</CustomText>
              <View style={style.rowContent}>
                <Icon
                  name={'location-outline'}
                  color={colors.THEME_BTN}
                  size={15}
                />
                <CustomText marginLeft={3} numberOfLines={1} fontSize={13}>
                  {user?.coachDetails?.address}
                </CustomText>
              </View>
              <View style={style.rowContent}>
                <Icon
                  name={'star-outline'}
                  color={colors.THEME_BTN}
                  size={15}
                />
                <CustomText marginLeft={3} fontSize={13}>
                  4.2/5
                </CustomText>
              </View>
            </View>
          </View>
          <View style={style.rowRight}>
            <CustomText fontSize={10}>
              {user?.coachDetails?.sportName}
            </CustomText>
            <CustomText fontSize={16}>{user?.coachDetails?.price}$</CustomText>
          </View>
        </View>
        <View style={style.divider} />
        <View
          style={[
            commonStyle.row('95%', 'space-between', 'center'),
            {marginTop: 20, flex: 1},
          ]}>
          {title.map((val, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setIsActive(index)}
                style={{
                  borderBottomWidth: 2,
                  borderColor:
                    isActive === index ? colors.THEME_BTN : '#595959',
                  width: val.width,
                  paddingBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  color={isActive === index ? colors.THEME_BTN : '#6B6B6B'}>
                  {val.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        {!isLoading && (
          <View style={{flex: 1}}>
            {isActive === 0 && <View>{bio(user?.coachDetails?.bio)}</View>}
            {isActive === 1 && (
              <View style={{flex: 1, width: '95%', alignSelf: 'center'}}>
                <CustomText marginTop={20} color="#CFCFCF">
                  {user?.coachDetails?.name} is available at mention location.
                  You can navigate through map by clicking given location.
                </CustomText>
                <View style={style.mapContainer}>
                  <MapView
                    style={{
                      flex: 1,
                      borderRadius: 20,
                      marginBottom:10
                    }}
                    initialRegion={{
                      latitude: user?.coachDetails?.latitude,
                      longitude: user?.coachDetails?.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: user?.coachDetails?.latitude,
                        longitude: user?.coachDetails?.longitude,
                      }}></Marker>
                  </MapView>
                </View>
              </View>
            )}
            {isActive === 2 && (
              <View>
                {isReviews.length === 0 && (
                  <CustomText marginTop={50} textAlign={'center'} fontSize={16}>
                    No Reviews Yet!
                  </CustomText>
                )}
                {isReviews?.map((val, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        commonStyle.row('95%', 'space-between', 'center'),
                        {
                          height: 70,
                          marginTop: 20,
                          borderBottomWidth: 0.4,
                          borderColor: '#F3F3F3',
                        },
                      ]}>
                      <View style={style.rowContent}>
                        <CustomImage
                          style={style.profile}
                          source={{uri: val.studentImage}}
                        />
                        <View style={{marginLeft: '5%'}}>
                          <CustomText fontSize={16}>
                            {val.studentName}
                          </CustomText>
                          <CustomText
                            numberOfLines={2}
                            color="#7A7A7A"
                            fontSize={12}>
                            {val.review}
                          </CustomText>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        {Array.from(Array(5).keys()).map((item, index) => (
                          <Star
                            key={index}
                            name={
                              index <= val.rating ? 'star' : 'star-outlined'
                            }
                            color={colors.THEME_BTN}
                            size={22}
                          />
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ContainerBgImage>
      <CustomButton
        alignSelf={'center'}
        lable="Book Now"
        onPress={() => navigation.navigate(screenString.DATETIME)}
      />
    </View>
  );
}
