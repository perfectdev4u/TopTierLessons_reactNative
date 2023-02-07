import {ScrollView, View, TouchableOpacity} from 'react-native';
import CustomImage from '../../compnents/customImage';
import CustomText from '../../compnents/customText';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NearbyCoaches({data, onPress}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          commonStyle.row('95%', 'space-between', 'center'),
          {marginTop: 15},
        ]}>
        <CustomText fontSize={16} fontWeight={'500'}>
          Nearby Coaches
        </CustomText>
        <Icon
          name={'filter'}
          color={colors.WHITE}
          size={20}
          onPress={() => alert('inprocess')}
        />
      </View>
      <ScrollView
        pagingEnabled={true}
        style={{marginTop: 15, flex: 1}}
        horizontal={false}
        showsVerticalScrollIndicator={false}>
        {data.map((val, index) => {
          return (
            <TouchableOpacity
              onPress={onPress && onPress}
              key={index}
              style={[
                commonStyle.row('95%', 'space-between', 'center'),
                {
                  height: 70,
                  backgroundColor: '#1F1F1F',
                  marginTop: 10,
                },
              ]}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomImage style={{marginLeft: 10}} source={val.img} />
                <View style={{marginLeft: 10}}>
                  <CustomText fontSize={13} fontWeight={'500'}>
                    {val.name}
                  </CustomText>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={'location-outline'}
                      color={colors.THEME_BTN}
                      size={15}
                    />
                    <CustomText marginLeft={3} fontSize={13} fontWeight={'300'}>
                      {val.address}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={'star-outline'}
                      color={colors.THEME_BTN}
                      size={15}
                    />
                    <CustomText marginLeft={3} fontSize={13} fontWeight={'400'}>
                      {val.ratings}
                    </CustomText>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.THEME_BTN,
                  height: '100%',
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 30,
                }}>
                <CustomText fontSize={10} fontWeight={'500'}>
                  {val.sports}
                </CustomText>
                <CustomText fontSize={16} fontWeight={'500'}>
                  {val.price}
                </CustomText>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
