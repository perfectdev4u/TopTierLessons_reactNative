import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
    rowContents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 25,
  },
  profileImage: {
    height: 106,
    width: 106,
    borderRadius: 100,
    alignSelf: 'center',
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
