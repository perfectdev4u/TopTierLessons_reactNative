import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/Images';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {View, TouchableOpacity} from 'react-native';
import CustomImage from '../../compnents/customImage';
import CustomText from '../../compnents/customText';
import CustomButton from '../../compnents/customButton';
import style from './style';

export default function Documents({navigation}) {
  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
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
      <TouchableOpacity style={[style.rowContent, {marginTop: 40}]}>
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
      <TouchableOpacity style={[style.rowContent, {marginTop: 20}]}>
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
    </ContainerBgImage>
  );
}
