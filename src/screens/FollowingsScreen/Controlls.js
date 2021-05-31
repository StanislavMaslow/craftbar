import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert } from 'react-native';
import { Button } from 'native-base';

import styles from './styles';

const confirmDeleteFollowing = (handleRemove, id, username) => {
  const message = username ? `Unfollow from "${username}"` : `Remove follower ?`;
  Alert.alert(
    '',
    `${message}`,
    [
      { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
      { text: 'OK', onPress: () => handleRemove(id) },
    ],
    { cancelable: false }
  );
};

const Controlls = ({ role, handleRemove, id, navigation, username, followingsRole }) => (
  <View>
    {role === 'Patron' && (
      <View style={styles.buttonBlock}>
        {followingsRole === 'Barkeep' && (
          <Button
            dark
            style={styles.buttonTip}
            onPress={() => navigation.navigate('PaymentAddTipScreen', { id })}
          >
            <Text style={styles.buttonTipText}>Tip</Text>
          </Button>
        )}
        <Button
          dark
          style={[styles.buttonRemove, { width: followingsRole !== 'Barkeep' ? 155 : 100 }]}
          onPress={() => confirmDeleteFollowing(handleRemove, id, username)}
        >
          <Text style={styles.buttonTipText}>Unfollow</Text>
        </Button>
      </View>
    )}
    {role === 'Barkeep' && (
      <View>
        <Button
          dark
          style={styles.buttonRemove}
          onPress={() => confirmDeleteFollowing(handleRemove, id)}
        >
          <Text style={styles.buttonTipText}>Remove</Text>
        </Button>
      </View>
    )}
  </View>
);

Controlls.propTypes = {
  role: PropTypes.string,
  username: PropTypes.string,
  followingsRole: PropTypes.string,
  handleRemove: PropTypes.func,
  id: PropTypes.number,
  navigation: PropTypes.objectOf(PropTypes.any),
};

Controlls.defaultProps = {
  role: '',
  username: '',
  followingsRole: '',
  handleRemove: () => {},
  navigation: {},
  id: 0,
};

export default Controlls;
