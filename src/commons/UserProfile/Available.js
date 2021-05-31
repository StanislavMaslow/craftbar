import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Form, Picker } from 'native-base';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { formatDate, formatHour } from '../../utils/dates';
import styles from './contentStyles';

class Available extends React.Component {
  state = {
    indexBar: 0,
  };

  componentDidMount() {
    const { availability } = this.props;
    const currentBar = availability && availability.length && this.handleCurrentBar();
    this.setState({
      indexBar: currentBar,
    });
  }

  handleCurrentBar = () => {
    const { availability } = this.props;
    let currentBar = 0;
    const currentTime = format(new Date(), 'x');
    availability.forEach((element, i) => {
      const key = Object.keys(element);
      const dateFrom = element[key].date_from.split(' ')[0];
      const dateTo = element[key].date_to.split(' ')[0];
      const hourFrom = element[key].date_from.split(' ')[1].slice(0, 2);
      const hourTo = element[key].date_to.split(' ')[1].slice(0, 2);
      const dateFromParts = dateFrom.split('-');
      const dateToParts = dateTo.split('-');
      dateFromParts[1] = +dateFromParts[1] - 1;
      dateToParts[1] = +dateToParts[1] - 1;
      const dateFromTimestamp = format(new Date(...dateFromParts, hourFrom), 'x');
      const dateToTimestamp = format(new Date(...dateToParts, hourTo), 'x');
      if (currentTime > dateFromTimestamp && currentTime < dateToTimestamp) {
        currentBar = i;
      }
    });
    return currentBar;
  };

  handleChangeBar = indexBar => {
    this.setState({
      indexBar,
    });
  };

  navigateToAvailability = () => {
    console.log('---------navigating-', this.props);
    const { navigation, isCurrent } = this.props;

    if (isCurrent) {
      navigation.navigate('AvailabilityListScreen');
    } else {
      console.log('-------can not go to Availability list---');
    }
  };

  render() {
    const { availability, role } = this.props;
    const { indexBar } = this.state;

    const keyAvailability =
      availability && availability.length ? Object.keys(availability[indexBar])[0] : '';
    const isAvailability = availability && !!availability.length;

    return (
      // prettier-ignore
      <View>
        <View style={styles.BarContainer}>
          <Form>
            {isAvailability && (
              <Picker
                mode="dropdown"
                iosHeader="Select your bar"
                iosIcon={
                  <Icon
                    type="Feather"
                    name="chevron-right"
                    style={{ color: 'rgba(0, 0, 0, 0.4)', marginLeft: -2 }}
                  />
                }
                textStyle={styles.texstInPicker}
                style={styles.colorPickerText}
                selectedValue={indexBar}
                onValueChange={this.handleChangeBar}
              >
                {availability &&
                  availability.map((item, index) => {
                    const key = Object.keys(item)[0];
                    return (
                      <Picker.Item key={item[key].id} label={item[key].bar_name} value={index} />
                    );
                  })}
              </Picker>
            )}
          </Form>
        </View>
        {role !== 'Patron' && (
          <TouchableOpacity
            style={
              isAvailability
                ? styles.availableContainer
                : [styles.availableContainer, { marginTop: 10 }]
            }
            onPress={()=> this.navigateToAvailability()}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={styles.availableIcon} type="Feather" name="clock" />
              <Text style={styles.availableText}>Available</Text>
            </View>
            {!isAvailability ? (
              <Text style={styles.availableEmpty}>Availability is not set</Text>
            ) : (
              <View>
                <Text style={styles.time}>
                  {availability && formatDate(availability[indexBar][keyAvailability].date_from)} to{' '}
                  {availability && formatDate(availability[indexBar][keyAvailability].date_to)}
                </Text>
                <Text style={styles.time}>
                  {availability && formatHour(availability[indexBar][keyAvailability].date_from)} to{' '}
                  {availability && formatHour(availability[indexBar][keyAvailability].date_to)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

Available.propTypes = {
  availability: PropTypes.arrayOf(PropTypes.any),
  role: PropTypes.string,
  navigation: PropTypes.objectOf(PropTypes.any),
  isCurrent: PropTypes.bool,
};

Available.defaultProps = {
  availability: [],
  role: '',
  navigation: {},
  isCurrent: false,
};

export default Available;
