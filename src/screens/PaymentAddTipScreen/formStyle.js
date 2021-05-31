import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    marginLeft: 35,
    marginTop: 18,
    marginRight: 35,
    marginBottom: 20,
  },

  form: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'flex-end',
    borderColor: '#ccc',
    paddingBottom: Platform.OS === 'ios' ? 2 : 0,
  },

  input: {
    width: Platform.OS === 'ios' ? 125 : 100,
    flexDirection: 'row',
    marginBottom: 10,
  },

  inputText: {
    fontSize: 24,
    letterSpacing: 0,
    fontFamily: 'OpenSansRegular',
  },

  firstPicker: {
    marginRight: Platform.OS === 'ios' ? 20 : 0,
  },

  picker: {
    width: Platform.OS === 'ios' ? 80 : 100,
  },

  pickerTextStyle: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    color: '#000',

    letterSpacing: 0,
  },
  disclosureContainer: {
    width: '110%',
    marginLeft: '-5%',
    marginTop: 10,
  },
});
