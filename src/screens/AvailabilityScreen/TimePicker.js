import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Icon } from 'native-base';
import styles from './TimePickerStyle';

const TimePicker = ({ header, date }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{header}</Text>
    </View>
    <View style={styles.row}>
      <View style={styles.call}>
        <Text style={styles.callText}>{format(new Date(date), 'hh')}</Text>
      </View>
      <View style={styles.call}>
        <Text style={styles.callText}>{format(new Date(date), 'mm')}</Text>
      </View>
      <View style={styles.call}>
        <Text style={styles.callText}>{format(new Date(date), 'A')}</Text>
      </View>
      <View>
        <Icon style={styles.icon} name="chevron-down" type="Feather" />
      </View>
    </View>
  </View>
);
TimePicker.propTypes = {
  header: PropTypes.string,
  date: PropTypes.objectOf(PropTypes.any),
};

TimePicker.defaultProps = {
  header: '',
  date: {},
};

export default TimePicker;
