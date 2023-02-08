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
import {useSelector, useDispatch} from 'react-redux';
import CustomImage from '../../compnents/customImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/Images';
import style from './style';

export default function CoachProfileSetUp({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [image, setImage] = useState(Images.USER);
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
  const [skill, setSkill] = useState({name: 'Select Skills', id: null});
  const [skillList, setSkillList] = useState([]);
  const [isSkillsDropDown, setIsSkillDropDown] = useState(false);
  const [accomplishment, setAccomplishment] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    getAllSports();
    getAllSkills();
  }, []);
  const sports_skill_Payload = {
    page: 1,
    pageSize: 10,
  };
  const getAllSports = () => {
    postReq(apiUrl.baseUrl + apiUrl.getAllSports, sports_skill_Payload)
      .then(res => {
        setSportsList(res?.data?.data);
      })
      .catch(err => console.log('err==>', err));
  };
  const getAllSkills = () => {
    postReq(apiUrl.baseUrl + apiUrl.geAllSkills, sports_skill_Payload)
      .then(res => {
        setSkillList(res?.data?.data);
      })
      .catch(err => console.log('err==>', err));
  };
  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
      />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <CustomText
          fontSize={32}
          lineHeight={38}
          fontWeight={'700'}
          alignSelf={'center'}>
          Set Up Profile
        </CustomText>
        <View style={style.imageContaioner}>
          <CustomImage source={image} />
          <TouchableOpacity style={style.iconContainer}>
            <Icon
              size={20}
              name={'camera-outline'}
              color={colors.WHITE}
              onPress={() => alert('inprocess')}
            />
          </TouchableOpacity>
        </View>
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
              marginTop: 30,
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
          isDropDown={isSkillsDropDown}
          lable={skill.name}
          setLable={setSkill}
          onPress={() => setIsSkillDropDown(!isSkillsDropDown)}
          isShown={false}
        />
        {isSkillsDropDown && (
          <View
            style={{
              width: '100%',
              marginTop: 10,
              backgroundColor: colors.WHITE,
              alignSelf: 'center',
              padding: 10,
            }}>
            {skillList?.map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSkill({name: val.skill, id: val.skillId});
                    setIsSkillDropDown(!isSkillsDropDown);
                  }}>
                  <CustomText
                    color={colors.BLACK}
                    fontSize={15}
                    lineHeight={22}>
                    {val.skill}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
