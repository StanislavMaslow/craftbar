import { Dimensions } from 'react-native';
import { paleGrey } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;

export default {
  header: {
    backgroundColor: paleGrey,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: deviceWidth,
    height: 100,
    maxHeight: 130,
    borderBottomWidth: 0,
    // borderBottomColor: 'red',
  },

  blackIcon: {
    color: '#000',
    marginLeft: 21,
    marginTop: 3,
  },
  title: {
    marginTop: 5,
    fontFamily: 'OpenSansLight',
    color: '#000',
    paddingTop: 15,
    width: 200,
    textAlign: 'left',
    fontSize: 30,
    lineHeight: 25,
    fontWeight: '400',
  },
};
