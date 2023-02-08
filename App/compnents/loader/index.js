import React from 'react';
import {ActivityIndicator, StyleSheet, View, Modal} from 'react-native';
import colors from '../../theme/colors';

export const Loader = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color={colors.WHITE} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005',
  },
});
