import { Platform, Dimensions } from 'react-native';
import { paleGrey, brownGrey } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;
export default {
  container: {
    width: deviceWidth,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: paleGrey,
    paddingBottom: 15,
    height: 380,
    // borderWidth: 2,
    // borderColor: 'red',
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 35,
    marginTop: 10,
    marginBottom: -15,
    letterSpacing: 0,
  },
  sections: {
    position: 'relative',
    // borderWidth: 2,
    // borderColor: 'pink',
  },
  greyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: paleGrey,
    // borderWidth: 2,
    // borderColor: 'gray',
    height: 80,
    zIndex: 1,
    top: 0,
  },
  whitePart: {
    // position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 250,
    zIndex: 0,
    bottom: 1,
  },
  button: {
    marginTop: 30,
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: '8%',
    zIndex: 99,
  },
  avatarImage: {
    width: 135,
    height: 200,
    borderRadius: 5,
  },
  innerContainer: {
    minHeight: 100,
    minWidth: '40%',
    maxWidth: '45%',
  },
  nameContainer: {
    paddingLeft: 1,
    paddingTop: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'OpenSans',
  },

  followersContainer: {
    marginTop: 15,
    width: 160,
    marginLeft: deviceWidth < 340 ? -8 : 0,
  },

  followersContainerCol: {
    // justifyContent: 'center',
  },
  centerText: {
    alignSelf: 'center',
    fontFamily: 'OpenSans',
  },
  bold: { fontWeight: '900' },
  userDescription: {
    height: 100,
    // borderWidth: 2,
    // borderColor: 'orange',
    paddingRight: 6,
  },
  userDescriptionText: {
    fontFamily: 'OpenSans',
    fontSize: 14,
  },
  smallSizetext: {
    fontSize: 11,
    color: brownGrey,
    marginTop: -4,
  },

  rating: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },

  ratingText: {
    color: 'rgb(252, 185, 41)',
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: -1,
    fontFamily: 'OpenSansBold',
  },

  iconStar: {
    marginTop: 2,
    marginLeft: 0,
    marginRight: 15,
  },
  // --------------- Post styles------------
  postContainer: {
    marginTop: 15,
    paddingTop: 75,
    backgroundColor: '#fff',
  },
  postHeader: {
    backgroundColor: paleGrey,
    height: 190,
    flexDirection: 'column',
    alignItems: 'center',
  },
  postHeaderNoImage: {
    backgroundColor: paleGrey,
    minHeight: 100,
    flexDirection: 'column',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginTop: -50,
    position: 'absolute',
    zIndex: 33,
    elevation: 100,
  },
  image: {
    marginTop: -30,
  },

  deleteIcon: {
    fontSize: 24,
    zIndex: 10,
    color: 'grey',
    position: 'absolute',
    top: -3,
    right: 25,
  },

  editIcon: {
    fontSize: 24,
    zIndex: 10,
    color: 'grey',
    position: 'absolute',
    top: -3,
    right: 60,
  },

  postData: {
    height: 50,
    flexDirection: 'column',
    marginRight: -7,
    width: '80%',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 3,
  },
  controlsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 16,
  },
  glassesIcon: {
    width: 20,
    height: 20,
  },
  socialIcon: {
    color: brownGrey,
    marginRight: 7,
  },
  greyCollor: {
    color: brownGrey,
  },
  postDescription: {
    backgroundColor: '#fff',
    minHeight: 5,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postDescriptionNoImage: {
    minHeight: 50,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  postDescriptionText: {
    width: 286,
  },
  // ---------------Tips Post styles------------

  tipsPostContainer: {
    flex: 1,
    position: 'relative',
    minHeight: 220,
    marginTop: 30,
    marginBottom: 40,
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
  tipsPostAvatar: {
    // top: 25,
    // elevation: 100,
    // zIndex: 99,
    // position: 'absolute',
    // borderWidth: 2,
    // borderColor: 'red',
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

  containerForScrollViewSpinner: {
    backgroundColor: paleGrey,
    height: 20,
  },
};
