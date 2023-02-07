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
import MapView, {Marker} from 'react-native-maps';
import Star from 'react-native-vector-icons/Entypo';

export default function CoachDetails({navigation}) {
  const [isActive, setIsActive] = useState(0);
  const title = [
    {name: 'Bio', width: '19%'},
    {name: 'Location', width: '26%'},
    {name: 'Availability', width: '30%'},
    {name: 'Reviews', width: '25%'},
  ];
  const bio = txt => {
    return (
      <View
        style={{
          marginTop: 20,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignSelf: 'center',
          width: '95%',
        }}>
        <View
          style={{
            height: 7,
            width: 7,
            backgroundColor: '#C2C2C2',
            borderRadius: 5,
            marginTop: 6,
          }}
        />
        <CustomText
          fontSize={16}
          fontWeight={'400'}
          color={'#C2C2C2'}
          marginLeft={'3%'}>
          {txt}
        </CustomText>
      </View>
    );
  };
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
      {isActive === 0 && (
        <View>
          {bio(
            `Former GPTCA, PTR and USPTA Certified with 15 years experience`,
          )}
          {bio(
            'Teach all level - great with intermediate and performance players Patient and encouraging teaching style',
          )}
          {bio(`Worked with high performance juniors`)}
          {bio(`Former ITF Junior Player`)}
        </View>
      )}
      {isActive === 1 && (
        <View style={{flex: 1, width: '95%', alignSelf: 'center'}}>
          <CustomText marginTop={20} color="#CFCFCF">
            John Doe is available at mention location. You can navigate through
            map by clicking given location.
          </CustomText>
          <View style={style.mapContainer}>
            <MapView
              style={{
                flex: 1,
                borderRadius: 30,
              }}
              initialRegion={{
                latitude: 30.7333,
                longitude: 76.7794,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{latitude: 30.7333, longitude: 76.7794}}></Marker>
            </MapView>
          </View>
        </View>
      )}
      {isActive === 3 && (
        <View
          style={[
            commonStyle.row('95%', 'space-between', 'center'),
            {
              height: 70,
              marginTop: 20,
              borderBottomWidth: 0.4,
              borderColor: '#F3F3F3',
            },
          ]}>
          <View style={style.rowContent}>
            <CustomImage style={{marginLeft: 10}} source={Images.USERPROFILE} />
            <View style={{marginLeft: 10}}>
              <CustomText fontSize={16} fontWeight={'600'}>
                Bozenka Malina
              </CustomText>
              <CustomText color="#7A7A7A" fontSize={12} fontWeight={'400'}>
                UI - Designer
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {Array.from(Array(5).keys()).map((val, index) => (
              <Star
                key={index}
                name={index <= 3 ? 'star' : 'star-outlined'}
                color={colors.THEME_BTN}
                size={22}
              />
            ))}
          </View>
        </View>
      )}
      <CustomButton
        alignSelf={'center'}
        marginTop={60}
        lable="Book Now"
        onPress={() => alert('in process')}
      />
    </ContainerBgImage>
  );
}
