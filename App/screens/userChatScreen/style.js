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
  profile: {
    marginLeft: '5%',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
  },
  plusIcon: {
    backgroundColor: '#FFD0B3',
    borderRadius: 2,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
