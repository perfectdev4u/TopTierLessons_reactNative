import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../customImage';
import CustomText from '../customText';
import {launchGallery, openCamera, uploadRoaster} from '../imageUpload';
import apiUrl from '../../api/apiUrl';
import {postReq, profileImageReq} from '../../api';
import {useSelector} from 'react-redux';

export const CoachDocuments = ({
  roaster,
  setRoaster,
  idProof,
  setIdProof,
  setIsLoading,
}) => {
  const {user} = useSelector(state => state.authReducer);
  const [isRoaster, setIsRoaster] = useState(false);
  const [documentList, setDocumentList] = useState(null);
  const types = ['Roaster', 'Not a Roaster'];
  const [isActive, setIsActive] = useState(0);
  const documentPayload = {
    docList: [documentList],
  };
  useEffect(() => {
    if (documentList) uploadDocumentFile();
  }, [documentList]);
  //console.log(documentPayload);
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
          if (isRoaster) setRoaster(data?.data?.url);
          else setIdProof(data?.data?.url);
          setDocumentList({
            ...documentList,
            document: data?.data?.url,
            documentType: isRoaster ? 1 : 2,
          });
        } else Alert.alert('Something went wrong');
      })
      .catch(err => {
        setIsLoading(false);
        console.log('error==>', err);
        Alert.alert('Something went wrong');
      });
  };
  const uploadDocumentFile = async () => {
    postReq(
      apiUrl.baseUrl + apiUrl.documentUpload,
      documentPayload,
      user?.access_token,
    )
      .then(({data}) => {
        if (data?.statusCode === 200) {
          console.log('Document-res', data);
          Alert.alert(data?.returnMessage[0]);
        } else Alert.alert('Something went wrong');
      })
      .catch(err => {
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
  //   const downloadDocument = async file => {
  //     let Type = file.split('.');
  //     let urlIndex = Type.length - 1;
  //     let exten = Type[urlIndex];
  //     //setIsLoading(true);
  //     const dirs = RNFetchBlob.fs.dirs;
  //     RNFetchBlob.config({
  //       path: dirs.DocumentDir + '/' + `TopTier${Math.random()}` + `.${exten}`,
  //       fileCache: true,
  //     })
  //       .fetch('GET', encodeURI(file))
  //       .then(res => {
  //         // setIsLoader(false);
  //         FileViewer.open(res.data);
  //       })
  //       .catch(e => {
  //         //setIsLoading(false)
  //         console.log('Error document fetch: ', e);
  //       });
  //   };
  //   const handleShowDocument = type => {
  //     if (type.documentType === 'IdProof') {
  //       setModalVisible(true);
  //       setUrl(type.document);
  //     } else downloadDocument(type.document);
  //   };
  return (
    <View style={{width: '100%'}}>
      <View
        style={[
          commonStyle.row('100%', 'space-between', 'center'),
          {
            marginTop: 10,
          },
        ]}>
        <View style={{alignSelf: 'flex-start', width: '52%'}}>
          <View style={commonStyle.row('100%', 'space-between', 'flex-start')}>
            {types?.map((val, index) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setIsActive(index)}
                  key={index}>
                  <Icon
                    size={15}
                    name={
                      isActive === index ? 'circle-slice-8' : 'circle-outline'
                    }
                    color={isActive === index ? colors.THEME_BTN : colors.FADED}
                  />
                  <CustomText
                    color={isActive === index ? colors.THEME_BTN : colors.WHITE}
                    marginLeft={3}
                    fontSize={13}
                    textAlign={'center'}>
                    {val}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsRoaster(true);
              uploadRoaster(getFile);
            }}
            style={[style.rowContent, {marginTop: 10}]}>
            <View style={style.rowLeft}>
              <CustomText fontSize={10} color={colors.BLACK}>
                Choose File
              </CustomText>
            </View>
            <View style={style.roaster}>
              <CustomText fontSize={12} color={colors.FADED}>
                Roaster
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'flex-start', width: '46%'}}>
          <CustomText fontSize={13}>Id Proof</CustomText>
          <TouchableOpacity
            onPress={() => {
              setIsRoaster(false);
              imageUpload();
            }}
            style={[style.rowContent, {marginTop: 10}]}>
            <View style={style.rowLeft}>
              <CustomText fontSize={10} color={colors.BLACK}>
                Choose File
              </CustomText>
            </View>
            <View style={style.roaster}>
              <CustomText fontSize={12} color={colors.FADED}>
                Id Proof
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {roaster ||
        (idProof && (
          <View
            style={[
              commonStyle.row('100%', 'space-around', 'center'),
              {
                marginTop: 10,
              },
            ]}>
            {roaster ? (
              <Icon
                name={'file-document-outline'}
                size={35}
                color={colors.THEME_BTN}
              />
            ) : (
              <View></View>
            )}
            <CustomImage
              source={{uri: idProof}}
              style={{
                height: 35,
                width: 35,
                alignSelf: 'center',
                borderRadius: 35,
              }}
            />
          </View>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  rowContent: {
    alignSelf: 'flex-start',
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowLeft: {
    width: '40%',
    height: '100%',
    backgroundColor: '#F8EDE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roaster: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
