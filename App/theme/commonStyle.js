import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  row: (width, justifyContent, alignSelf) => ({
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent,
    alignSelf,
  }),
  centeredContent: backgroundColor => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
  }),
});
