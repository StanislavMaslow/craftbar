import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { formatDate, formatHour } from '../../utils/dates';
import styles from './AvailabilityStyle';

const Availability = ({ name, item }) => (
  <View style={styles.availableContainer}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon style={styles.availableIcon} type="Feather" name="clock" />
      <Text style={styles.availableText}>Available at: {name}</Text>
    </View>
    <Text>
      Date: {formatDate(item.date_from)} - {formatDate(item.date_to)}
    </Text>
    <Text>
      Hour: {formatHour(item.date_from)} - {formatHour(item.date_to)}
    </Text>
    <View style={styles.editIconContainer}>
      <Icon style={styles.editIcon} type="Feather" name="edit" />
    </View>
  </View>
);
Availability.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string,
};

Availability.defaultProps = {
  item: {},
  name: '',
};

export default Availability;
