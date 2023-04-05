import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomText from '../../compnents/customText';
import CustomInput from '../../compnents/CustomInput';
import CustomButton from '../../compnents/customButton';
import screenString from '../../navigation/screenString';
import CustomHeader from '../../compnents/customHeader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../../theme/colors';
import apiUrl from '../../api/apiUrl';
import {postReq, profileImageReq} from '../../api';
import {TextInputMask} from 'react-native-masked-text';
import DropDown from '../../compnents/dropDown';
import {Alert, Platform, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../../compnents/customImage';
import style from './style';
import {useSelector, useDispatch} from 'react-redux';
import {openCamera, launchGallery} from '../../compnents/imageUpload';
import {Loader} from '../../compnents/loader';
import {CommonActions} from '@react-navigation/native';
import {defaultpic} from '../../utils/constants';
import {addUser} from '../../redux/reducers/authReducer';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

export default function UserProfileSetUp({route, navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState({name: '', lat: null, lan: null});
  const [sportsList, setSportsList] = useState([]);
  const SkillType = ['Begginer', 'Intermidate', 'Expert'];
  let defaultFormData = [
    {
      name: null,
      address: '',
      latitude: 0,
      longitude: 0,
      dateOfBirth: new Date(),
      sportsName: 'Select Sport',
      sportId: null,
      skill: 'Skill Level',
      skillLevel: 0,
      userType: user?.user?.userType,
      profileImage: image,
      open: false,
      isSportsDropDown: false,
      isSkillDropDown: false,
    },
  ];
  const [formData, setFormData] = useState(defaultFormData);
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
  const updateProfilePayload = {
    users: formData,
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
          Alert.alert('Profile pic uploaded successfully');
          //setFormData([formData, {profileImage: data?.data?.url}]);
          setImage(data?.data?.url);
        } else Alert.alert('Something went wrong');
      })
      .catch(err => {
        setIsLoading(false);
        console.log('error==>', err);
        Alert.alert('Something went wrong');
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
  const onChangeHandler = (label, value, index) => {
    let newFormValues = [...formData];
    newFormValues[index][label] = value;
    setFormData(newFormValues);
  };
  const addChild = () => {
    let obj = {
      name: '',
      address: address.name,
      dateOfBirth: new Date(),
      sportsName: 'Select Sport',
      sportId: null,
      skill: 'Skill Level',
      skillLevel: 0,
      latitude: address.lat,
      longitude: address.lan,
      userType: user?.user?.userType,
      profileImage: image,
      open: false,
      isSportsDropDown: false,
      isSkillDropDown: false,
    };
    setFormData([...formData, obj]);
  };
  const cancelHandle = index => {
    let data = formData.filter((item, i) => i !== index);
    setFormData(data);
  };
  const handleUpdateProfile = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.updateProfile,
      updateProfilePayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.status === 200) {
          //console.log(res?.data?.data);
          dispatch(
            addUser({
              ...user,
              user_address: address.name[0],
            }),
          );
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: screenString.DRAWER}],
            }),
          );
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Update_User_Err==>', err);
        Alert.alert(err?.returnMessage[0]);
      });
  };
  const confirmHandler = e => {
    e.preventDefault();
    if (
      formData[0].address === '' ||
      formData[0].sportsName === '' ||
      formData[0].skill === ''
    ) {
      Alert.alert('please fill all fields');
    } else {
      handleUpdateProfile();
    }
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      {route?.path !== undefined && (
        <CustomHeader
          leftIcon={'chevron-left'}
          leftIconClick={() => navigation.goBack()}
        />
      )}
      <CustomText
        marginTop={30}
        fontSize={32}
        lineHeight={38}
        alignSelf={'center'}>
        Set Up Profile
      </CustomText>
      {user?.user?.userType === 3 && (
        <View style={style.imageContaioner}>
          <CustomImage
            source={{uri: image ? image : defaultpic}}
            style={{
              height: 106,
              width: 106,
              resizeMode: 'cover',
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />

          <TouchableOpacity
            onPress={() => imageUpload()}
            style={style.iconContainer}>
            <Icon size={20} name={'camera-outline'} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      )}
      <View style={{flex: 1, marginTop: 30}}>
        {formData.map((item, i) => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: i > 0 ? 'grey' : 'black',
                marginTop: 10,
                padding: i > 0 ? 3 : 0,
                paddingBottom: 20,
              }}
              key={i}>
              {i > 0 && (
                <TouchableOpacity
                  onPress={() => cancelHandle(i)}
                  style={{alignSelf: 'flex-end', paddingBottom: 10}}>
                  <Icon name={'close'} color={colors.THEME_BTN} size={25} />
                </TouchableOpacity>
              )}
              {i === 0 ? (
                <GooglePlacesAutocomplete
                  placeholder="Address"
                  listViewDisplayed={false}
                  onPress={(data, details) => {
                    setAddress({
                      name: data?.description,
                      lat: details?.geometry?.location?.lat,
                      lan: details?.geometry?.location?.lng,
                    });
                    onChangeHandler('address', data?.description, i);
                    onChangeHandler(
                      'latitude',
                      details?.geometry?.location?.lat,
                      i,
                    );
                    onChangeHandler(
                      'longitude',
                      details?.geometry?.location?.lng,
                      i,
                    );
                  }}
                  query={{
                    key: 'AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ',
                    language: 'en',
                  }}
                  returnKeyType={'default'}
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  textInputProps={{
                    value: item.address,
                    placeholderTextColor: '#D4D4D4',
                    onChangeText: address => {
                      setAddress(address);
                      onChangeHandler('address', address, i);
                    },
                  }}
                  styles={{
                    textInputContainer: {
                      marginTop: 20,
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
                      width: '90%',
                      alignSelf: 'center',
                    },
                  }}
                />
              ) : null}
              {user?.user?.userType === 4 && (
                <CustomInput
                  marginTop={20}
                  borderWidth={1}
                  placeholder={'Child Name'}
                  value={item.name}
                  onChangeText={name => onChangeHandler('name', name, i)}
                />
              )}
              {user?.user?.userType === 4 && (
                <View>
                  <CustomInput
                    editable={false}
                    marginTop={20}
                    borderWidth={1}
                    value={
                      item.dateOfBirth === new Date()
                        ? 'Select (D.O.B (YYYY-MM-DD))'
                        : `${moment(item.dateOfBirth).format(
                            'YYYY-MM-DD',
                          )} - (D.O.B)`
                    }
                    // onChangeText={dateOfBirth =>
                    //   onChangeHandler('dateOfBirth', dateOfBirth, i)
                    // }
                    rightComponent={
                      <TouchableOpacity
                        onPress={() => onChangeHandler('open', !item.open, i)}
                        style={{marginRight: 10}}>
                        <Icon
                          name="calendar-month-outline"
                          color={colors.BORDER_COLOR}
                          size={25}
                        />
                      </TouchableOpacity>
                    }
                  />
                  <DatePicker
                    modal
                    mode="date"
                    open={item.open}
                    date={item.dateOfBirth}
                    onConfirm={dateOfBirth => {
                      onChangeHandler('open', !item.open, i);
                      onChangeHandler('dateOfBirth', dateOfBirth, i);
                    }}
                    onCancel={() => {
                      onChangeHandler('open', !item.open, i);
                    }}
                  />
                </View>
              )}
              <DropDown
                marginTop={20}
                isDropDown={item.isSportsDropDown}
                lable={item.sportsName}
                setLable={sportsName =>
                  onChangeHandler('sportsName', sportsName, i)
                }
                onPress={() =>
                  onChangeHandler('isSportsDropDown', !item.isSportsDropDown, i)
                }
                isShown={false}
                onSelect
              />
              {item.isSportsDropDown && (
                <View
                  style={{
                    width: '90%',
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
                          onChangeHandler(
                            'isSportsDropDown',
                            !item.isSportsDropDown,
                            i,
                          );
                          onChangeHandler('sportsName', val.sportName, i);
                          onChangeHandler('sportId', val.sportId, i);
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
              <DropDown
                marginTop={20}
                isDropDown={item.isSkillDropDown}
                lable={item.skill}
                setLable={skill => onChangeHandler('skill', skill, i)}
                onPress={() =>
                  onChangeHandler('isSkillDropDown', !item.isSkillDropDown, i)
                }
                isShown={item.isSkillDropDown}
                onSelect={() => {
                  onChangeHandler(
                    'skillLevel',
                    item.skill === 'Begginer'
                      ? 1
                      : '' || item.skill === 'Intermidate'
                      ? 2
                      : 3,
                    i,
                  );
                  onChangeHandler('isSkillDropDown', !item.isSkillDropDown, i);
                }}
                data={SkillType}
              />
            </View>
          );
        })}
      </View>
      {user?.user?.userType === 4 && (
        <View style={[commonStyle.row('90%', 'center'), {marginTop: 30}]}>
          <Icon
            size={25}
            name={'plus-circle-outline'}
            color={colors.THEME_BTN}
            onPress={() => addChild()}
          />
          <CustomText marginLeft={10} fontSize={14} lineHeight={22}>
            Add Another Child
          </CustomText>
        </View>
      )}
      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Confirm"
        onPress={confirmHandler}
      />
    </ContainerBgImage>
  );
}
