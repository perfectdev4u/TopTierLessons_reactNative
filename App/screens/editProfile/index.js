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
import {getReq, postReq, profileImageReq} from '../../api';
import DropDown from '../../compnents/dropDown';
import {Alert, Platform, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomImage from '../../compnents/customImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/Images';
import {openCamera, launchGallery} from '../../compnents/imageUpload';
import {Loader} from '../../compnents/loader';
import Tags from 'react-native-tags';
import {CommonActions} from '@react-navigation/native';
import {addUser} from '../../redux/reducers/authReducer';
import style from './style';

export default function EditProfile({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  console.log(user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  useEffect(() => {
    getUserProfile();
  }, [user?.access_token]);

  const getUserProfile = () => {
    setIsLoading(true);
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setIsLoading(false);
        console.log('user-->', data.data);
        setImage(data?.data?.profileImage);
        setName(data?.data?.name);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const ProfileDetailsContainer = ({
    title,
    placeholder,
    value,
    onChange,
    editable = true,
  }) => {
    return (
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText alignSelf={'flex-start'} color="#878787">
          {title}
        </CustomText>
        <CustomInput
          width="100%"
          height={22}
          padding={0}
          placeholder={placeholder}
          value={value}
          editable={editable}
          onChangeText={txt => onChange(txt)}
        />
      </View>
    );
  };
  return (
    <ContainerBgImage>
      {/* <Loader modalVisible={isLoading} setModalVisible={setIsLoading} /> */}
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
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
          //onPress={() => imageUpload()}
          style={style.iconContainer}>
          <Icon size={20} name={'pencil'} color={colors.THEME_BTN} />
        </TouchableOpacity>
      </View>
      <ProfileDetailsContainer
        title="Display Name"
        placeholder={'Your Name'}
        value={name}
        onChange={setName}
      />
      <ProfileDetailsContainer
        title="Email"
        placeholder={'Your Email'}
        value={user?.user?.username}
        editable={false}
      />
    </ContainerBgImage>
  );
}
