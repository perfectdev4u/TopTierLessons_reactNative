import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from '../customImage';
import ImageZoom from 'react-native-image-pan-zoom';

export const ShomImage = ({modalVisible, setModalVisible, url}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.cardView}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setModalVisible(false)}>
            <Icon name={'close'} color={colors.THEME_BTN} size={22} />
          </TouchableOpacity>
          <ImageZoom
            cropWidth={300}
            cropHeight={250}
            imageWidth={300}
            imageHeight={250}
            style={{alignSelf: 'center', flex: 1}}>
            <CustomImage
              source={{uri: url}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </ImageZoom>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005',
    width: '100%',
    alignSelf: 'center',
  },
  cardView: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    paddingBottom: 50,

    paddingTop: 40,
    alignSelf: 'center',
  },
});
