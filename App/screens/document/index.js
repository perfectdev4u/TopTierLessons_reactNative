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
import {useSelector} from 'react-redux';
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
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import {ShomImage} from '../../compnents/showImage';

export default function Documents({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [coachDocuments, setCoachDocuments] = useState([]);
  const [isRoaster, setIsRoaster] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [url, setUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const documentPayload = {
    docList: [documentList],
  };
  useEffect(() => {
    getUserProfile();
  }, [user]);
  const getUserProfile = () => {
    getReq(apiUrl.baseUrl + apiUrl.getUserProfile, user?.access_token)
      .then(({data}) => {
        // console.log('data?.data==>', data?.data);
        setCoachDocuments(data?.data?.documentsList);
      })
      .catch(err => console.log(err));
  };
  const getFile = async image => {
    setIsLoading(true);
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
        setIsLoading(false);
        if (data?.statusCode === 200) {
          setDocumentList({
            ...documentList,
            document: data?.data?.url,
            documentType: isRoaster ? 1 : 2,
          });
          Alert.alert('Click on Submit for Upload!');
        } else Alert.alert('Something went wrong');
      })
      .catch(err => {
        setIsLoading(false);
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
          getUserProfile();
          setDocumentList([]);
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
  const handleSubmit = () => {
    if (documentList.length === 0) Alert.alert('Please add document first');
    else uploadDocumentFile();
  };
  const downloadDocument = async file => {
    let Type = file.split('.');
    let urlIndex = Type.length - 1;
    let exten = Type[urlIndex];
    //setIsLoading(true);
    const dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      path: dirs.DocumentDir + '/' + `TopTier${Math.random()}` + `.${exten}`,
      fileCache: true,
    })
      .fetch('GET', encodeURI(file))
      .then(res => {
        // setIsLoader(false);
        FileViewer.open(res.data);
      })
      .catch(e => {
        //setIsLoading(false)
        console.log('Error document fetch: ', e);
      });
  };
  const handleShowDocument = type => {
    if (type.documentType === 'IdProof') {
      setModalVisible(true);
      setUrl(type.document);
    } else downloadDocument(type.document);
  };
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
            onPress={handleSubmit}
          />
          {!isLoading || coachDocuments.length > 0 ? (
            <View style={{flex: 1}}>
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
                  <TouchableOpacity
                    onPress={() => handleShowDocument(val)}
                    key={index}
                    style={[
                      commonStyle.row('90%', 'space-between', 'center'),
                      {marginTop: 10, flex: 1, paddingHorizontal: 10},
                    ]}>
                    {val.documentType === 'IdProof' ? (
                      <CustomImage
                        source={{uri: val.document}}
                        style={{
                          height: 35,
                          width: 35,
                          alignSelf: 'center',
                          borderRadius: 35,
                        }}
                      />
                    ) : (
                      <Icon
                        name={'file-document-outline'}
                        size={35}
                        color={colors.THEME_BTN}
                      />
                    )}
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
                  </TouchableOpacity>
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
      <ShomImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        url={url}
      />
    </ContainerBgImage>
  );
}
