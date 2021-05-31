import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },

  tagsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 15,
  },

  tag: {
    backgroundColor: 'rgb(236, 237, 241)',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },

  tagText: {
    fontSize: 14,
    fontFamily: 'OpenSansRegular',
  },

  iconClose: {
    marginLeft: 5,
    fontSize: 14,
    padding: 5,
  },

  listPeople: {
    marginTop: 10,
    marginLeft: 15,
    paddingLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'relative',
    backgroundColor: '#F8F8F8',
  },

  closeList: {
    position: 'absolute',
    top: -3,
    right: -3,
    padding: 10,
    zIndex: 5,
  },

  item: {
    paddingTop: 5,
    paddingBottom: 5,
  },

  itemText: {
    fontSize: 16,
    fontFamily: 'OpenSansRegular',
  },

  form: {
    position: 'relative',
  },

  spinner: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  iconClear: {
    position: 'absolute',
    top: 30,

    right: 0,
  },
});
