import React from 'react';

import { Text, View } from 'react-native';
import { Card, Button } from 'native-base';
import PropTypes from 'prop-types';

import styles from './cardStyles';
import Loader from '../../../commons/Loader';

const CardComponent = ({
  id,
  brand,
  last4,
  currency,
  exp_month: expMonth,
  exp_year: expYear,
  default: defaulValue,
  handleDeleteCard,
  handleSelectStatusCard,
  isSelectCardLoader,
}) => (
  <Card style={styles.container}>
    <Text style={styles.note}>Card: {brand}</Text>
    <Text style={styles.note}>Card number: {last4}</Text>
    <Text style={styles.note}>Currency: {currency || 0}</Text>
    <Text style={styles.note}>
      Expiry month:
      {expMonth}
    </Text>
    <Text style={styles.note}>Expiry year: {expYear}</Text>
    <Text style={styles.note}>Default: {defaulValue ? 'Yes' : 'No'}</Text>
    <View style={styles.buttonContainer}>
      {defaulValue ? (
        <Button style={styles.defaultCard} small disabled bordered>
          <Text style={styles.defaultCardText}>Default card</Text>
        </Button>
      ) : (
        <Button
          onPress={() => handleSelectStatusCard(id)}
          style={[isSelectCardLoader ? styles.defaultCard : styles.button]}
          small
          bordered
          dark={!isSelectCardLoader}
        >
          {isSelectCardLoader ? <Loader /> : <Text style={styles.buttonText}>Set as default</Text>}
        </Button>
      )}
      <Button
        onPress={() => handleDeleteCard(id)}
        style={[isSelectCardLoader ? styles.defaultCard : styles.button]}
        disabled={isSelectCardLoader}
        small
        bordered
        dark={!isSelectCardLoader}
      >
        <Text style={[isSelectCardLoader ? styles.defaultCardText : styles.buttonText]}>
          Delete card
        </Text>
      </Button>
    </View>
  </Card>
);

CardComponent.propTypes = {
  id: PropTypes.string,
  brand: PropTypes.string,
  last4: PropTypes.string,
  currency: PropTypes.string,
  exp_month: PropTypes.number,
  exp_year: PropTypes.number,
  default: PropTypes.bool,
  handleDeleteCard: PropTypes.func,
  handleSelectStatusCard: PropTypes.func,
  isSelectCardLoader: PropTypes.bool,
};

CardComponent.defaultProps = {
  id: '',
  brand: '',
  last4: '',
  currency: '',
  exp_month: 0,
  exp_year: 2022,
  default: false,
  isSelectCardLoader: false,
  handleDeleteCard: () => {},
  handleSelectStatusCard: () => {},
};

export default CardComponent;
