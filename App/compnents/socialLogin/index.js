import {LoginManager, Profile} from 'react-native-fbsdk-next';
export const LoginwithFsbk = async () => {
  return await LoginManager.logInWithPermissions(['public_profile']).then(
    result => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        Profile.getCurrentProfile().then(function (currentProfile) {
          if (currentProfile) {
            console.log('currentProfile==>', currentProfile);
          }
        });
      }
      error => {
        console.log('Login fail with error: ' + error);
      };
    },
  );
};
