import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    position: 'relative',
  },
  greyBlock: {
    position: 'absolute',
    backgroundColor: 'rgb(236, 237, 241)',
    width: 125,
    height: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 35,
  },
  leftSide: {
    flex: 1,
  },
  image: {
    width: 135,
    height: 130,
    borderRadius: 5,
  },
  rigthSide: { flex: 1, marginLeft: 20 },
  caption: {
    fontSize: deviceWidth <= 320 ? 16 : 18,
    fontFamily: 'OpenSansBold',
    letterSpacing: 0,
  },
  dolar: {
    fontSize: 36,
    lineHeight: 36,
    fontFamily: 'OpenSansLight',
    letterSpacing: 0,
    marginTop: 10,
    paddingTop: 1,
  },
  textIcon: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontFamily: 'OpenSansRegular',
    letterSpacing: 0,
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pinIcon: {
    color: 'rgba(74, 74, 74, 0.6)',
    fontSize: 20,
    marginRight: 5,
  },
  clockIcon: {
    color: 'rgba(74, 74, 74, 0.6)',
    fontSize: 22,
    marginRight: 3,
  },
};
