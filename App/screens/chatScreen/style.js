import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  rowContent: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRight: {
    backgroundColor: colors.THEME_BTN,
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 30,
  },
  divider: {
    backgroundColor: '#595959',
    height: 2,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  }
});
