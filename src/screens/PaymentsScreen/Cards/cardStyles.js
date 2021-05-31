import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    paddingBottom: 10,
    position: 'relative',
  },

  containerIconClose: {
    position: 'absolute',
    top: 0,
    right: 5,
    width: 30,
    height: 30,
    zIndex: 3,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    marginRight: 5,
  },

  defaultCard: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
    marginLeft: 5,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },

  defaultCardText: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#000',
  },

  button: {
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
    marginLeft: 5,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconClose: {},

  note: {
    marginTop: 10,
    marginLeft: 10,
  },
});
