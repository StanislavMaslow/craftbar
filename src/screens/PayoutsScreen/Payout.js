import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

import PropTypes from 'prop-types';

import styles from './styles';

const Payout = ({ item }) => (
  <View style={styles.availableContainer}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon style={styles.availableIcon} type="Feather" name="clock" />
      <Text style={styles.availableText}>Created at: {item.created_at}</Text>
    </View>
    <Text>Amount: {item.amount}</Text>
    <Text>Card: {item.last4}</Text>
  </View>
);

Payout.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

Payout.defaultProps = {
  item: {},
};

export default Payout;
