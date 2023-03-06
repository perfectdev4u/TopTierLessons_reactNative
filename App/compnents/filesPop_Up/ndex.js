import React, {useEffect} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import CustomImage from '../customImage';
import Icon from 'react-native-vector-icons/Feather';
import commonStyle from '../../theme/commonStyle';
import colors from '../../theme/colors';

export const FilesPop_Up = ({file, setFile, setUrl}) => {
  const cancelHandle = index => {
    let data = file.filter((item, i) => i !== index);
    setFile(data);
  };
  return (
    <View
      style={[
        commonStyle.row('100%', 'flex-start', 'center'),
        {
          backgroundColor: '#0008',
          padding: 15,
          position: 'absolute',
          zIndex: 1,
          bottom: 5,
        },
      ]}>
      <ScrollView
        style={{flex: 1}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {file.map((url, index) => {
          return (
            <TouchableOpacity
              onPress={() => setUrl(url)}
              style={{
                backgroundColor: '#ebcc91',
                height: 130,
                width: 130,
                marginLeft: 5,
                padding: 15,
              }}
              key={index}>
              <TouchableOpacity
                onPress={() => cancelHandle(index)}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  zIndex: 1,
                }}>
                <Icon name={'x-circle'} size={20} color={colors.THEME_BTN} />
              </TouchableOpacity>
              <CustomImage
                source={{uri: url}}
                style={{
                  height: 100,
                  width: 100,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
