import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    width: deviceWidth,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollableZone: {
    width: '94%',
    alignSelf: 'center',
  },

  callendarContainer: {
    backgroundColor: '#ecedf1',
    height: 380,
    paddingTop: 30,
  },

  customDate: {
    marginBottom: 10,
    width: 200,
  },

  containerDateInput: {
    width: 100,
    zIndex: 0,
    flexDirection: 'row',
  },

  datePickerText: {
    fontSize: 22,
    fontFamily: 'OpenSansBold',
    marginLeft: 35,
    marginTop: 10,
  },

  buttonDatePicker: {
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#000',
    borderRadius: 5,
  },

  containerTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyBlock: {
    width: 20,
  },

  saveButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
  },

  containerDeleteButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  barContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 18,
    alignItems: 'center',
  },

  barCheckIcon: {
    fontSize: 18,
  },

  barName: {
    fontSize: 16,
    fontFamily: 'OpenSansRegular',
  },
};

// vadului vode 34  lumea ferului
