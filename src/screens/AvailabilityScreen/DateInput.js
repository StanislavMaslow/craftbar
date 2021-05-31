import React from 'react';
import { format } from 'date-fns';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './DateInputStyle';

const formatDate = (isHour, date) => {
  if (isHour) {
    return format(new Date(date), 'H A');
  }
  return format(new Date(date), 'MM.DD');
};

const DateInput = ({ interval, label, isHour }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.input}>
      {label === 'Date from' ? (
        <Text style={styles.text}>{formatDate(isHour, interval.from)}</Text>
      ) : (
        <Text style={styles.text}>{formatDate(isHour, interval.to)}</Text>
      )}

      <Icon style={styles.icon} name="chevron-down" type="Feather" />
    </View>
  </View>
);

DateInput.propTypes = {
  interval: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  isHour: PropTypes.bool,
};

DateInput.defaultProps = {
  interval: {
    from: 'From',
    to: 'To',
  },
  label: '',
  isHour: false,
};

export default DateInput;
