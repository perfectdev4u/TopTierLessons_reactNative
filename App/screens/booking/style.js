import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  rowContent: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
