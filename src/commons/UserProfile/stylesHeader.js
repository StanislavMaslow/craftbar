import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  header: {
    backgroundColor: 'rgb(236, 237, 241)',
  },

  buttonBack: {
    marginLeft: deviceWidth < 340 ? 8 : 35,
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
    marginLeft: deviceWidth < 340 ? 150 : 190,
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
    flexDirection: 'row',
    marginTop: -7,
    marginLeft: 5,
  },

  ratingText: {
    color: 'rgb(252, 185, 41)',
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  iconStar: {
    marginTop: 3,
    marginLeft: 1,
    marginRight: 15,
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
});
