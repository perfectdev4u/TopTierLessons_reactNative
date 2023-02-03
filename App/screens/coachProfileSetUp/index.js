import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import colors from '../../theme/colors';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import DropDown from '../../compnents/dropDown';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyle from '../../theme/commonStyle';
import {useSelector, useDispatch} from 'react-redux';

export default function CoachProfileSetUp({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [address, setAddress] = useState({name: '', lat: null, lan: null});
  const [sport, setSport] = useState({name: 'Select Sport', id: null});
  const [sportsList, setSportsList] = useState([]);
  const [isSportsDropDown, setIsSportsDropDown] = useState(false);
  const [sliderValue, setSliderValue] = useState([10]);
  const SliderValuesChange = value => setSliderValue(value[0]);
  const [venue, setVenue] = useState({name: 'Venue', id: null});
  const [venueList, setVenueList] = useState([]);
  const [isVenueDropDown, setIsVenueDropDown] = useState(false);
  const [price, setPrice] = useState();
  const [accomplishment, setAccomplishment] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    getAllSports();
  }, []);
  const sportsPayload = {
    page: 1,
    pageSize: 20,
  };
  const getAllSports = () => {
    postReq(apiUrl.baseUrl + apiUrl.getAllSports, sportsPayload)
      .then(res => {
        setSportsList(res?.data?.data);
      })
      .catch(err => console.log('err==>', err));
  };
  return (
    <ContainerBgImage>
      <CustomHeader />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <CustomText
          fontSize={32}
          lineHeight={38}
          fontWeight={'700'}
          alignSelf={'center'}>
          Set Up Profile
        </CustomText>
        <GooglePlacesAutocomplete
          placeholder="Address"
          onPress={(data, details = null) => {
            console.log(details);
            setAddress({
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lan: details?.geometry?.location?.lng,
            });
          }}
          query={{
            key: 'AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ',
            language: 'en',
          }}
          returnKeyType={'default'}
          fetchDetails={true}
          enablePoweredByContainer={false}
          textInputProps={{
            value: address.name,
            placeholderTextColor: '#D4D4D4',
            onChangeText: address => setAddress(address),
          }}
          styles={{
            textInputContainer: {
              marginTop: 50,
              borderColor: colors.BORDER_COLOR,
              borderWidth: 1,
            },
            textInput: {
              height: 35,
              color: colors.WHITE,
              fontSize: 16,
              backgroundColor: 'black',
            },
            container: {
              width: '100%',
              alignSelf: 'center',
            },
          }}
        />
        <DropDown
          width="100%"
          marginTop={20}
          isDropDown={isSportsDropDown}
          lable={sport.name}
          setLable={setSport}
          onPress={() => setIsSportsDropDown(!isSportsDropDown)}
          isShown={false}
        />
        {isSportsDropDown && (
          <View
            style={{
              width: '100%',
              marginTop: 10,
              backgroundColor: colors.WHITE,
              alignSelf: 'center',
              padding: 10,
            }}>
            {sportsList?.map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSport({name: val.sportName, id: val.sportId});
                    setIsSportsDropDown(!isSportsDropDown);
                  }}>
                  <CustomText
                    color={colors.BLACK}
                    fontSize={15}
                    lineHeight={22}>
                    {val.sportName}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <CustomText marginTop={20} textAlign={'left'}>
          {' '}
          Radius
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <MultiSlider
            values={[sliderValue]}
            sliderLength={300}
            onValuesChange={SliderValuesChange}
            min={10}
            max={100}
            step={1}
            snapped={true}
            enabledTwo={true}
            containerStyle={{marginLeft: 16}}
          />
          <CustomText
            fontSize={18}
            fontWeight="600"
            lineHeight={20}
            color={colors.WHITE}
            textAlign={'center'}>
            {sliderValue}
          </CustomText>
        </View>
        <DropDown
          width="100%"
          marginTop={10}
          isDropDown={isVenueDropDown}
          lable={venue.name}
          setLable={setVenue}
          onPress={() => setIsVenueDropDown(!isVenueDropDown)}
          isShown={false}
        />
        <CustomInput
          width="100%"
          marginTop={20}
          borderWidth={1}
          placeholder={'Price'}
          keyboardType={'numeric'}
          value={price}
          onChangeText={txt => setPrice(txt)}
        />
        <CustomInput
          width="100%"
          marginTop={20}
          borderWidth={1}
          placeholder={'Acomplishment'}
          value={accomplishment}
          onChangeText={txt => setAccomplishment(txt)}
        />
        <DropDown
          width="100%"
          marginTop={20}
          isDropDown={isVenueDropDown}
          lable={'Skills'}
          setLable={setVenue}
          onPress={() => setIsVenueDropDown(!isVenueDropDown)}
          isShown={false}
        />
        <CustomInput
          width="100%"
          height={70}
          marginTop={20}
          borderWidth={1}
          placeholder={'Experience'}
          multiline={true}
          value={experience}
          onChangeText={txt => setExperience(txt)}
        />
        <CustomInput
          width="100%"
          height={70}
          marginTop={20}
          borderWidth={1}
          placeholder={'Bio'}
          multiline={true}
          value={bio}
          onChangeText={txt => setBio(txt)}
        />
        <CustomButton
          alignSelf={'center'}
          marginTop={40}
          lable="Confirm"
          onPress={() => navigation.navigate(screenString.LOGIN)}
        />
      </View>
    </ContainerBgImage>
  );
}
