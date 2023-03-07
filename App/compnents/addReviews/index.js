import React, {useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity, Alert} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Star from 'react-native-vector-icons/Entypo';
import CustomText from '../customText';
import {useSelector} from 'react-redux';
import CustomInput from '../CustomInput';
import CustomButton from '../customButton';
import {Loader} from '../loader';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';

export const AddReviews = ({modalVisible, setModalVisible, reciverId}) => {
  const {user} = useSelector(state => state.authReducer);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const reviewPayload = {
    reciverId: reciverId,
    review: review,
    rating: rating + 1,
  };
  const handleRating = index => {
    if (index === 0) setRating(0);
    else if (index === 1) setRating(1);
    else if (index === 2) setRating(2);
    else if (index === 3) setRating(3);
    else if (index === 4) setRating(4);
    else setRating(4);
  };
  const handleSubmit = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.addRatings,
      reviewPayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200)
          Alert.alert(res?.data?.returnMessage[0]);
        setRating(4);
        setReview('');
        setModalVisible(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('reviews_Err==>', err);
        Alert.alert(err?.returnMessage[0]);
      });
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
            <CustomText>{'Add Review and Rating'}</CustomText>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setRating(4);
                setReview('');
              }}>
              <Icon name={'close'} color={colors.THEME_BTN} size={22} />
            </TouchableOpacity>
          </View>
          <CustomText marginTop={10} marginLeft={'5%'}>
            Add Ratings
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginLeft: '5%',
              marginTop: 10,
            }}>
            {Array.from(Array(5).keys()).map((item, index) => (
              <TouchableOpacity onPress={() => handleRating(index)}>
                <Star
                  key={index}
                  name={index <= rating ? 'star' : 'star-outlined'}
                  color={colors.THEME_BTN}
                  size={22}
                />
              </TouchableOpacity>
            ))}
          </View>
          <CustomText marginTop={10} marginLeft={'5%'}>
            Add Reviews
          </CustomText>
          <CustomInput
            height={80}
            borderRadius={5}
            marginTop={10}
            borderWidth={1}
            placeholder={'Type your experience with coach...'}
            value={review}
            onChangeText={txt => setReview(txt)}
            multiline={true}
          />
          <CustomButton
            alignSelf={'center'}
            marginTop={20}
            height={30}
            width={'30%'}
            lable={'Submit'}
            disabled={!review ? true : false}
            onPress={handleSubmit}
          />
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
    paddingBottom: 40,
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
