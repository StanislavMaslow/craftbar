import { Dimensions } from 'react-native';
import { greyText } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;

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
    color: greyText,
  },

  editableInput: {
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
  button: {
    marginTop: 10,
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
  lightButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: 255,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginLeft: 12,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  loginButtonText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
};
