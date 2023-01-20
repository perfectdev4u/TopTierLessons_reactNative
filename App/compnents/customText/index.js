import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function CustomText({isTouchable = false}) {
  return (
    <TouchableOpacity disabled={!isTouchable}>
      <Text></Text>
    </TouchableOpacity>
  );
}
