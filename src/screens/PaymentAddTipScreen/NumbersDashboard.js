import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Icon, Spinner } from 'native-base';

import styles from './numbersStyles';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

const styleNumbers = number => {
  if (number === 7 || number === 4 || number === 1 || number === 0) {
    return styles.buttonNumber;
  }
  return [styles.buttonNumber, { width: 80 }];
};

const NumbersDashboard = ({
  handlePressNumberDashboard,
  handleDeleteText,
  handleConfirmTip,
  isConfirmTipLoading,
}) => (
  <View style={styles.container}>
    {numbers.map(number => (
      <TouchableOpacity key={number} onPress={() => handlePressNumberDashboard(number)}>
        <View style={styleNumbers(number)}>
          <Text style={styles.buttonNumberText}>{number}</Text>
        </View>
      </TouchableOpacity>
    ))}
    <TouchableOpacity onPress={handleDeleteText}>
      <View style={[styles.buttonNumber, { width: 80 }]}>
        <Icon style={styles.icon} type="EvilIcons" name="chevron-left" />
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleConfirmTip}>
      <View style={styles.buttonTip}>
        {isConfirmTipLoading ? (
          <Spinner color="#fff" style={{ marginLeft: 15 }} />
        ) : (
          <Text style={styles.buttonText} buttonText>
            Tip
          </Text>
        )}
        <Icon style={styles.iconTip} type="EvilIcons" name="chevron-right" />
      </View>
    </TouchableOpacity>
  </View>
);

NumbersDashboard.propTypes = {
  handlePressNumberDashboard: PropTypes.func,
  handleDeleteText: PropTypes.func,
  handleConfirmTip: PropTypes.func,
  isConfirmTipLoading: PropTypes.bool,
};

NumbersDashboard.defaultProps = {
  handlePressNumberDashboard: () => {},
  handleDeleteText: () => {},
  handleConfirmTip: () => {},
  isConfirmTipLoading: false,
};

export default NumbersDashboard;
