import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import commonStyle from '../../theme/commonStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Images from '../../assets/Images';
import colors from '../../theme/colors';

export default function ContainerBgImage({children: ChildComponent}) {
  return (
    <ImageBackground
      source={Images.appBackground}
      style={commonStyle.container(colors.BLACK)}
     >
      <SafeAreaView style={[commonStyle.container()]}>
        <KeyboardAwareScrollView
          style={commonStyle.container()}
          showsVerticalScrollIndicator={false}>
          {ChildComponent}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
