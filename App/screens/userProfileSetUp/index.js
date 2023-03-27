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

let defaultFormData = [
  {
    name: null,
    address: '',
    dateOfBirth: '',
    sportsName: 'Select Sport',
    sportId: null,
    skill: 'Skill Level',
    skillLevel: 2,
    latitude: 0,
    longitude: 0,
  },
];

export default function UserProfileSetUp({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [image, setImage] = useState(null);
  //const [sport, setSport] = useState({name: '', id: null});
  const [sportsList, setSportsList] = useState([]);
  const [isSportsDropDown, setIsSportsDropDown] = useState(false);
  const [isSkillDropDown, setIsSkillDropDown] = useState(false);
  const SkillType = ['Begginer', 'Intermidate', 'Expert'];
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
    users: [...formData, {userType: user?.user?.userType, profileImage: image}],
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
      address: '',
      age: '',
      sportsName: 'Select Sport',
      sportId: null,
      skill: 'Skill Level',
      skillLevel: 2,
    };
    setFormData([...formData, obj]);
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
        if (res?.status === 200) console.log(res?.data?.data);
        // dispatch(
        //   addUser({
        //     user: res?.data?.data,
        //   }),
        // );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: screenString.DRAWER}],
          }),
        );
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
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
      />
      <CustomText fontSize={32} lineHeight={38} alignSelf={'center'}>
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

      {formData.map((item, i) => {
        return (
          <View style={{flex: 1}} key={i}>
            {user?.user?.userType === 4 && (
              <CustomInput
                marginTop={50}
                borderWidth={1}
                placeholder={'Child Name'}
                value={item.name}
                onChangeText={name => onChangeHandler('name', name, i)}
              />
            )}
            {user?.user?.userType === 4 && (
              <TextInputMask
                type={'datetime'}
                placeholder={'D.O.B (YYYY/MM/DD)'}
                placeholderTextColor={'#D4D4D4'}
                options={{
                  format: 'YYYY-MM-DD',
                }}
                value={item.dateOfBirth}
                onChangeText={dateOfBirth => {
                  onChangeHandler('dateOfBirth', dateOfBirth, i);
                }}
                style={style.dobInput}
              />
            )}
            <GooglePlacesAutocomplete
              placeholder="Address"
              onPress={(data, details = null) => {
                onChangeHandler('address', data?.description, i);
                // setFormData({
                //   ...formData,
                //   latitude: details?.geometry?.location?.lat,
                //   longitude: details?.geometry?.location?.lan,
                // });
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
                onChangeText: address => onChangeHandler('address', address, i),
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

            <DropDown
              marginTop={20}
              isDropDown={isSportsDropDown}
              lable={item.sportsName}
              setLable={sportsName =>
                onChangeHandler('sportsName', sportsName, i)
              }
              onPress={() => setIsSportsDropDown(!isSportsDropDown)}
              isShown={false}
              onSelect
            />
            {isSportsDropDown && (
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
                        //setSport({name: val.sportName, id: val.sportId});
                        setIsSportsDropDown(!isSportsDropDown);
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
              isDropDown={isSkillDropDown}
              lable={item.skill}
              setLable={skill => onChangeHandler('skill', skill, i)}
              onPress={() => setIsSkillDropDown(!isSkillDropDown)}
              isShown={isSkillDropDown}
              onSelect={() => {
                //onChangeHandler('skillLevel', skillLevel, i);
                setIsSkillDropDown(!isSkillDropDown);
              }}
              data={SkillType}
            />
          </View>
        );
      })}

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
