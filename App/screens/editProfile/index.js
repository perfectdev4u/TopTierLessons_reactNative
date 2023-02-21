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
import {getReq, postReq, profileImageReq} from '../../api';
import DropDown from '../../compnents/dropDown';
import {Alert, Platform, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomImage from '../../compnents/customImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {openCamera, launchGallery} from '../../compnents/imageUpload';
import {Loader} from '../../compnents/loader';
import style from './style';
import {goBackHandle} from '../../utils/constants';

export default function EditProfile({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState({name: '', lat: null, lan: null});
  const [sport, setSport] = useState({name: 'Select Sport', id: null});
  const [sportsList, setSportsList] = useState([]);
  const [isSportsDropDown, setIsSportsDropDown] = useState(false);
  const [price, setPrice] = useState(0);
  const [bio, setBio] = useState('');
  const sports_skill_Payload = {
    page: 1,
    pageSize: 10,
  };
  useEffect(() => {
    getUserProfile();
    getAllSports();
  }, [user?.access_token]);

  const getUserProfile = () => {
    setIsLoading(true);
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setIsLoading(false);
        console.log('user-->', data.data);
        setImage(data?.data?.profileImage);
        setName(data?.data?.name);
        setPhoneNum(data?.data?.phoneNumber);
        setAddress({
          name: data?.data?.address,
          lat: data?.data?.latitude,
          lan: data?.data?.longitude,
        });
        setSport({name: data?.data?.sportName, id: data?.data?.sportId});
        setPrice(data?.data?.price);
        setBio(data?.data?.bio);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const getAllSports = () => {
    postReq(apiUrl.baseUrl + apiUrl.getAllSports, sports_skill_Payload)
      .then(res => {
        setSportsList(res?.data?.data);
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
          Alert.alert('Profile pic uploaded successfully');
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
  const ProfileDetailsContainer = ({
    title,
    placeholder,
    value,
    onChange,
    editable = true,
    multiline = false,
    height = 22,
  }) => {
    return (
      <View
        style={{
          marginTop: 20,
          marginLeft: '2.5%',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText alignSelf={'flex-start'} color="#878787">
          {title}
        </CustomText>
        <CustomInput
          width="100%"
          height={height}
          padding={0}
          placeholder={placeholder}
          value={value}
          editable={editable}
          onChangeText={onChange}
          multiline={multiline}
        />
      </View>
    );
  };
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      {!isLoading && (
        <View style={{flex: 1}}>
          <CustomHeader
            leftIcon={'chevron-left'}
            leftIconClick={() => goBackHandle(navigation)}
          />
          <CustomText fontSize={32} lineHeight={38} alignSelf={'center'}>
            Profile
          </CustomText>
          <View style={style.rowContents}>
            <View />
            <CustomImage
              source={{
                uri: image,
              }}
              style={style.profileImage}
            />
            <TouchableOpacity
              onPress={() => imageUpload()}
              style={style.iconContainer}>
              <Icon size={20} name={'pencil'} color={colors.THEME_BTN} />
            </TouchableOpacity>
          </View>
          <ProfileDetailsContainer
            title="Display Name"
            placeholder={'Your Name'}
            value={name}
            onChange={txt => setName(txt)}
          />
          <ProfileDetailsContainer
            title="Phone Number"
            placeholder={'Phone Number'}
            value={phoneNum}
            onChange={txt => setPhoneNum(txt)}
          />
          <ProfileDetailsContainer
            title="Email"
            placeholder={'Your Email'}
            value={user?.user?.username}
            editable={false}
          />
          <CustomText marginLeft={'2.5%'} marginTop={20} color="#878787">
            Address
          </CustomText>
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
              textInput: {
                height: 22,
                color: colors.WHITE,
                fontSize: 15,
                backgroundColor: 'black',
                fontFamily: 'Gotham Bold',
              },
              container: {
                width: '100%',
                alignSelf: 'center',
                marginLeft: '2.5%',
                marginTop: 5,
              },
            }}
          />
          {user?.user?.userType === 2 && (
            <CustomText marginLeft={'2.5%'} marginTop={15} color="#878787">
              Sport
            </CustomText>
          )}
          {user?.user?.userType === 2 && (
            <DropDown
              width="95%"
              marginTop={5}
              isDropDown={isSportsDropDown}
              lable={sport.name}
              setLable={setSport}
              onPress={() => setIsSportsDropDown(!isSportsDropDown)}
              isShown={false}
            />
          )}
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
          {user?.user?.userType === 2 && (
            <ProfileDetailsContainer
              title="Price"
              placeholder={'Price'}
              value={price.toString()}
              onChange={txt => setPrice(txt)}
            />
          )}
          {user?.user?.userType === 2 && (
            <ProfileDetailsContainer
              title="Bio"
              placeholder={'Bio'}
              value={bio}
              onChange={txt => setBio(txt)}
              multiline={true}
              height={150}
            />
          )}
          <CustomButton
            width="80%"
            alignSelf={'center'}
            marginTop={50}
            lable="Update"
            onPress={() => Alert.alert('inProcess')}
          />
        </View>
      )}
    </ContainerBgImage>
  );
}
