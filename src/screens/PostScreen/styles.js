import { StyleSheet } from 'react-native';
import { paleGrey, greyText } from '../../utils/variables';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },

  container: {
    backgroundColor: '#fff',
    height: 200,
    position: 'relative',
  },
  noImagePostContainer: {
    backgroundColor: greyText,
    height: 100,
    position: 'relative',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  infoContainer: {
    position: 'absolute',
    top: 0,
  },
  caption: {
    marginTop: 20,
    marginLeft: 10,
  },

  captionText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'OpenSansBold',
  },

  byContainer: {
    marginTop: 100,
    marginLeft: 15,
  },

  noImageByContainer: {
    marginTop: 10,
    marginLeft: 15,
  },

  byText: {
    color: '#615e5d',
    fontSize: 16,
    fontFamily: 'OpenSansLight',
  },

  name: {
    fontSize: 16,
    fontFamily: 'OpenSansItalic',
    color: '#fff',
  },

  timeAgo: {
    fontSize: 16,
    fontFamily: 'OpenSansLight',
    color: '#fff',
  },

  rowInfo: {
    marginTop: 20,
    marginLeft: 15,
    flexDirection: 'row',
  },

  callInfo: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },

  icon: {
    fontSize: 16,
    marginRight: 10,
    color: '#fff',
  },
  reportIcon: { marginTop: 1, color: '#fff' },

  number: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'OpenSansLight',
    alignSelf: 'center',
  },

  description: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  border: {
    height: 2,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },

  firstLetter: {
    fontSize: 20,
    fontFamily: 'OpenSansBold',
  },

  restText: {
    fontSize: 17,
    fontFamily: 'OpenSansRegular',
  },
  sendIcon: {
    height: 40,
    width: 40,
    marginTop: 12,
    marginRight: 5,
  },

  comentsContainer: {
    padding: 10,
  },
  firstCommentRow: {
    // height: 40,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  lastCommentRow: {
    flexDirection: 'row',
  },
  avaContainer: {
    alignItems: 'center',
    padding: 5,
    width: '10%',
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    paddingLeft: 5,
  },
  inputContainer: {
    width: '85%',
    marginBottom: 100,
  },
  input: { marginBottom: 5, marginLeft: 5, marginRight: 5, marginTop: 5 },
  nameContainer: {
    flexDirection: 'row',
  },
  firstname: { fontWeight: '700' },
  lastname: { fontWeight: '700' },
  greyContainer: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    marginLeft: 8,
    backgroundColor: paleGrey,
    borderRadius: 10,
    width: '87%',
  },
  nameAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createdAt: {
    color: greyText,
  },
  commentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentContainer: {
    maxWidth: '95%',
  },
  commentText: {},
  iconContainer: {
    flexDirection: 'row',
  },
  editIcon: {
    marginRight: 10,
  },
  deleteIcon: {
    marginRight: 10,
  },
});
