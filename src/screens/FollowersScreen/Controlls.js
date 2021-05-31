import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert } from 'react-native';
import { Button } from 'native-base';

import styles from './styles';

const confirmDeleteFollowing = (handleRemove, id) => {
  Alert.alert(
    '',
    'Remove follower ?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => handleRemove(id) },
    ],
    { cancelable: false }
  );
};

const Controlls = ({ handleRemove, id }) => (
  <View style={styles.buttonBlock}>
    <View>
      <Button
        dark
        style={styles.buttonRemove}
        onPress={() => confirmDeleteFollowing(handleRemove, id)}
      >
        <Text style={styles.buttonTipText}>Remove</Text>
      </Button>
    </View>
  </View>
);

Controlls.propTypes = {
  handleRemove: PropTypes.func,
  id: PropTypes.number,
};

Controlls.defaultProps = {
  handleRemove: () => {},
  id: 0,
};

export default Controlls;
