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
  },
  profile: {
    marginLeft: '5%',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
  },
  mapContainer: {
    marginTop: 30,
    backgroundColor: colors.BLACK,
    alignSelf: 'center',
    height: 330,
    width: '100%',
  },
});
