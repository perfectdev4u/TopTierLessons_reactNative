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
import {Alert, TouchableOpacity, View} from 'react-native';
import apiUrl from '../../api/apiUrl';
import {Loader} from '../../compnents/loader';
import {getReq, postReq} from '../../api';
import {featuredCoach, nearbyCoaches} from '../../utils/constants';
import colors from '../../theme/colors';
import DropDown from '../../compnents/dropDown';
import CustomText from '../../compnents/customText';
import {FilterModal} from './filterPannel';

export default function UserHome({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [isChildDropdown, setIsChildDropdown] = useState(false);
  const [childList, setChildList] = useState([]);
  const [child, setChild] = useState({name: 'Select Child Name', id: null});
  const [searchTxt, setSearchTxt] = useState('');
  const [sport, setSport] = useState({name: 'Select Sport', id: null});
  const [sportsList, setSportsList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    getUserProfile();
    getAllSports();
  }, []);
  const sports_Payload = {
    page: 1,
    pageSize: 10,
  };
  const getUserProfile = () => {
    setIsLoading(true);
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setIsLoading(false);
        //console.log('cHild-->', data?.data?.children);
        setChildList(data?.data?.children);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const getAllSports = () => {
    postReq(apiUrl.baseUrl + apiUrl.getAllSports, sports_Payload)
      .then(res => {
        setSportsList(res?.data?.data);
      })
      .catch(err => console.log('sportsList-err==>', err));
  };
  const handleOnpress = () => {
    user?.user?.userType === 2
      ? Alert.alert('In Process...')
      : navigation.navigate(screenString.COACHDETAILS);
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'menu'}
        leftIconClick={() => navigation.openDrawer()}
        title={true}
        lable={'Home'}
        rightIcon={true}
      />
      {user?.user?.userType === 4 && (
        <DropDown
          width={'95%'}
          isDropDown={isChildDropdown}
          lable={child.name}
          setLable={setChild}
          onPress={() => setIsChildDropdown(!isChildDropdown)}
          isShown={false}
        />
      )}
      {isChildDropdown && (
        <View
          style={{
            width: '95%',
            marginTop: 10,
            backgroundColor: colors.WHITE,
            alignSelf: 'center',
            padding: 10,
          }}>
          {childList?.map((val, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{marginTop: 5}}
                onPress={() => {
                  setChild({name: val.childName, id: val.childId});
                  setIsChildDropdown(!isChildDropdown);
                }}>
                <CustomText color={colors.BLACK} fontSize={15} lineHeight={22}>
                  {val.childName}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <CustomInput
        width="95%"
        marginTop={10}
        paddingHorizontal={10}
        backgroundColor={'#202020'}
        placeholder={'Search'}
        value={searchTxt}
        onChangeText={txt => setSearchTxt(txt)}
        rightComponent={<Icon name={'search'} color={'#A5A5A5'} size={18} />}
      />
      <FeaturedCoach data={featuredCoach} onPress={() => handleOnpress()} />
      <NearbyCoaches
        data={nearbyCoaches}
        onPress={() => handleOnpress()}
        onPressFilter={() => setIsFilter(true)}
      />
      <FilterModal
        modalVisible={isFilter}
        setModalVisible={setIsFilter}
        sport={sport}
        setSport={setSport}
        sportsList={sportsList}
        onFilter={() => setIsFilter(false)}
      />
    </ContainerBgImage>
  );
}
