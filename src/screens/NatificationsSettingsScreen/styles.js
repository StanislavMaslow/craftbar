import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  h2: {
    color: '#000',
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    letterSpacing: 0,
  },

  container: {
    marginLeft: 35,
    marginBottom: 36,
    marginRight: 43,
  },

  containerNotificatins: {
    marginTop: 30,
  },

  h3: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    letterSpacing: 0,
  },

  labelContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    fontFamily: 'OpenSansRegular',
    letterSpacing: 0,
    color: 'rgb(122, 122, 122)',
  },

  iconCheck: {
    fontSize: 24,
  },
});

export default styles;
