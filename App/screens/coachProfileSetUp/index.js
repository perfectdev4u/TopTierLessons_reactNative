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
import {postReq, profileImageReq} from '../../api';
import DropDown from '../../compnents/dropDown';
import {Alert, Platform, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomImage from '../../compnents/customImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/Images';
import style from './style';
import {openCamera, launchGallery} from '../../compnents/imageUpload';
import {Loader} from '../../compnents/loader';
import TagInput from 'react-native-tag-input';
import {CommonActions} from '@react-navigation/native';
import {addUser} from '../../redux/reducers/authReducer';

const inputProps = {
  keyboardType: 'default',
  placeholder: 'Acomplishment',
  placeholderTextColor: '#D4D4D4',
  autoFocus: true,
  paddingHorizontal: 10,
  style: {
    fontSize: 15,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
    fontWeight: '400',
    color: colors.WHITE,
    fontFamily: 'Poppins-Regular',
  },
};
const horizontalScrollViewProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
};
export default function CoachProfileSetUp({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState({name: '', lat: null, lan: null});
  const [sport, setSport] = useState({name: 'Select Sport', id: null});
  const [sportsList, setSportsList] = useState([]);
  const [isSportsDropDown, setIsSportsDropDown] = useState(false);
  const [sliderValue, setSliderValue] = useState([10]);
  const SliderValuesChange = value => setSliderValue(value[0]);
  const [venue, setVenue] = useState([]);
  const [venueId, setVenueId] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [isVenueDropDown, setIsVenueDropDown] = useState(false);
  const [price, setPrice] = useState();
  const [skill, setSkill] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [isSkillsDropDown, setIsSkillDropDown] = useState(false);
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    getAllSports();
    getAllSkills();
  }, []);
  useEffect(() => {
    if (address.lat && sport.id && sliderValue) getVenueList();
    setVenue([]);
  }, [address.lat, sport.id, sliderValue]);
  const sports_skill_Payload = {
    page: 1,
    pageSize: 10,
  };
  const venuesPayload = {
    lat: address.lat,
    long: address.lan,
    radius: sliderValue,
    sportId: sport.id,
  };
  const updateProfilePayload = {
    users: [
      {
        address: address.name,
        bio: bio,
        userType: user?.user?.userType,
        sportId: sport.id,
        profileImage: image,
        latitude: address.lat,
        longitude: address.lan,
        price: price,
        radius: sliderValue,
        accomplishments: tags,
        isTaughtKids: true,
        pastExperience: experience,
        strengths: ['string'],
        sKills: skill,
      },
    ],
    venueList: venueId,
  };
  const getAllSports = () => {
    postReq(apiUrl.baseUrl + apiUrl.getAllSports, sports_skill_Payload)
      .then(res => {
        setSportsList(res?.data?.data);
      })
      .catch(err => console.log('err==>', err));
  };
  const getVenueList = () => {
    postReq(
      apiUrl.baseUrl + apiUrl.getNearVenue,
      venuesPayload,
      user?.access_token,
    )
      .then(res => {
        console.log(res?.data?.data);
        setVenueList(res?.data?.data);
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
  const uploadImage = async image => {
    setIsLoading(true);
    let imagePayload = new FormData();
    imagePayload.append('file', {
      name: image.fileName,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
    profileImageReq(
      apiUrl.baseUrl + apiUrl.uploadProfilePic,
      imagePayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          alert('Profile pic uploaded successfully');
          setImage(data?.data?.url);
        } else alert('Something went wrong');
      })
      .catch(err => {
        setIsLoading(false);
        console.log('error==>', err);
        alert('Something went wrong');
      });
  };
  const imageUpload = () =>
    Alert.alert('Select Image From', '', [
      {
        text: 'Camera',
        onPress: () => openCamera(uploadImage),
      },
      {text: 'Album', onPress: () => launchGallery(uploadImage)},
    ]);

  const addedVenue = val => {
    setIsVenueDropDown(!isVenueDropDown);
    let newObj = {...val.venueId, venueId: val.venueId};
    let index = venueId.findIndex(item => item.venueId === val.venueId);
    if (index === -1) {
      setVenueId([...venueId, newObj]);
    } else {
      let copy = [...venueId];
      copy.splice(index, 1);
      setVenueId(copy);
    }
  };

  const setActiveValue = (index, list, setList) => {
    let copy = [...list];
    copy[index]['isSelected'] = copy[index]['isSelected']
      ? !copy[index]['isSelected']
      : true;
    setList(copy);
  };
  const onChangeText = txt => {
    setText(txt);
    const lastTyped = txt.charAt(txt.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];
    if (parseWhen.indexOf(lastTyped) > -1) {
      setTags([...tags, text]);
      setText('');
    }
  };

  const labelExtractor = tag => tag;
  const handleConfirm = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.updateProfile,
      updateProfilePayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200) console.log(res?.data?.data);
        dispatch(
          addUser({
            user: res?.data?.data,
          }),
        );
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: screenString.DRAWER}],
        //   }),
        // );
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err==>', err);
        alert(err?.returnMessage[0]);
      });
  };
  const isValidConfirm = () => {
    if (!address) alert('Please fill your address.');
    else if (!sport.id) alert('Please select sports.');
    else if (!venue) alert('Please select venue.');
    else if (!price) alert('Please enter your fee');
    else if (!tags) alert('Please enter accomplishment');
    else if (!skill) alert('Please enter your skills');
    else if (!experience) alert('Please enter your experience');
    else if (!bio) alert('Please fill bio about yourself');
    else handleConfirm();
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
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
          {image === null ? (
            <CustomImage source={Images.USER} />
          ) : (
            <CustomImage
              source={{uri: image}}
              style={{
                height: 106,
                width: 106,
                resizeMode: 'cover',
                borderRadius: 100,
                alignSelf: 'center',
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => imageUpload()}
            style={style.iconContainer}>
            <Icon size={20} name={'camera-outline'} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Address"
          onPress={(data, details = null) => {
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
          lable={venue.length === 0 ? 'Select Venue' : venue}
          setLable={setVenue}
          onPress={() => setIsVenueDropDown(!isVenueDropDown)}
          isShown={false}
        />
        {isVenueDropDown && (
          <View
            style={{
              width: '100%',
              marginTop: 10,
              backgroundColor: colors.WHITE,
              alignSelf: 'center',
              padding: 10,
            }}>
            {venueList.length === 0 && (
              <CustomText color={colors.BLACK} fontSize={15} lineHeight={22}>
                {'No venues found'}
              </CustomText>
            )}

            {venueList?.map((val, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setVenue([...venue, val.name]);
                    addedVenue(val);
                    setActiveValue(index, venueList, setVenueList);
                  }}>
                  <Icon
                    name={
                      val?.isSelected
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    color={val?.isSelected ? colors.THEME_BTN : colors.BLACK}
                    size={18}
                  />
                  <CustomText
                    color={val?.isSelected ? colors.THEME_BTN : colors.BLACK}
                    fontSize={15}
                    marginLeft={'5%'}
                    lineHeight={22}>
                    {val.name}
                  </CustomText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <CustomInput
          width="100%"
          marginTop={20}
          borderWidth={1}
          placeholder={'Price'}
          keyboardType={'numeric'}
          value={price}
          onChangeText={txt => setPrice(txt)}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.BORDER_COLOR,
            backgroundColor: colors.BLACK,
            width: '100%',
            height: 40,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <TagInput
            value={tags}
            onChange={tags => setTags(tags)}
            labelExtractor={labelExtractor}
            text={text}
            onChangeText={onChangeText}
            tagColor={colors.THEME_BTN}
            tagTextColor="white"
            inputProps={inputProps}
            scrollViewProps={horizontalScrollViewProps}
            tagContainerStyle={{
              height: 30,
              alignSelf: 'center',
            }}
          />
        </View>
        <DropDown
          width="100%"
          marginTop={20}
          isDropDown={isSkillsDropDown}
          lable={skill.length === 0 ? 'Select Skills' : skill}
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
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSkill([...skill, val.skill]);
                    setIsSkillDropDown(!isSkillsDropDown);
                    setActiveValue(index, skillList, setSkillList);
                  }}>
                  <Icon
                    name={
                      val?.isSelected
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    color={val?.isSelected ? colors.THEME_BTN : colors.BLACK}
                    size={18}
                  />
                  <CustomText
                    color={val?.isSelected ? colors.THEME_BTN : colors.BLACK}
                    fontSize={15}
                    marginLeft={'5%'}
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
          onPress={() => isValidConfirm()}
        />
      </View>
    </ContainerBgImage>
  );
}
