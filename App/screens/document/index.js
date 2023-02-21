import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import {View, TouchableOpacity, Alert, Platform} from 'react-native';
import CustomImage from '../../compnents/customImage';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import style from './style';
import {useSelector, useDispatch} from 'react-redux';
import {Loader} from '../../compnents/loader';
import apiUrl from '../../api/apiUrl';
import {getReq, postReq, profileImageReq} from '../../api';
import {
  openCamera,
  launchGallery,
  uploadRoaster,
} from '../../compnents/imageUpload';
import commonStyle from '../../theme/commonStyle';
import {goBackHandle} from '../../utils/constants';

export default function Documents({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [coachDocuments, setCoachDocuments] = useState([]);
  const [isRoaster, setIsRoaster] = useState(false);
  const [documentList, setDocumentList] = useState([]);

  const documentPayload = {
    docList: [documentList],
  };
  useEffect(() => {
    getUserProfile();
  }, [user]);
  useEffect(() => {
    if (documentList.length > 0) uploadDocumentFile();
  }, [documentList]);

  const getUserProfile = () => {
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        setCoachDocuments(data?.data?.documentsList);
      })
      .catch(err => console.log(err));
  };
  const getFile = async image => {
    let fileUpload = new FormData();
    fileUpload.append('file', {
      name: image.fileName || image.name,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
    profileImageReq(
      apiUrl.baseUrl + apiUrl.uploadFile,
      fileUpload,
      user?.access_token,
    )
      .then(({data}) => {
        if (data?.statusCode === 200) {
          setDocumentList({
            ...documentList,
            document: data?.data?.url,
            documentType: isRoaster ? 1 : 2,
          });
        } else Alert.alert('Something went wrong');
      })
      .catch(err => {
        console.log('error==>', err);
        Alert.alert('Something went wrong');
      });
  };
  const uploadDocumentFile = async () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.documentUpload,
      documentPayload,
      user?.access_token,
    )
      .then(({data}) => {
        setIsLoading(false);
        if (data?.statusCode === 200) {
          console.log('Document-res', data);
          Alert.alert(data?.returnMessage[0]);
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
        onPress: () => openCamera(getFile),
      },
      {text: 'Album', onPress: () => launchGallery(getFile)},
    ]);
  return (
    <ContainerBgImage>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      {!isLoading && (
        <View style={{flex: 1}}>
          <CustomHeader
            leftIcon={'chevron-left'}
            leftIconClick={() => goBackHandle(navigation)}
            title={true}
            lable={'Documents'}
            rightIcon={true}
          />
          <CustomText
            fontSize={20}
            textAlign={'center'}
            lineHeight={30}
            marginTop={50}>
            Simple way to save {'\n'} and shares files.
          </CustomText>
          <Icon
            name={'cloud-upload'}
            color={colors.WHITE}
            style={{alignSelf: 'center', marginTop: 20}}
            size={100}
          />
          <TouchableOpacity
            onPress={() => {
              setIsRoaster(true);
              uploadRoaster(getFile);
            }}
            style={[style.rowContent, {marginTop: 40}]}>
            <View style={style.rowLeft}>
              <CustomText fontSize={13} color={colors.BLACK}>
                Choose File
              </CustomText>
            </View>
            <View style={style.roaster}>
              <CustomText fontSize={14} color={colors.FADED}>
                Roaster
              </CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsRoaster(false);
              imageUpload();
            }}
            style={[style.rowContent, {marginTop: 20}]}>
            <View style={style.rowLeft}>
              <CustomText fontSize={13} color={colors.BLACK}>
                Choose File
              </CustomText>
            </View>
            <View style={style.roaster}>
              <CustomText fontSize={14} color={colors.FADED}>
                Id Proof
              </CustomText>
            </View>
          </TouchableOpacity>
          <CustomButton
            marginTop={70}
            lable={'Submit'}
            width={'80%'}
            alignSelf={'center'}
          />
          {coachDocuments.length > 0 || isLoading ? (
            <View>
              <CustomText marginTop={40} alignSelf={'center'} fontSize={18}>
                Documents List
              </CustomText>
              <View
                style={[
                  commonStyle.row('90%', 'space-between', 'center'),
                  {marginTop: 20, flex: 1, paddingHorizontal: 10},
                ]}>
                <CustomText alignSelf={'center'}>Image</CustomText>
                <CustomText alignSelf={'center'}>Document Type</CustomText>
                <CustomText alignSelf={'center'}>Status</CustomText>
              </View>
              {coachDocuments.map((val, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      commonStyle.row('90%', 'space-between', 'center'),
                      {marginTop: 10, flex: 1, paddingHorizontal: 10},
                    ]}>
                    <CustomImage
                      source={{uri: val.document}}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: 'center',
                        borderRadius: 35,
                      }}
                    />
                    <CustomText alignSelf={'center'} fontSize={14}>
                      {val.documentType}
                    </CustomText>
                    <CustomText
                      color={
                        val.status === 'Pending' ? colors.THEME_BTN : 'green'
                      }
                      alignSelf={'center'}
                      fontSize={14}>
                      {val.status}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          ) : (
            <CustomText marginTop={40} alignSelf={'center'} fontSize={18}>
              No Documnets Uploaded Yet!
            </CustomText>
          )}
        </View>
      )}
    </ContainerBgImage>
  );
}
