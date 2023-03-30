import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import colors from '../../theme/colors';
import {
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import {goBackHandle} from '../../utils/constants';
import {useSelector} from 'react-redux';
import apiUrl from '../../api/apiUrl';
import {getReq, postReq} from '../../api';
import Images from '../../assets/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../compnents/customButton';
import moment from 'moment';
import commonStyle from '../../theme/commonStyle';
import style from '../slots/style';
import {AddChild} from '../../compnents/addChild';

export default function Children({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [childList, setChildList] = useState([]);
  const [type, setType] = useState('');
  const [childId, setChildId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [address, setAddress] = useState({name: '', lat: null, lan: null});
  const [skill, setSkill] = useState('Select Skill');
  const childIdPayload = {
    childId: childId,
  };
  const AddChildPayload = {
    users: [
      {
        name: name,
        address: address.name,
        dateOfBirth: dateOfBirth,
        sportId: null,
        skillLevel:
          skill === 'Begginer' ? 1 : '' || skill === 'Intermidate' ? 2 : 3,
        latitude: address.lat,
        longitude: address.lan,
        userType: user?.user?.userType,
      },
    ],
  };
  const updateChildPayload = {
    childId: childId,
    name: name,
    age: null,
    dateOfBirth: dateOfBirth,
    address: address.name,
    latitude: address.lat,
    longitude: address.lan,
    skillLevel:
      skill === 'Begginer' ? 1 : '' || skill === 'Intermidate' ? 2 : 3,
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  useEffect(() => {
    if (type === 'delete') deleteChild();
    else if (type === 'edit') getChildInfo();
    else null;
  }, [childId, type]);
  const getUserProfile = () => {
    setIsLoading(true);
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setIsLoading(false);
        //console.log('cHild-->', data.data);
        setChildList(data?.data?.children);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const handleClosePopup = () => {
    setIsModalVisible(false);
    setName('');
    setAddress('');
    setDateOfBirth(new Date());
    setSkill('Select Skill');
  };
  const deleteChild = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.deleteChild,
      childIdPayload,
      user?.access_token,
    )
      .then(res => {
        if (res?.data?.statusCode === 200) {
          setIsLoading(false);
          getUserProfile();
          Alert.alert(res?.data?.returnMessage[0]);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('delete_err==>', err);
      });
  };
  const getChildInfo = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getChildbyId,
      childIdPayload,
      user?.access_token,
    )
      .then(res => {
        if (res?.data?.statusCode === 200) {
          setIsLoading(false);
          // console.log('getChildInfo==>', res?.data);
          setIsModalVisible(true);
          setName(res?.data?.data?.childName);
          setAddress({
            name: res?.data?.data?.address,
            lat: res?.data?.data?.latitude,
            lan: res?.data?.data?.longitude,
          });
          setDateOfBirth(res?.data?.data?.age || dateOfBirth);
          setSkill(
            res?.data?.data?.skillLevel === 1
              ? 'Begginer'
              : '' || res?.data?.data?.skillLevel === 2
              ? 'Intermidate'
              : 'Expert',
          );
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('childInfo_err==>', err);
      });
  };
  const isValidForm = () => {
    if (!name) return Alert.alert('Please Fill Child Name.');
    else if (!address.name) return Alert.alert('Please fill Address of Child.');
    else if (!dateOfBirth) return Alert.alert('Please fill D.O.B of Child.');
    else if (skill === 'Select Skill')
      return Alert.alert('Please select Skill Level.');
    else return true;
  };
  const handleAddChild = () => {
    if (isValidForm()) {
      setIsLoading(true);
      postReq(
        apiUrl.baseUrl + apiUrl.updateProfile,
        AddChildPayload,
        user?.access_token,
      )
        .then(res => {
          if (res?.data?.statusCode === 200) {
            Alert.alert('Child added successfully');
            setIsLoading(false);
            handleClosePopup();
            getUserProfile();
            console.log('Add_child==>', res?.data);
          }
        })
        .catch(err => {
          Alert.alert(err?.returnMessage[0]);
          setIsLoading(false);
          console.log('Add_child_err==>', err);
        });
    } else null;
  };
  const handleUpdateChild = () => {
    if (isValidForm()) {
      setIsLoading(true);
      postReq(
        apiUrl.baseUrl + apiUrl.updateChild,
        updateChildPayload,
        user?.access_token,
      )
        .then(res => {
          if (res?.data?.statusCode === 200) {
            Alert.alert(res?.data?.returnMessage[0]);
            setIsLoading(false);
            handleClosePopup();
            getUserProfile();
            console.log('UpdateChild==>', res?.data);
          }
        })
        .catch(err => {
          Alert.alert(err?.returnMessage[0]);
          setIsLoading(false);
          console.log('UpdateChild_err==>', err);
        });
    } else null;
  };
  const ChildItems = ({childName, childId, address, dateOfBirth, index}) => {
    return (
      <View
        key={index}
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {
            height: 60,
            backgroundColor: '#1F1F1F',
            marginTop: 20,
            flex: 1,
            paddingHorizontal: 5,
          },
        ]}>
        <View style={[style.colomContent]}>
          <CustomText fontSize={15}>Name</CustomText>
          <CustomText
            numberOfLines={2}
            marginTop={5}
            lineHeight={15}
            textAlign={'center'}
            fontSize={12}>
            {childName}
          </CustomText>
        </View>
        <View style={[style.colomContent]}>
          <CustomText fontSize={15}>Address</CustomText>
          <CustomText
            numberOfLines={2}
            marginTop={5}
            lineHeight={15}
            textAlign={'center'}
            fontSize={12}>
            {address}
          </CustomText>
        </View>
        <View style={[style.colomContent]}>
          <CustomText fontSize={15}>D.O.B</CustomText>
          <CustomText
            marginTop={5}
            lineHeight={15}
            textAlign={'center'}
            fontSize={12}>
            {moment(dateOfBirth).format('YYYY-MM-DD')}
          </CustomText>
        </View>
        <View style={style.rowRight}>
          <TouchableOpacity
            onPress={() => {
              setChildId(childId);
              setType('edit');
            }}>
            <Icon name={'square-edit-outline'} color={colors.WHITE} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChildId(childId);
              setType('delete');
            }}>
            <Icon name={'delete'} color={colors.WHITE} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => goBackHandle(navigation)}
        title={true}
        lable={'Children'}
        rightIcon={true}
      />

      <View
        style={{
          backgroundColor: '#595959',
          height: 2,
          width: '95%',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
      <CustomButton
        marginTop={20}
        lable={'Add Child'}
        width={'25%'}
        height={35}
        alignSelf={'flex-end'}
        marginRight={'2.5%'}
        onPress={() => {
          setIsModalVisible(true);
          setType('');
        }}
      />
      {isModalVisible && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            top: '15%',
            backgroundColor: '#0005',
          }}>
          <AddChild
            modalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            title={type === 'edit' ? 'Edit Child' : 'Add Child'}
            bttnTitle={type === 'edit' ? 'Update' : 'Submit'}
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            skill={skill}
            setSkill={setSkill}
            handleClosePopup={handleClosePopup}
            handleBttn={type === 'edit' ? handleUpdateChild : handleAddChild}
          />
        </View>
      )}
      <ImageBackground
        source={Images.appBackground}
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
        }}>
        <FlatList
          data={childList}
          style={{marginTop: 10}}
          renderItem={({item, index}) => <ChildItems {...item} index={index} />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={() =>
            !isLoading && (
              <CustomText
                marginTop={50}
                alignSelf={'center'}
                color={colors.THEME_BTN}>
                No Child Added yet!
              </CustomText>
            )
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
