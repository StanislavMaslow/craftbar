import { Platform, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: deviceWidth,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
};
