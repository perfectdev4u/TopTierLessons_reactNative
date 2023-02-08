import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  rowContent: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#595959',
    height: 1.5,
    width: '95%',
    alignSelf: 'center',
    margin: 15,
  },
});
