import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const brownGrey = 'rgb(122, 122, 122)';

const styles = StyleSheet.create({
  avatar: {},

  form: {
    width: 147,
  },

  label: {
    fontSize: 14,
    letterSpacing: 0.39,
    color: brownGrey,
    fontFamily: 'OpenSansBold',
    top: 0,
  },

  labelIsFocus: {
    fontSize: 14,
    top: 8,
    letterSpacing: 0.43,
    fontFamily: 'OpenSansBold',
  },

  input: {
    fontSize: 18,
    letterSpacing: 0.64,
    fontFamily: 'OpenSansRegular',
  },

  item: {
    marginLeft: 0,
    marginTop: 10,
  },

  itemIsFocus: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },

  image: {
    width: 135,
    height: 200,
  },

  containerPicker: {
    marginTop: 20,
  },

  labelPicker: {
    fontSize: 14,
    letterSpacing: 0.43,
    color: '#9e9e9e',
    fontWeight: '700',
    fontFamily: 'OpenSansBold',
    top: 0,
  },

  containerChangePersonalData: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 237, 241)',
    width: deviceWidth,
  },

  myInputContainer: {
    marginTop: 20,
  },

  labelInput: {
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: 'OpenSansBold',
  },

  currentValue: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  containerInput: {
    marginTop: 20,
    flexDirection: 'row',
  },

  inputPersonal: {
    borderRadius: 5,
    borderRightWidth: 0,
    borderColor: 'rgb(217, 217, 217)',
    borderWidth: 2,
    height: 50,
    width: 245,
    paddingLeft: 20,
    fontSize: 14,
    letterSpacing: 0.39,
    fontFamily: 'OpenSansBold',
  },

  button: {
    width: 50,
    height: 50,
    marginLeft: -5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCheck: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  change: {
    marginTop: 10,
    color: brownGrey,
    letterSpacing: 0,
    fontSize: 14,
    fontFamily: 'OpenSansBold',
  },

  changePassword: {
    marginTop: 10,
  },
});

export default styles;
