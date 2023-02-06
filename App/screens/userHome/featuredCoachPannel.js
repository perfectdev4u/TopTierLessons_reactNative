import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../../compnents/customText';

export default function FeaturedCoach({data,onPress}) {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#595959',
          height: 2,
          width: '95%',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
      <CustomText marginTop={10} marginLeft={'2.5%'}>
        Featured Coaches
      </CustomText>
      <ScrollView
        pagingEnabled={true}
        style={{marginTop: 10, marginLeft: '2.5%'}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((val, index) => {
          return (
            <TouchableOpacity onPress={onPress&&onPress} key={index}>
              <ImageBackground
                source={val.img}
                style={{
                  height: 140,
                  width: 95,
                  justifyContent: 'flex-end',
                  margin: 2,
                  flex: 1,
                  paddingHorizontal: 10,
                }}>
                <CustomText alignSelf={'center'} fontSize={14}>
                  {val.name}
                </CustomText>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={{
          backgroundColor: '#595959',
          height: 2,
          width: '95%',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
    </View>
  );
}
