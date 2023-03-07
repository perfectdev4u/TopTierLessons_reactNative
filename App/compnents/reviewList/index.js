import React from 'react';
import {View} from 'react-native';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../customImage';
import CustomText from '../customText';
import Icon from 'react-native-vector-icons/Entypo';

export default function ReviewsRatingList({
  index,
  studentImage,
  studentName,
  review,
  rating,
}) {
  return (
    <View
      key={index}
      style={[
        commonStyle.row('95%', 'space-between', 'center'),
        {
          height: 70,
          marginTop: 20,
          borderBottomWidth: 0.4,
          borderColor: '#F3F3F3',
         
        },
      ]}>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          flex:1
        }}>
        <CustomImage
          style={{
            marginLeft: '5%',
            height: 50,
            width: 50,
            borderRadius: 50,
            alignSelf: 'center',
          }}
          source={{uri: studentImage}}
        />
        <View style={{marginLeft: '5%'}}>
          <CustomText fontSize={16}>{studentName}</CustomText>
          <CustomText numberOfLines={2} color="#7A7A7A" fontSize={12}>
            {review}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex:1
        }}>
        {Array.from(Array(5).keys()).map((item, index) => (
          <Icon
            key={index}
            name={index <= rating ? 'star' : 'star-outlined'}
            color={colors.THEME_BTN}
            size={22}
          />
        ))}
      </View>
    </View>
  );
}
