import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  calenderContainer: {
    flex: 1,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
  rowScroll: {
    marginTop: 30,
    width: '95%',
    alignSelf: 'center',
  },
  dateTime: {
    backgroundColor: '#383838',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  },
});
