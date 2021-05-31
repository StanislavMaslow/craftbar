import { Platform, Dimensions } from 'react-native';
import { veryLightPink, brownGrey } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: deviceWidth,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    flex: 1,
  },
  content: {
    flex: 1,
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
  },
  listItem: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  firstListItemContainer: {
    position: 'relative',
    width: '20%',
  },
  secondListItemContainer: {
    maxWidth: '82%',
    minWidth: '82%',
  },
  thirdListItemContainer: {
    width: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: -23,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 10,
  },
  username: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: brownGrey,
  },
  message: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: 'OpenSans',
    flexWrap: 'wrap',
    flex: 1,
  },
  buttonsContiner: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  acceptButton: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    height: 35,
    width: 85,
    paddingLeft: 2,
    paddingRight: 2,
  },
  ignoreButton: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: veryLightPink,
    height: 35,
    width: 85,
    paddingLeft: 2,
    paddingRight: 2,
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '400',
    fontFamily: 'OpenSans',
  },
  ignoreButtonText: {
    color: veryLightPink,
  },
  avatar: { height: 40, width: 40, borderRadius: 5 },

  unRead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fa3e3e',
    position: 'absolute',
    top: -5,
    left: 0,
    zIndex: 100,
  },
};
