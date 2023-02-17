import React, {useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity, Alert} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../customText';
import {useSelector} from 'react-redux';
import commonStyle from '../../theme/commonStyle';
import CustomButton from '../customButton';
import {Loader} from '../loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';

export const VenuesList = ({
  modalVisible,
  setModalVisible,
  data,
  setData,
  update,
}) => {
  const {user} = useSelector(state => state.authReducer);
  const [venueId, setVenueId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addVenueList = {
    users: [
      {
        name: null,
        email: null,
      },
    ],
    venueList: venueId,
  };
  const handleAddId = val => {
    let newObj = {...val.venueId, venueId: val.venueId};
    let index = venueId.findIndex(item => item.venueId === val.venueId);
    if (index === -1) {
      setVenueId([...venueId, newObj]);
    } else {
      let copy = [...venueId];
      copy.splice(index, 1);
      setVenueId(copy);
    }
  };
  const setActiveValue = (index, list, setList) => {
    let copy = [...list];
    copy[index]['isSelected'] = copy[index]['isSelected']
      ? !copy[index]['isSelected']
      : true;
    setList(copy);
  };
  const handleVenueAdded = () => {
    if (venueId.length === 0) Alert.alert('there is no venue added.');
    else {
      setIsLoading(true);
      postReq(
        apiUrl.baseUrl + apiUrl.updateProfile,
        addVenueList,
        user?.access_token,
      )
        .then(res => {
          setIsLoading(false);
          if (res?.status === 200) console.log(res);
          setModalVisible(false);
          update();
        })
        .catch(err => {
          setIsLoading(false);
          console.log('Update_User_Err==>', err);
          Alert.alert(err?.returnMessage[0]);
        });
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <View style={styles.centeredView}>
        <View style={styles.card}>
          <View style={styles.header}>
            <CustomText>{'Select Venues'}</CustomText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name={'close'} color={colors.THEME_BTN} size={22} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            {data?.length === 0 && (
              <CustomText
                marginTop={30}
                color={colors.THEME_BTN}
                fontSize={18}
                alignSelf={'center'}>
                There is no Venues found.
              </CustomText>
            )}
            {data?.map((val, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    commonStyle.row('90%', 'flex-start', 'center'),
                    {marginTop: 5},
                  ]}
                  onPress={() => {
                    handleAddId(val);
                    setActiveValue(index, data, setData);
                  }}>
                  <Icon
                    name={
                      val?.isSelected
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    color={val?.isSelected ? colors.THEME_BTN : colors.WHITE}
                    size={18}
                  />
                  <CustomText
                    color={val?.isSelected ? colors.THEME_BTN : colors.WHITE}
                    fontSize={15}
                    marginLeft={'5%'}
                    lineHeight={22}>
                    {val.name}
                  </CustomText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {data.length != 0 && (
            <CustomButton
              lable={'Submit'}
              width={'60%'}
              position={'absolute'}
              bottom={20}
              height={35}
              alignSelf={'center'}
              onPress={() => handleVenueAdded()}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0009',
  },
  card: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 10,
    height: 300,
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#595959',
    alignSelf: 'center',
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginTop: 10,
  },
});
