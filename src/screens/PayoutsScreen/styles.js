import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    width: deviceWidth,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableContainer: {
    backgroundColor: 'rgb(236, 237, 241)',
    borderRadius: 5,
    marginTop: 14,
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 18,
    width: deviceWidth - 20,
  },
  content: {
    position: 'relative',
    marginLeft: 35,
    flexDirection: 'row',
    marginTop: 12,
  },

  availableText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    marginLeft: 10,
  },

  availableIcon: {
    fontSize: 14,
  },

  time: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    opacity: 0.4,
    marginTop: 9,
  },
};
