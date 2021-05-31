import { Platform, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  column: {
    flex: 1,
    flexShrink: 0,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    minWidth: 300,
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
    paddingRight: 0,
    paddingBottom: 10,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 0,
  },

  label: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    opacity: 0.8,
  },

  labelSelect: {
    color: '#000',
    fontFamily: 'OpenSansRegular',
    opacity: 0.4,
    fontSize: 14,
    top: 10,
    left: 15,
  },

  selectItem: {
    marginTop: Platform.OS === 'ios' ? 5 : 1,
    marginLeft: 15,
    flexDirection: 'column',
  },

  inputIconHint: {
    fontSize: 16,
    opacity: 0.6,
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

  picker: {
    width: 150,
    top: 7,
    left: Platform.OS === 'ios' ? -17 : -10,
  },

  row: {
    flexDirection: 'row',
    marginLeft: 35,
  },

  containerCheckbox: {
    marginLeft: 40,
    width: deviceWidth - 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  checkBox: {
    maxWidth: 25,
  },

  linkContainer: {
    maxWidth: '70%',
    alignItems: 'center',
    marginTop: -2,
    paddingLeft: 2,
    flexDirection: 'row',
  },
  termsLink: { color: 'blue', textDecorationLine: 'underline' },
};
