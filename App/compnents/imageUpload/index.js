import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openCamera = async uploadImage => {
  const result = await launchCamera({mediaType: 'photo'});
  if (result?.didCancel) {
    console.log(result.didCancel);
  } else if (result?.assets) {
    uploadImage(result?.assets[0]);
  } else if (result?.errorCode) {
    console.log(result?.errorCode);
  } else if (result?.errorMessage) {
    console.log(result?.errorMessage);
  }
};

export const launchGallery = async uploadImage => {
  const result = await launchImageLibrary({mediaType: 'photo'});
  if (result?.didCancel) {
    console.log(result.didCancel);
  } else if (result?.assets) {
    uploadImage(result?.assets[0]);
  } else if (result?.errorCode) {
    console.log(result?.errorCode);
  } else if (result?.errorMessage) {
    console.log(result?.errorMessage);
  }
};
