import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  content: {
    position: 'relative',
    marginLeft: deviceWidth < 340 ? 8 : 35,
    flexDirection: 'row',
    marginTop: 12,
  },

  followButton: {
    height: 50,
    width: 135,
    justifyContent: 'center',
  },

  followButtonText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  avatar: {
    position: 'absolute',
    top: -80,
    width: 135,
    height: 200,
    borderRadius: 5,
  },

  leftContent: {
    width: 135,
  },

  rightContent: {
    marginLeft: 20,
  },

  BarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  availableContainer: {
    backgroundColor: 'rgb(236, 237, 241)',
    width: 175,
    height: 130,
    borderRadius: 5,
    marginLeft: -10,
    paddingLeft: deviceWidth < 340 ? 8 : 21,
    paddingTop: 18,
    marginTop: 14,
  },

  availableText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    marginLeft: 10,
  },

  availableIcon: {
    fontSize: 14,
  },

  time: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    opacity: 0.4,
    marginTop: 9,
  },

  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 35,
  },

  button: {
    backgroundColor: 'rgb(236, 237, 241)',
    width: 65,
    height: 50,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    letterSpacing: 0,
  },

  textContainer: {
    marginTop: 24,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 24,
  },

  text: {
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  iconPicker: {
    color: 'rgba(0, 0, 0, 0.4)',
  },

  colorPickerText: {
    width: deviceWidth < 320 ? 130 : 190,
    left: -15,
    paddingTop: 0,
    paddingBottom: 0,
  },

  texstInPicker: {
    color: 'rgba(0, 0, 0, 0.4)',
    minWidth: 120,
    maxWidth: 140,
    marginLeft: -5,
  },

  availableEmpty: {
    fontSize: 14,
    marginTop: 20,
    width: 160,
    fontFamily: 'OpenSansBold',
  },
  reportIconContainer: {
    justifyContent: 'flex-end',
    width: '70%',
    flexDirection: 'row',
  },
});
