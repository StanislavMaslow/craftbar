import { StyleSheet, Dimensions } from 'react-native';
import { greyText } from '../../utils/variables';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  availableContainer: {
    backgroundColor: 'rgb(236, 237, 241)',
    borderRadius: 5,
    marginTop: 14,
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 18,
    width: deviceWidth - 20,
  },
  content: {
    position: 'relative',
    marginLeft: 35,
    flexDirection: 'row',
    marginTop: 12,
  },

  availableText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    marginLeft: 10,
  },

  availableIcon: {
    fontSize: 14,
  },

  time: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    opacity: 0.4,
    marginTop: 9,
  },
  editIconContainer: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editIcon: {
    fontSize: 16,
    color: greyText,
  },
});

export default styles;
