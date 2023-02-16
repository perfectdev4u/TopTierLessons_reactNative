import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

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

export const uploadRoaster = async uploadFile => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    uploadFile(res[0]);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Canceled from single doc picker');
    } else {
      console.log('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};
