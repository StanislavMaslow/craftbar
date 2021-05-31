import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './paymentHeaderStyle';
import navigation from '../../services/navigation';

import ApiUtils from '../../api/api-utils';

const baseUrl = `${ApiUtils.getImageUrl()}`;

const PaymentsHeader = ({ role, firstName, lastName, avatar, charges }) => (
  <View style={styles.container}>
    <Image source={{ uri: `${baseUrl}${avatar}` }} style={styles.image} />
    <View style={styles.info}>
      <View style={styles.containerName}>
        <Text style={styles.firstName}>{firstName}</Text>
        <Text style={styles.secondName}>{lastName}</Text>
      </View>
      {role !== undefined && role === 'Barkeep' && (
        <TouchableOpacity
          style={{ flexDirection: 'row', marginBottom: 6, marginTop: 6, marginLeft: -2 }}
          onPress={() => navigation.navigate('IdentityScreen')}
        >
          <Icon type="Feather" name="user" style={styles.iconCard} />
          <Text style={styles.connectPayment}>Payment Identity</Text>
          {!charges && <Text style={styles.error}>add</Text>}
        </TouchableOpacity>
      )}
      <View style={styles.containerConnectPayment}>
        {role === 'Barkeep' && charges && (
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => navigation.navigate('CardsScreen')}
            >
              <Icon type="Feather" name="credit-card" style={styles.iconCard} />
              <Text style={styles.connectPayment}>Credit cards</Text>
            </TouchableOpacity>
          </View>
        )}

        {role === 'Patron' && (
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => navigation.navigate('CardsScreen')}
          >
            <Icon type="Feather" name="credit-card" style={styles.iconCard} />
            <Text style={styles.connectPayment}>Credit cards</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

PaymentsHeader.propTypes = {
  role: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  charges: PropTypes.bool,
};

PaymentsHeader.defaultProps = {
  role: '',
  firstName: '',
  lastName: '',
  avatar: '',
  charges: false,
};

export default PaymentsHeader;
