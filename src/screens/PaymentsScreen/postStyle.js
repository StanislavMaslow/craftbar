import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(236,237,241)',
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 31,
  },

  content: {
    marginLeft: 17,
    marginTop: 12,
    marginRight: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pesonContainer: {
    flexDirection: 'row',
  },

  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 44 / 2,
    overflow: 'hidden',
  },

  image: {
    width: 30,
    height: 30,
  },

  name: {
    marginLeft: 14,
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  secondrRow: {
    marginTop: 7,
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  namePlace: {
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  date: {
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },
  icon: {
    fontSize: 18,
    paddingTop: 4,
  },

  cash: {
    fontSize: 36,
    letterSpacing: 0,
    fontFamily: 'OpenSansLight',
    marginTop: 5,
  },
});

export default styles;
