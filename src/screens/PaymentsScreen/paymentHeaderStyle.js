import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(236, 237, 241)',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    marginLeft: 20,
    borderWidth: 2,
    borderColor: 'rgb(236, 237, 241)',
  },

  image: {
    width: 100,
    height: 100,
  },

  info: {
    marginLeft: 20,
  },

  containerName: {
    flexDirection: 'row',
    marginTop: 24,
  },

  firstName: {
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
    marginRight: 5,
  },
  secondName: {
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  paypalStatus: {
    fontSize: 14,
    letterSpacing: 0,
    marginTop: 1,
    marginBottom: 1,
    color: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'OpenSansRegular',
  },

  connectPayment: {
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    marginLeft: 3,
    marginTop: -1,
  },

  error: {
    fontSize: 14,
    color: 'red',
    marginLeft: 5,
    marginTop: Platform.OS === 'ios' ? 1 : -1,
  },

  containerConnectPayment: {
    flexDirection: 'row',
  },

  iconCard: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.4)',
    marginTop: -1,
  },
});

export default styles;
