import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {View, TouchableOpacity} from 'react-native';
import CustomText from '../../compnents/customText';
import { goBackHandle } from '../../utils/constants';

export default function Notifications({navigation}) {
  const [isPressed, setIsPressed] = useState(false);
  const notifications = [
    {
      title:
        'Malesuada tellus tincidunt fringillaenim, id mauris. Id etiam nibh suscipit aliquam dolor.',
      time: 'Jan 23 2021 at 9:15 AM',
    },
    {
      title:
        'Malesuada tellus tincidunt fringillaenim, id mauris. Id etiam nibh suscipit aliquam dolor.',
      time: 'Jan 23 2021 at 9:15 AM',
    },
    {
      title:
        'Malesuada tellus tincidunt fringillaenim, id mauris. Id etiam nibh suscipit aliquam dolor.',
      time: 'Jan 23 2021 at 9:15 AM',
    },
  ];
  const longClickHandle = () => {
    setIsPressed(true);
  };
  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => goBackHandle(navigation)}
        title={true}
        lable={'Notifications'}
      />
      <View style={{flex: 1, width: '95%', alignSelf: 'center'}}>
        <View
          style={[
            commonStyle.row('100%', 'space-between', 'center'),
            {marginTop: 20},
          ]}>
          <CustomText fontSize={16} lineHeight={24}>
            {isPressed ? 'Mark All' : `All`}
          </CustomText>
          {isPressed && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.THEME_BTN,
                height: 35,
                paddingHorizontal: 25,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={'delete'} size={25} color={colors.WHITE} />
            </TouchableOpacity>
          )}
        </View>
        {notifications.map((val, index) => {
          return (
            <TouchableOpacity
              key={index}
              onLongPress={() => longClickHandle()}
              style={[
                commonStyle.row('100%', 'flex-start', 'center'),
                {marginTop: 30, alignItems: 'flex-start'},
              ]}>
              <View
                style={{
                  backgroundColor: 'rgba(227, 130, 38, 0.2)',
                  height: 38,
                  width: 38,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={
                    isPressed
                      ? 'checkbox-marked-outline'
                      : 'check-circle-outline'
                  }
                  size={25}
                  color={colors.THEME_BTN}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <CustomText>{val.title}</CustomText>
                <CustomText fontSize={10} marginTop={5} color="#A7A7A7">
                  {val.time}
                </CustomText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ContainerBgImage>
  );
}
