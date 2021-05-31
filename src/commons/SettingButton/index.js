import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'native-base';
import IconFt from 'react-native-vector-icons/Feather';

import styles from './styles';

const SettingsButton = ({ navigation, isHeader }) => (
  <View style={styles.butttonContainer} key="header">
    <Button
      style={isHeader ? [{ ...styles.button, ...styles.buttonHeader }] : styles.button}
      onPress={() => navigation.navigate('SettingsScreen')}
    >
      <IconFt color="#8D8E90" size={20} name="settings" />
    </Button>
  </View>
);

SettingsButton.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  isHeader: PropTypes.bool,
};
SettingsButton.defaultProps = {
  navigation: {},
  isHeader: false,
};
export default SettingsButton;
