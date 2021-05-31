import { Dimensions } from 'react-native';
import { paleGrey } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    width: deviceWidth,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addNewContainer: {
    alignItems: 'center',
    backgroundColor: paleGrey,
    borderRadius: 4,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: deviceWidth - 20,
  },

  addNewText: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  addNewIcon: {
    fontSize: 14,
    color: '#000',
    paddingLeft: 10,
    lineHeight: 24,
    letterSpacing: 0,
  }
};
