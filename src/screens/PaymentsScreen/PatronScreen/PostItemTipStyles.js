import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 30,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 320,
    paddingTop: 25,
  },

  firstRow: {
    position: 'relative',
    backgroundColor: 'rgb(236, 237, 241)',
    flexDirection: 'row',
    paddingBottom: 15,
  },

  firstRowLeftPart: {
    flex: 1,
  },

  iconStrike: {
    position: 'absolute',
    top: 15,
    left: 35,
    color: '#000',
    opacity: 0.3,
    fontSize: 20,
    zIndex: 20,
  },

  price: {
    marginTop: 18,
    fontSize: 24,
    fontFamily: 'OpenSansRegular',
    letterSpacing: 0,
    marginLeft: 35,
  },

  tipsText: {
    marginLeft: 35,
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    letterSpacing: 0,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    position: 'absolute',
    left: 157,
    zIndex: 20,
  },

  firstRowRightPart: {
    flex: 1,
    marginTop: 32,
  },

  firstName: { fontSize: 14, letterSpacing: 0, fontFamily: 'OpenSansBold' },

  lastName: {
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  border: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 35,
  },

  iconClock: {
    marginTop: 17,
    marginLeft: 35,
    opacity: 0.6,
    fontSize: 18,
  },

  rightPartSecondRow: {
    marginTop: 16,
    flex: 1,
  },

  iconPin: {
    opacity: 0.6,
    fontSize: 18,
  },
});
