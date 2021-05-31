import { Dimensions } from 'react-native';

import { paleGrey, greyText } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    width: deviceWidth,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    flexShrink: 0,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    minWidth: 300,
  },

  image: {
    borderColor: 'red',
    alignSelf: 'center',
  },

  blackTitle: {
    color: '#000',
    fontSize: 36,
    height: 40,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    paddingTop: 13,
  },

  section: {
    paddingBottom: 20,
  },

  inputSection: {
    marginTop: 30,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'flex-start',
    // borderWidth: 1.5,
    // borderColor: paleGrey,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: 0,
    paddingBottom: 0,
    marginLeft: 30,
  },

  input: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 18,
  },
  inputBorderBottom: {
    position: 'absolute',
    height: 1,
    bottom: 0.5,
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    left: '4%',
  },
  icon: {
    position: 'absolute',
    top: 30,
    right: 18,
    paddingTop: 1,
    color: greyText,
    height: 35,
  },
  socialIcon: {
    padding: 10,
    position: 'absolute',
    color: greyText,
    marginLeft: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  radioListItem: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    padding: 0,
    borderBottomWidth: 1.5,
    borderColor: 'transparent',
  },
  radio1: {
    width: 80,
  },
  radio2: { width: 90 },
  radio3: { width: 60 },
  radioText: {
    marginLeft: 5,
  },
  button: {
    marginTop: 42,
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    width: 255,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButtonText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  connectButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: paleGrey,
    borderRadius: 5,
    height: 50,
    width: 255,
    paddingLeft: 10,
    paddingRight: 10,
  },
  connectBuhttonText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'OpenSans',
    color: '#000',
  },
  link: {
    flex: 1,
    fontFamily: 'OpenSans',
    marginTop: 40,
    flexDirection: 'row',
    textAlign: 'left',
    color: '#000',
    fontSize: 15,
    fontWeight: 'normal',
  },
  forgot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  label: {
    fontSize: 18,
    color: greyText,
  },

  modalCountry: {
    height: deviceHeight,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 50,
    position: 'absolute',
    width: '100%',
    zIndex: 10000000,
    backgroundColor: '#fff',
  },

  countryItem: {
    marginTop: 20,
    paddingBottom: 2,
    borderBottomColor: paleGrey,
    borderBottomWidth: 1,
    fontSize: 18,
  },

  searchCountry: {
    paddingTop: 15,
  },

  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 5,
    marginTop: 20,
    paddingBottom: 2,
    width: '100%',
  },
};
