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
import {postReq} from '../../api';
import {TextInputMask} from 'react-native-masked-text';
import DropDown from '../../compnents/dropDown';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../../compnents/customImage';
import Images from '../../assets/Images';
import style from './style';
import {useSelector, useDispatch} from 'react-redux';

export default function UserProfileSetUp({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  console.log(user);
  const defaultFormData = [
    {
      name: '',
      address: '',
      age: '',
      // sportsName: 'Sport',
      //sportsId: '',
      skillLevel: 'Skill Level',
    },
  ];
  //const [sport, setSport] = useState({name: 'Sport', id: null});
  //const [sportsList, setSportsList] = useState([]);
  const [isSkillDropDown, setIsSkillDropDown] = useState(false);
  const SkillType = ['Begginer', 'Intermidate', 'Expert'];
  const [formData, setFormData] = useState(defaultFormData);

  // useEffect(() => {
  //   getAllSports();
  // }, []);
  // const sportsPayload = {
  //   page: 1,
  //   pageSize: 20,
  // };
  // const getAllSports = () => {
  //   postReq(apiUrl.baseUrl + apiUrl.getAllSports, sportsPayload)
  //     .then(res => {
  //       setSportsList(res?.data?.data);
  //     })
  //     .catch(err => console.log('err==>', err));
  // };
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
      //sportsName: 'Sports',
      //sportsId: '',
      skillLevel: 'Skill Level',
    };
    setFormData([...formData, obj]);
  };
  return (
    <ContainerBgImage>
      <CustomHeader />
      <CustomText
        fontSize={32}
        lineHeight={38}
        fontWeight={'700'}
        alignSelf={'center'}>
        Set Up Profile
      </CustomText>

      {user?.userType === 3 && (
        <View style={style.imageContaioner}>
          <CustomImage source={Images.USER} />
          <TouchableOpacity style={style.iconContainer}>
            <Icon
              size={20}
              name={'camera-outline'}
              color={colors.WHITE}
              onPress={() => alert('inprocess')}
            />
          </TouchableOpacity>
        </View>
      )}

      {formData.map((item, i) => {
        return (
          <View style={{flex: 1}} key={i}>
            <CustomInput
              marginTop={50}
              borderWidth={1}
              placeholder={'Child Name'}
              value={item.name}
              onChangeText={name => onChangeHandler('name', name, i)}
            />
            <GooglePlacesAutocomplete
              placeholder="Address"
              onPress={(data, details = null) => {
                onChangeHandler('address', data?.description, i);
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
            <TextInputMask
              type={'datetime'}
              placeholder={'D.O.B (YYYY/MM/DD)'}
              placeholderTextColor={'#D4D4D4'}
              options={{
                format: 'YYYY-MM-DD',
              }}
              value={item.age}
              onChangeText={age => {
                onChangeHandler('age', age, i);
              }}
              style={style.dobInput}
            />

            {/* <DropDown
              marginTop={20}
              isDropDown={isSportsDropDown}
              lable={item.sportsName}
              setLable={val => onChangeHandler(val, i)}
              onPress={() => setIsSportsDropDown(!isSportsDropDown)}
              isShown={false}
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
                        onChangeHandler(val.sportName, i);
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
            )} */}

            <DropDown
              marginTop={20}
              isDropDown={isSkillDropDown}
              lable={item.skillLevel}
              setLable={skillLevel =>
                onChangeHandler('skillLevel', skillLevel, i)
              }
              onPress={() => setIsSkillDropDown(!isSkillDropDown)}
              isShown={isSkillDropDown}
              onSelect={() => setIsSkillDropDown(!isSkillDropDown)}
              data={SkillType}
            />
          </View>
        );
      })}

      {user?.userType === 4 && (
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
        onPress={() => navigation.navigate(screenString.LOGIN)}
      />
    </ContainerBgImage>
  );
}
