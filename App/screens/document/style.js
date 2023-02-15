import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  rowContent: {
    alignSelf: 'center',
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowLeft: {
    width: '35%',
    height: '100%',
    backgroundColor: '#F8EDE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roaster: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
