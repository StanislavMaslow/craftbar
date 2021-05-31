import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

const Label = ({ label, labelValue, item }) => (
  <View style={[styles.labelContainer, { marginTop: item === 0 ? 9 : 20 }]}>
    <Text style={styles.label}>{label}</Text>
    {labelValue === label && <Icon style={styles.iconCheck} type="Ionicons" name="md-checkmark" />}
  </View>
);

Label.propTypes = {
  label: PropTypes.string,
  labelValue: PropTypes.string,
  item: PropTypes.number,
};
Label.defaultProps = {
  label: '',
  labelValue: '',
  item: '',
};

export default Label;
