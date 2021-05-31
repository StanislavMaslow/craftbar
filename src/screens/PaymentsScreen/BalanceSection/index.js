import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './BalanceStyle';

const BalanceSection = ({ balance }) => {
  const currencys = Object.keys(balance);
  return (
    <View style={styles.withdrawContainer}>
      {/* <Text>{balance && balance.usd.pending}</Text> */}
      <View style={styles.withdraw}>
        {currencys.map((item, i) => (
          <View key={balance[item].pending + i}>
            <Text>Total: {balance && balance[item].total}</Text>
            <Text>Pending: {balance && balance[item].pending}</Text>
            <Text>Available: {balance && balance[item].available}</Text>
          </View>
        ))}
        <Text style={styles.withdrawText}>Withdraw Funds </Text>
      </View>
    </View>
  );
};

BalanceSection.propTypes = {
  balance: PropTypes.objectOf(PropTypes.any),
};

BalanceSection.defaultProps = {
  balance: {},
};

export default BalanceSection;
