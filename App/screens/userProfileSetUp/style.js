import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  imageContaioner: {
    marginTop: 30,
    height: 106,
    width: 106,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: colors.WHITE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.WHITE,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.THEME_BTN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dobInput: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    width: '90%',
    alignSelf: 'center',
    height: 45,
    fontSize: 14,
    color: colors.WHITE,
    lineHeight: 22,
    padding: 8,
    fontFamily: 'Gotham Bold',
    marginTop: 20,
  },
});
