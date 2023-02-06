import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
    headerContainer:{
        backgroundColor: colors.THEME_BTN,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 8,
    },
  imageContaioner: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10
  },
  iconContainer: {
    height: 15,
    width: 15,
    borderRadius: 30,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
