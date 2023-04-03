import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  colomContent: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80%',
    flex:1
  },
  rowRight: {
    backgroundColor: colors.THEME_BTN,
    height: '100%',
    //width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 30,
    flex:1,
  },
});
