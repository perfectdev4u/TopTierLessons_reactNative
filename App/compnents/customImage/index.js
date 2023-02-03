import React, {memo} from 'react';
import {Image} from 'react-native';

export default memo(function CustomImage({source, style}) {
  if (source) return <Image source={source} style={style} />;
  return null;
});