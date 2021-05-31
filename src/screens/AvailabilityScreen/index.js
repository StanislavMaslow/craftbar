import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { format, setHours } from 'date-fns';

import {
  Modal,
  View,
  StatusBar,
  ScrollView,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Container, Text, Button, Icon } from 'native-base';
import Calendar from '../../commons/Calendar';

import { getCheckInReq } from '../../redux-controller/post';

import Loader from '../../commons/Loader';
import DateInput from './DateInput';
import TimePicker from './TimePicker';

import Autocomplete from '../../commons/Aucomplete';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import styles from './styles';
import {
  addAvailabilityReq,
  editAvailabilityReq,
  deleteAvailabilityReq,
} from '../../redux-controller/user';

const { height } = Dimensions.get('window');
class AvailabilityScreen extends React.Component {
  static propTypes = {
    editAvailabilityRequest: PropTypes.func,
    getCheckInRequest: PropTypes.func,
    deleteAvailabilityRequest: PropTypes.func,
    addAvailabilityRequest: PropTypes.func,
    checkIn: PropTypes.arrayOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
    isCheckInLoading: PropTypes.bool,
  };

  static defaultProps = {
    editAvailabilityRequest: () => {},
    getCheckInRequest: () => {},
    deleteAvailabilityRequest: () => {},
    addAvailabilityRequest: () => {},
    checkIn: [],
    navigation: {},
    loading: false,
    isCheckInLoading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      barId: null,
      modalDayVisible: false,
      modalHourVisible: false,
      date: { from: new Date(), to: new Date() },
      hour: { from: new Date(), to: new Date() },
      bar: {},
      barName: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    if (item !== 'NO-ID') {
      const hourFrom = item.date_from.split(' ')[1].slice(0, 2);
      const hourTo = item.date_to.split(' ')[1].slice(0, 2);
      const minuteFrom = +item.date_from.split(' ')[1].slice(3, 5);
      const minuteTo = +item.date_to.split(' ')[1].slice(3, 5);
      if (item.bar_name) {
        this.setState({
          barName: item.bar_name,
          barId: item.bar_id,
        });
      }
      this.setState({
        date: {
          from: new Date(item.date_from.split(' ')[0]),
          to: new Date(item.date_to.split(' ')[0]),
        },
        hour: {
          from: setHours(new Date().setMinutes(minuteFrom), hourFrom),
          to: setHours(new Date().setMinutes(minuteTo), hourTo),
        },
      });
    }
  }

  setAvailability = () => {
    const { addAvailabilityRequest, editAvailabilityRequest, navigation } = this.props;
    const { date, hour, barId, barName } = this.state;
    if (barId === null && barName === '') {
      Alert.alert('Bar name is required!!!');
      return;
    }
    const item = navigation.getParam('item', 'NO-ID');
    const dateFrom = format(new Date(date.from), 'YYYY-MM-DD');
    const dateTo = format(new Date(date.to), 'YYYY-MM-DD');
    const hourFrom = format(new Date(hour.from), 'HH:mm');
    const hourTo = format(new Date(hour.to), 'HH:mm');
    const fullDateFrom = `${dateFrom} ${hourFrom}:00`;
    const fullDateTo = `${dateTo} ${hourTo}:00`;

    const data = {
      bar_id: barId,
      bar_name: barName,
      date_from: fullDateFrom,
      date_to: fullDateTo,
    };

    if (item === 'NO-ID') {
      addAvailabilityRequest(data);
    } else {
      editAvailabilityRequest({ ...data, id: item.id });
    }
    navigation.navigate('AvailabilityListScreen');
  };

