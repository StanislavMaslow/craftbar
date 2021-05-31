import React from 'react';

import { View, Text } from 'react-native';
import { Content } from 'native-base';
import PropTypes from 'prop-types';

import ScreenHeader from '../../commons/ScreenHeader';
import styles from './congratulationsStyles';

const Congratulations = ({ navigation }) => {
  const message = navigation.getParam('message', {});

  return (
    <Content>
      <ScreenHeader target="LatestPostsScreen" title="Confirm Tip" navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.h2}>Congratulations!</Text>
        <Text style={styles.h3}>{message}.</Text>
      </View>
    </Content>
  );
};

Congratulations.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

Congratulations.defaultProps = {
  navigation: {},
};

export default Congratulations;
