import { Platform } from 'react-native';
import { paleGrey, brownGrey } from '../../utils/variables';

export default {
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#e8e8e8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackButton: {
    height: 17,
    width: 17,
    marginLeft: 10,
    marginRight: 10,
  },
  body: {
    marginLeft: 35,
    marginRight: 29,
  },
  warningBlockIcon: {
    width: 17,
    height: 17,
    opacity: 0.4,
    marginRight: 5,
    marginTop: 5,
  },
  warningBlock: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 5,
  },
  warningBlockText: {
    color: 'gray',
    fontSize: 14,
  },
  availableMoney: {
    marginTop: 10,
    paddingBottom: 8,
  },
  inputAmount: {
    marginLeft: -15,
  },
  notificationCard: {
    fontSize: 14,
    paddingTop: 25,
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
  },
  darkButton: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
  },
  lightButton: {
    flex: 1,
    height: 50,
    marginLeft: 12,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  darkButtonTxt: {
    alignSelf: 'center',
  },
  footerMenu: {
    overflow: 'visible',
    backgroundColor: '#ededed',
  },
  footerIcon: {
    color: 'black',
  },
  footerIconPlus: {
    color: 'white',
  },
  footerBlockPlus: {
    overflow: 'visible',
    minWidth: 50,
    minHeight: 100,
    borderRadius: 100,
    backgroundColor: '#000',
    zIndex: 99,
  },
  tipsPostContainer: {
    flex: 1,
    position: 'relative',
    minHeight: 220,
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 20,
    overflow: 'visible',
  },
  tipsPostGrid: {
    // flex: 1,
    position: 'relative',
    marginTop: 25,
    marginBottom: 20,
    paddingBottom: 20,
    backgroundColor: paleGrey,
    width: '88%',
    marginLeft: -4,
    borderRadius: 5,
    height: 220,
    // borderWidth: 2,
    // borderColor: 'green',
  },
  avaContainer: {
    flex: 1,
    position: 'absolute',
    top: 20,
    width: '88%',
    marginLeft: -4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 100,
    zIndex: 99,
    overflow: 'visible',
    // borderWidth: 2,
    // borderColor: 'orange',
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  tipsFirstRow: {
    flex: 1,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 2,
    // borderColor: 'pink',
  },
  arrowIcon: { color: brownGrey },
  pinIcon: { marginBottom: 0, marginTop: 5 },
  tipsAmount: {
    fontSize: 24,
  },
  greyDevider: {
    height: 1,
    backgroundColor: brownGrey,
    width: '90%',
    marginLeft: '10%',
    marginTop: 15,
    marginBottom: 15,
  },
  lastTipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lastRowView: {
    maxWidth: '40%',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  openSans: {
    fontFamily: 'OpenSans',
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
  // picker: {
  //   width: 150,
  //   top: 7,
  //   left: Platform.OS === 'ios' ? -17 : -10,
  // },

  // label: {
  //   fontFamily: 'OpenSansRegular',
  //   fontSize: 14,
  //   opacity: 0.8,
  // },

  // labelSelect: {
  //   color: '#000',
  //   fontFamily: 'OpenSansRegular',
  //   opacity: 0.4,
  //   fontSize: 14,
  //   top: 10,
  //   left: 15,
  // },
};
