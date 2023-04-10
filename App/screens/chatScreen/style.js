import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  divider: {
    backgroundColor: '#595959',
    height: 2,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
  userMenuIcon: {
    backgroundColor: colors.THEME_BTN,
    alignSelf: 'flex-end',
    marginTop: 20,
    height: 45,
    width: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
