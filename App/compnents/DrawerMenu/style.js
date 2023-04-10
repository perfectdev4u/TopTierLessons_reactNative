import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.THEME_BTN,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  imageContaioner: {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  iconContainer: {
    height: 25,
    width: 25,
    borderRadius: 30,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
