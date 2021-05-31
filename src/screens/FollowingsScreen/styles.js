import { Platform, Dimensions } from 'react-native';
import { greyText } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;
export default {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: deviceWidth,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 5,
    marginBottom: 0,
    paddingBottom: 0,
    marginLeft: 30,
    width: '70%',
  },

  label: {
    paddingTop: 10,
  },

  item: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
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
  icon: {
    position: 'absolute',
    top: 30,
    right: 24,
    paddingTop: 1,
    color: greyText,
    height: 20,
    fontSize: 18,
  },
  body: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  searchText: {
    width: '100%',
    color: '#adadad',
    marginTop: 10,
    fontFamily: 'OpenSans',
  },
  searchIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    marginTop: 27,
  },
  followingImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  followingMainBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTip: {
    width: 50,
    height: 35,
    borderRadius: 7,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRemove: {
    width: 100,
    height: 35,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTipText: {
    fontSize: 14,
    letterSpacing: 0,
    color: 'white',
    fontFamily: 'OpenSansBold',
  },
  buttonFollowing: {
    width: 85,
    height: 35,
    backgroundColor: 'white',
    marginRight: 5,
    borderRadius: 7,
    marginTop: 3,
  },
  buttonFollowingText: {
    fontSize: 12,
    fontFamily: 'OpenSans',
    fontWeight: '500',
    color: '#a0a0a0',
  },
  followingImgTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingText1: {
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
  },
  followingText2: {
    color: '#a7a7a7',
    fontSize: 13,
    fontWeight: '100',
    paddingLeft: 5,
  },
};
