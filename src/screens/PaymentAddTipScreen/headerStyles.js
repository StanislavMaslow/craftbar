import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    paddingTop: 40,
    backgroundColor: 'rgb(236, 237, 241)',
    paddingLeft: 35,
  },

  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 26,
    color: '#000',
    opacity: 0.6,
    paddingLeft: -10,
  },

  backText: {
    color: '#000',
    opacity: 0.6,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  infoContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },

  containerImage: {
    width: 135,
    height: 2,
    position: 'relative',
  },

  image: {
    width: 135,
    height: 200,
    borderRadius: 5,
    position: 'absolute',
    bottom: -140,
  },

  info: {
    marginLeft: 155,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 143,
    paddingBottom: 17,
  },

  firstName: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  lastName: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  rating: {
    justifyContent: 'center',
  },

  ratingText: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
    color: 'rgb(252, 185, 41)',
  },

  imageRating: {
    width: 20,
    height: 20,
  },

  rightPart: {
    marginLeft: 20,
  },

  puzleBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  puzleBarText: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    lineHeight: 24,
    letterSpacing: 0,
    opacity: 0.6,
    marginBottom: 3,
  },

  rightIcon: {
    fontSize: 23,

    opacity: 0.6,
  },

  footerHeader: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textFooter: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },
});
