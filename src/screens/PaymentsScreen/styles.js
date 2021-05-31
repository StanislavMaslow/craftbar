import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },

  container: {
    marginTop: 19,
    marginLeft: 20,
  },

  H3: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  connectPayment: {
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    marginLeft: 3,
    marginTop: 15,
  },
  stubContainer: {
    alignSelf: 'center',
  },
  iconCard: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.4)',
    marginLeft: 20,
    marginTop: 15,
  },
});

export default styles;
