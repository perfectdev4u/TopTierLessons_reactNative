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
let timer;
export default function UserHome({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [isChildDropdown, setIsChildDropdown] = useState(false);
  const [childList, setChildList] = useState([]);
  const [child, setChild] = useState({name: 'Select Child Name', id: 0});
  const [cordinates, setCordinates] = useState({lat: 0, lan: 0});
  const [coachList, setCoachList] = useState([]);
  const [coachBackupList, setCoachBackupList] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [sliderValue, setSliderValue] = useState([10]);
  const SliderValuesChange = value => setSliderValue(value[0]);
  const [sport, setSport] = useState({name: 'Select Sport', id: 0});
  const [sportsList, setSportsList] = useState([]);
  const [priceValue, setPriceValue] = useState([0, 500]);
  const priceValueChange = values => setPriceValue(values);
  const [isFilter, setIsFilter] = useState(false);

  const coachPayLoad = {
    page: 1,
    pageSize: 20,
    radius: sliderValue[0],
    sportId: sport.id,
    childId: child.id,
    latitude: cordinates.lat,
    longitude: cordinates.lan,
    search: searchTxt,
    minPrice: priceValue[0],
    maxPrice: priceValue[1],
  };
  const sports_Payload = {
    page: 1,
    pageSize: 10,
  };
  useEffect(() => {
    getUserProfile();
    handleCoachesList();
    getAllSports();
  }, []);
  const getUserProfile = () => {
    setIsLoading(true);
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setIsLoading(false);
        //console.log('User-->', data?.data);
        setCordinates({lat: data?.data?.latitude, lan: data?.data?.longitude});
        setChildList(data?.data?.children);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const handleCoachesList = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getAllCoaches,
      coachPayLoad,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        setIsFilter(false);
        console.log('CoachesList==>', res?.data?.data);
        //setCoachList(res?.data?.data);
        //setCoachBackupList(res?.data?.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('CoachesList-err==>', err);
        //setCoachList([]);
        // setCoachBackupList([]);
      });
  };
  const getAllSports = () => {
    postReq(apiUrl.baseUrl + apiUrl.getAllSports, sports_Payload)
      .then(res => {
        setSportsList(res?.data?.data);
      })
      .catch(err => console.log('sportsList-err==>', err));
  };
  const handleSearch = txt => {
    setSearchTxt(txt);
    if (timer) clearTimeout(timer);
    if (!txt) setCoachList(coachBackupList);
    timer = setTimeout(async () => {
      let filter = await coachBackupList.filter(
        val => val.name.indexOf(txt) !== -1,
      );
      //setCoachList(filter);
    }, 1000);
  };
  const handleOnpress = () => {
    user?.user?.userType === 2
      ? Alert.alert('In Process...')
      : navigation.navigate(screenString.COACHDETAILS);
  };
  const onFilter = () => {
    handleCoachesList();
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
        sliderValue={sliderValue}
        SliderValuesChange={SliderValuesChange}
        sport={sport}
        setSport={setSport}
        sportsList={sportsList}
        priceValue={priceValue}
        priceValueChange={priceValueChange}
        onFilter={() => onFilter()}
      />
    </ContainerBgImage>
  );
}
