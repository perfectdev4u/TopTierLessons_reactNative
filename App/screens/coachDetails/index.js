import React, {useEffect, useState} from 'react';
import ContainerBgImage from '../../compnents/containerBackground';
import CustomHeader from '../../compnents/customHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '../../assets/Images';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import {View, TouchableOpacity} from 'react-native';
import CustomImage from '../../compnents/customImage';
import CustomText from '../../compnents/customText';
import style from './style';
import CustomButton from '../../compnents/customButton';
import screenString from '../../navigation/screenString';

export default function CoachDetails({navigation}) {
  const [isActive, setIsActive] = useState(0);
  const title = [
    {name: 'Bio', width: '19%'},
    {name: 'Location', width: '26%'},
    {name: 'Availability', width: '30%'},
    {name: 'Reviews', width: '25%'},
  ];
  return (
    <ContainerBgImage>
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => navigation.goBack()}
        title={true}
        lable={'Coach Detail'}
        rightIcon={true}
      />
      <View
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {
            height: 70,
            backgroundColor: '#1F1F1F',
            marginTop: 20,
          },
        ]}>
        <View style={style.rowContent}>
          <CustomImage style={{marginLeft: 10}} source={Images.USERPROFILE} />
          <View style={{marginLeft: 10}}>
            <CustomText fontSize={13} fontWeight={'500'}>
              Bozenka Malina
            </CustomText>
            <View style={style.rowContent}>
              <Icon
                name={'location-outline'}
                color={colors.THEME_BTN}
                size={15}
              />
              <CustomText marginLeft={3} fontSize={13} fontWeight={'300'}>
                Panjer,South Denpasar
              </CustomText>
            </View>
            <View style={style.rowContent}>
              <Icon name={'star-outline'} color={colors.THEME_BTN} size={15} />
              <CustomText marginLeft={3} fontSize={13} fontWeight={'400'}>
                4.2/5
              </CustomText>
            </View>
          </View>
        </View>
        <View style={style.rowRight}>
          <CustomText fontSize={10} fontWeight={'500'}>
            Cricket
          </CustomText>
          <CustomText fontSize={16} fontWeight={'500'}>
            105$
          </CustomText>
        </View>
      </View>
      <View style={style.divider} />
      <View
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {marginTop: 20, flex: 1},
        ]}>
        {title.map((val, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setIsActive(index)}
              style={{
                borderBottomWidth: 2,
                borderColor: isActive === index ? colors.THEME_BTN : '#595959',
                width: val.width,
                paddingBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText
                fontWeight="600"
                color={isActive === index ? colors.THEME_BTN : '#6B6B6B'}>
                {val.name}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
      <CustomButton
        alignSelf={'center'}
        marginTop={40}
        lable="Book Now"
        onPress={() => alert('in process')}
      />
    </ContainerBgImage>
  );
}
