import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    width: 309,
  },

  buttonNumber: {
    backgroundColor: 'rgb(236, 237, 241)',
    borderRadius: 5,
    width: 73,
    height: 50,
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'center',
  },

  buttonNumberText: {
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
    marginLeft: 20,
  },

  buttonTip: {
    backgroundColor: '#000',
    borderRadius: 5,
    width: 141,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
    marginLeft: 20,
  },

  icon: {
    fontSize: 22,
    marginLeft: 15,
    opacity: 0.8,
  },

  iconTip: {
    fontSize: 22,
    color: '#fff',
    marginRight: 20,
  },
});
