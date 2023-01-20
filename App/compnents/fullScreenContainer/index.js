import React from 'react';
import {SafeAreaView} from 'react-native';
import commonStyle from '../../theme/commonStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function FullScreenContainer({
  children: ChildComponent,
  justifyContent,
}) {
  return (
    <SafeAreaView
      style={[commonStyle.container, {justifyContent: justifyContent}]}>
      <KeyboardAwareScrollView
        style={commonStyle.container}
        showsVerticalScrollIndicator={false}>
        {ChildComponent}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
