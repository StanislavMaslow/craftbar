import { Platform, Dimensions } from 'react-native';
import { greyText, brownGrey, paleGrey } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;
export default {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    // paddingBottom: 15,
    width: deviceWidth,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tabs: {
    backgroundColor: '#fff',
  },
  tab: {
    backgroundColor: '#fff',
  },
  activeTextStyle: {
    fontWeight: '700',
    // fontSize: 18,
    color: '#000',
  },
  activeTabStyle: {
    backgroundColor: '#fff',
    // borderColor: '#000',
    // borderWidth: 2,
  },
  textStyle: {
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 1,
    marginBottom: 0,
    paddingBottom: 0,
    marginLeft: 30,
    width: '70%',
  },

  item: { marginTop: 0, borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 },

  label: { paddingTop: 10, color: greyText },

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
  icon: {
    height: 21,
    fontSize: 16,
    position: 'absolute',
    top: 33,
    bottom: -15,
    right: 22,
    paddingTop: 1,
    color: greyText,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '25%',
    paddingTop: 10,
    height: 35,
    marginTop: 20,
    marginBottom: -20,
  },
  filterIcon: {
    marginLeft: 0,
    marginRight: 10,
    height: 17,
    color: greyText,
  },
  selectFilterContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: paleGrey,
  },
  filterText: {
    fontSize: 18,
    fontFamily: 'OpenSans',
    color: greyText,
  },
  nameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: deviceWidth > 600 ? '80%' : '50%',
    marginLeft: 10,
    marginRight: 10,
  },

  name: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'OpenSans',
  },

  username: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: brownGrey,
  },
  buttonContainer: {
    marginRight: 1,
    alignSelf: 'flex-end',
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    height: 30,
    width: 95,
  },

  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '400',
  },

  avatar: { height: 40, width: 40, borderRadius: 5 },
};
