import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  header: {
    backgroundColor: 'rgb(236, 237, 241)',
  },

  buttonBack: {
    marginLeft: 38,
    marginTop: 25,
  },

  buttonText: {
    fontSize: 14,
    letterSpacing: 0,
    color: '#000',
    opacity: 0.4,
    fontFamily: 'OpenSansRegular',
  },

  iconBack: {
    fontSize: 14,
    marginRight: 8,
  },

  blockInformation: {
    marginLeft: 190,
    marginTop: 21,
  },

  name: {
    fontSize: 18,
    fontFamily: 'OpenSansRegular',
    lineHeight: 24,
    letterSpacing: 0,
  },

  firstName: {
    fontFamily: 'OpenSansBold',
  },

  followContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },

  followBlock: {
    marginLeft: 12,
    marginRight: 12,
  },

  followCount: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
  },

  rating: {
    justifyContent: 'center',
  },

  ratingText: {
    color: 'rgb(252, 185, 41)',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  glassImage: {
    width: 17,
    height: 18,
  },

  followNote: {
    fontSize: 10,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
    color: 'rgb(122, 122, 122)',
  },
  content: {
    position: 'relative',
    paddingTop: 120,
    height: 350,
  },
  avatar: {
    position: 'absolute',
    top: 60,
    left: deviceWidth < 340 ? 4 : 35,
    width: 135,
    height: 200,
    borderRadius: 5,
  },
  button: {
    marginTop: 42,
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    width: 135,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rateButtonText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
});
