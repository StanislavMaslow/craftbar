import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ecedf1',
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },

  row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },

  header: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },

  headerText: {
    fontSize: 19,
    fontFamily: 'OpenSansBold',
  },

  call: {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 10,
    width: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    paddingBottom: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  callText: {
    fontSize: 17,
    fontFamily: 'OpenSansRegular',
  },

  icon: {
    fontSize: 18,
    marginTop: 13,
  },
});
