import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { H2 } from 'native-base';
import PropTypes from 'prop-types';

import Labels from './labels';
import styles from './styles';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

const labels = ['From people I follow', 'From friends', 'Nobody'];

class NotificationsSettings extends Component {
  state = {};

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    navigation: {},
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <ScrollView>
          <ScreenHeader target="SettingsScreen" title="Notifications" navigation={navigation} />
          <View style={styles.container}>
            <View style={styles.containerNotificatins}>
              <H2 style={styles.h2}>Push Notifications</H2>
              <Labels title="Posts" labels={labels} />
              <Labels title="Likes" labels={labels} />
              <Labels title="Comments" labels={labels} />
            </View>
            {/* 
            <View style={styles.containerNotificatins}>
              <H2 style={styles.h2}>E-mail Notifications</H2>
              <Labels title="Posts" labels={labels} style={{ marginTop: 14 }} />
              <Labels title="Cheers!" labels={labels} />
              <Labels title="Comments" labels={labels} />
            </View> */}
          </View>
          <ScreenFooter navigation={navigation} />
        </ScrollView>
      </View>
    );
  }
}

export default NotificationsSettings;
