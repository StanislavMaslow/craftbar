import { Platform, Dimensions } from 'react-native';
import { paleGrey, brownGrey } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;
export default {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: deviceWidth,
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
  },
  pageHeader: {
    paddingLeft: 35,
    flex: 1,
  },
  headerTitle: {
    fontSize: 36,
    fontFamily: 'OpenSansLight',
  },
  sections: {
    position: 'relative',
  },

  postContainer: {
    marginTop: 1,
    paddingTop: 50,
    elevation: 100,
  },
  postGrid: {},
  postedByAva: {
    marginBottom: -10,
    marginLeft: 26,
    flexDirection: 'row',
    position: 'absolute',
    top: 27,
    elevation: 100,
    zIndex: 99,
    overflow: 'visible',
  },
  postHeader: {
    backgroundColor: paleGrey,
    height: 300,
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
  },
  postHeaderNoImage: {
    backgroundColor: paleGrey,
    width: '80%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
  },
  postImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginTop: 50,
    position: 'absolute',
    zIndex: 33,
    elevation: 100,
    overflow: 'visible',
  },
  postNoImageContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 2,
    marginTop: 30,
    borderWidth: 2,
    borderColor: 'yellow',
    overflow: 'visible',
  },
  postImage: {
    width: 300,
    height: 170,
    borderRadius: 5,
  },
  postData: {
    height: 50,
    flexDirection: 'row',
    marginRight: -7,
    width: '80%',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 3,
  },
  reportIconContainer: (function() {
    if (Platform.OS === 'ios') {
      return {
        alignSelf: 'flex-end',
        top: -53,
        right: 2,
        height: 25,
        with: 25,
        zIndex: 999,
        position: 'absolute',
      };
    } 
      return {
        alignSelf: 'flex-end',
        top: -10,
        right: 2,
        height: 25,
        with: 25,
        zIndex: 999,
        position: 'absolute',
      };
    
  })(),

  reportIcon: {
    color: brownGrey,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: deviceWidth < 330 ? 8 : 12,
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
    minHeight: 20,
    marginTop: 8,
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  postDescriptionContainerTextNoImage: {
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 60,
    width: '92%',
  },
  postDescriptionTextNoImage: {},
  postedBy: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  postDescriptionTextContainer: {
    width: '90%',
  },
  postDescriptionText: {
    // minWidth: deviceWidth < 321 ? 150 : 200,
    textAlign: 'justify',
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingLeft: 10,
  },
  // ---------------Tips Post styles-----------

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
  },
  avaContainer: {
    flex: 1,
    position: 'absolute',
    top: 25,
    width: '88%',
    marginLeft: -4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 100,
    zIndex: 99,
    overflow: 'visible',
  },
  postedAt: {
    marginLeft: 7,
    marginTop: 3,
  },
  createdAt: {
    height: 55,
    minWidth: deviceWidth < 321 ? 90 : 100,
    fontSize: 13,
    marginTop: 2,
  },
  tipsPostAvatar: {
    // top: 25,
    // elevation: 100,
    // zIndex: 99,
    // position: 'absolute',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  avatarTips: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  tipsFirstRow: {
    flex: 1,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  arrowIcon: { color: brownGrey },
  pinIcon: { marginBottom: 0, marginTop: 5 },
  tipsAmount: {
    fontSize: 24,
  },
  // greyDevider: {
  //   height: 1,
  //   backgroundColor: brownGrey,
  //   width: '90%',
  //   marginLeft: '10%',
  //   marginTop: 15,
  //   marginBottom: 15,
  // },
  lastTipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lastRowView: {
    maxWidth: '40%',
  },
  openSans: {
    fontFamily: 'OpenSans',
  },
};
