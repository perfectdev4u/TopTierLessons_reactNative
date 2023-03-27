import React, {useEffect, useState} from 'react';
import CustomHeader from '../../compnents/customHeader';
import colors from '../../theme/colors';
import {
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomText from '../../compnents/customText';
import {Loader} from '../../compnents/loader';
import {goBackHandle} from '../../utils/constants';
import {useSelector} from 'react-redux';
import apiUrl from '../../api/apiUrl';
import {postReq} from '../../api';
import Images from '../../assets/Images';
import ReviewsRatingList from '../../compnents/reviewList';

export default function Reviews_Ratings({navigation}) {
  const {user} = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const reviewsPayload = {
    userId: user?.user?.userId,
    page: page,
    pageSize: 10,
  };
  useEffect(() => {
    getReviews();
  }, [page]);
  const getReviews = () => {
    setIsLoading(true);
    postReq(
      apiUrl.baseUrl + apiUrl.getAllReviews,
      reviewsPayload,
      user?.access_token,
    )
      .then(res => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200) {
          setDataLength(res?.data?.data?.length);
          if (page === 1) setReviewsList(res?.data?.data);
          else setReviewsList([...reviewsList, ...res?.data?.data]);
          //console.log(res?.data?.data);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('_err==>', err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BLACK}}>
      <Loader modalVisible={isLoading} setModalVisible={setIsLoading} />
      <CustomHeader
        leftIcon={'chevron-left'}
        leftIconClick={() => goBackHandle(navigation)}
        title={true}
        lable={'Reviews and Ratings'}
        rightIcon={true}
      />
      <View
        style={{
          backgroundColor: '#595959',
          height: 2,
          width: '95%',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
      <ImageBackground
        source={Images.appBackground}
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
        }}>
        <FlatList
          data={reviewsList}
          renderItem={({item, index}) => (
            <ReviewsRatingList {...item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={({distanceFromEnd}) => {
            console.log(distanceFromEnd);
            if (distanceFromEnd > 0) setPage(page + 1);
          }}
          //   ListFooterComponent={() => (
          //     <View style={{alignSelf: 'center', marginBottom: 10}}>
          //       {dataLength === 0 ? (
          //         <CustomText color={colors.THEME_BTN}>
          //           No Review found!
          //         </CustomText>
          //       ) : (
          //         <ActivityIndicator size={'small'} color={colors.WHITE} />
          //       )}
          //     </View>
          //   )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