  rangeDate = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      this.setState({ date: { from: startDate, to: endDate } });
    }
  };

  setDateFrom = newDate => {
    const { date } = this.state;
    this.setState({ date: { ...date, from: newDate } });
  };

  setDateTo = newDate => {
    const { date } = this.state;
    this.setState({ date: { ...date, to: newDate } });
  };

  setHourFrom = newDate => {
    const { hour } = this.state;
    this.setState({ hour: { ...hour, from: newDate } });
  };

  setDateFromAndroid = async () => {
    try {
      const { date } = this.state;
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });
      this.setState({ date: { ...date, from: new Date(year, month, day) } });

      if (action === 'dismissedAction') {
        // Selected year, month (0-11), day
        this.setState({ date: { ...date, from: new Date() } });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  setDateToAndroid = async () => {
    try {
      const { date } = this.state;
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });
      this.setState({ date: { ...date, to: new Date(year, month, day) } });
      if (action === 'dismissedAction') {
        // Selected year, month (0-11), day
        this.setState({ date: { ...date, to: new Date() } });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  setTimeAndroid = async currentItemToSet => {
    try {
      const { hour } = this.state;
      const defaultHour =
        currentItemToSet === 'hourFrom' ? +moment(hour.from).hour() : +moment(hour.to).hour();
      // const defaultMinutes = currentItemToSet === 'hourFrom' ? +moment(hour.from).minutes() : +moment(hour.to).minutes();
      const { action, hour: time, minute } = await TimePickerAndroid.open({
        hour: defaultHour,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });

      if (currentItemToSet === 'hourFrom') {
        this.setState({
          hour: {
            ...hour,
            from: moment()
              .set('hour', time)
              .set('minutes', minute),
          },
        });
      } else {
        this.setState({
          hour: {
            ...hour,
            to: moment()
              .set('hour', time)
              .set('minutes', minute),
          },
        });
      }
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({ code, message }) {
      // console.warn('Cannot open time picker', message);
    }
  };

  setHourTo = newDate => {
    const { hour } = this.state;
    this.setState({ hour: { ...hour, to: newDate } });

    if (Platform.OS === 'ios') {
      console.log('ios');
    } else {
      this.setEndDate();
    }
  };

  changeDate = mode => {
    if (Platform.OS === 'ios') {
      this.setState({
        modalDayVisible: true,
      });
    } else if (mode === 'from') {
      this.setDateFromAndroid();
    } else {
      this.setDateToAndroid();
    }
  };

  changeTime = item => {
    if (Platform.OS === 'ios') {
      this.setState({
        modalHourVisible: true,
      });
    } else {
      this.setTimeAndroid(item);
    }
  };

  handleSetBarId = bar => {
    if (bar.id) {
      this.setState({
        barId: bar.id,
        barName: '',
      });
    } else {
      this.setState({
        barName: bar,
        barId: null,
      });
    }
  };

  handleSetBarName = barName => {
    this.setState({
      barName,
      barId: null,
    });
  };

  setModalVisible = visible => {
    this.setState({ modalDayVisible: visible });
  };

  setModalTimeVisible = visible => {
    this.setState({ modalHourVisible: visible });
  };

  deleteAvailability = id => {
    const { deleteAvailabilityRequest } = this.props;
    deleteAvailabilityRequest(id);
  };

  renderAvailabilityScreen = () => {
    const { modalDayVisible, date, modalHourVisible, hour, bar } = this.state;
    const { navigation, checkIn, isCheckInLoading, getCheckInRequest, loading } = this.props;

    const item = navigation.getParam('item', 'NO-ID');

    if (loading) {
      return <Loader />;
    }
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Availability" navigation={navigation} />
        <ScrollView nestedScrollEnabled style={styles.scrollableZone}>
          {item !== 'NO-ID' && (
            <View style={styles.containerDeleteButton}>
              <Button
                primary
                style={styles.saveButton}
                onPress={() => {
                  this.deleteAvailability(item.id);
                }}
              >
                <Text style={styles.greenTextButton}>DELETE</Text>
              </Button>
            </View>
          )}

          {bar.bar_name ? (
            <View style={styles.barContainer}>
              <Text barCheckIcon={styles.barName}>{bar.bar_name}</Text>
              <Icon style={styles.barCheckIcon} type="Feather" name="check" />
            </View>
          ) : (
            <View style={{ marginTop: 10 }}>
              <Autocomplete
                label="Search Bar"
                actionRequest={getCheckInRequest}
                isLoading={isCheckInLoading}
                data={checkIn}
                handleSetBarId={this.handleSetBarId}
                handleSetBarName={this.handleSetBarName}
                initialValue={item.bar_name}
                isIcon
              />
            </View>
          )}

          <View style={styles.datePickerContainer}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.containerDateInput}
                onPress={() => this.changeDate('from')}
              >
                <DateInput label="Date from" interval={date} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerDateInput}
                onPress={() => this.changeDate('to')}
              >
                <DateInput label="Date to" interval={date} />
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalDayVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <ScrollView>
                <View style={{ height: height / 2, marginTop: 20 }}>
                  <Text style={styles.datePickerText}>From</Text>
                  <DatePickerIOS
                    style={styles.datePicker}
                    date={date.from}
                    onDateChange={this.setDateFrom}
                    mode="date"
                  />
                </View>
                <View style={{ height: height / 2 }}>
                  <Text style={styles.datePickerText}>To</Text>
                  <DatePickerIOS
                    style={styles.datePicker}
                    date={date.to}
                    onDateChange={t => this.setDateTo(t)}
                    mode="date"
                  />
                  <Button
                    onPress={() => {
                      this.setModalVisible(!modalDayVisible);
                    }}
                    full
                    primary
                    style={styles.buttonDatePicker}
                  >
                    <Text style={styles.greenTextButton}>Ok</Text>
                  </Button>
                </View>
              </ScrollView>
            </Modal>
            <View style={styles.callendarContainer}>
              <Calendar
                style={styles.callendar}
                onChange={range => this.rangeDate(range)}
                numberOfMonths={12}
                startDate={moment(date.from).format('YYYY-MM-DD')}
                endDate={moment(date.to).format('YYYY-MM-DD')}
                theme={{
                  weekColumnTextStyle: {
                    color: '#000',
                  },
                  weekColumnStyle: {
                    backgroundColor: '#ecedf1',
                  },
                  monthTitleStyle: {
                    color: 'blue',
                    backgroundColor: '#c2c2c2',
                  },
                  nonTouchableDayTextStyle: {
                    // color: 'red',
                  },

                  dayContainerStyle: {
                    backgroundColor: '#ecedf1',
                  },

                  dayTextStyle: {
                    color: '#000',
                  },
                  startDateTextStyle: {
                    color: 'green',
                  },
                  activeDayContainerStyle: {
                    backgroundColor: '#fafafb',
                  },
                }}
              />
            </View>
          </View>

          <View>
            {/* <TouchableOpacity style={styles.containerDateInput} onPress={this.changeTime}>
              <DateInput isHour label="Custom hour" interval={hour} />
            </TouchableOpacity> */}

            <Modal
              animationType="slide"
              transparent={false}
              visible={modalHourVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <ScrollView>
                <View style={{ height: height / 2, marginTop: 20 }}>
                  <Text style={styles.datePickerText}>From</Text>
                  <DatePickerIOS
                    style={styles.datePicker}
                    date={hour.from}
                    onDateChange={t => this.setHourFrom(t)}
                    mode="time"
                  />
                </View>
                <View style={{ height: height / 2 }}>
                  <Text style={styles.datePickerText}>To</Text>
                  <DatePickerIOS
                    style={styles.datePicker}
                    date={hour.to}
                    onDateChange={t => this.setHourTo(t)}
                    mode="time"
                  />
                  <Button
                    onPress={() => {
                      this.setModalTimeVisible(!modalHourVisible);
                    }}
                    full
                    primary
                    style={styles.buttonDatePicker}
                  >
                    <Text style={styles.greenTextButton}>Ok</Text>
                  </Button>
                </View>
              </ScrollView>
            </Modal>
            <View style={styles.containerTimePicker}>
              <TouchableOpacity onPress={() => this.changeTime('hourFrom')}>
                <TimePicker header="From" date={hour.from} />
              </TouchableOpacity>
              <View style={styles.emptyBlock} />
              <TouchableOpacity onPress={() => this.changeTime('hourTo')}>
                <TimePicker header="To" date={hour.to} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            onPress={() => {
              this.setAvailability();
            }}
            full
            primary
            style={styles.saveButton}
          >
            <Text style={styles.greenTextButton}>SAVE</Text>
          </Button>
          <View style={{ flex: 0.5 }} />
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  };

  render() {
    return this.renderAvailabilityScreen();
  }
}

const mapStateToProps = state => ({
  availability: state.user.availability.data || [],
  checkIn: state.posts.checkIn || [],
  isCheckInLoading: state.posts.isCheckInLoading,
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  addAvailabilityRequest: bindActionCreators(addAvailabilityReq, dispatch),
  editAvailabilityRequest: bindActionCreators(editAvailabilityReq, dispatch),
  deleteAvailabilityRequest: bindActionCreators(deleteAvailabilityReq, dispatch),
  getCheckInRequest: bindActionCreators(getCheckInReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvailabilityScreen);
