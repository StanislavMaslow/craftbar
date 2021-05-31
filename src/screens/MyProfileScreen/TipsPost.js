import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
/* eslint-disable */

import { Col, Row, Grid } from 'react-native-easy-grid';
/* eslint-enable */

import IconFT from 'react-native-vector-icons/Feather';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles';

import ApiUtils from '../../api/api-utils';

const url = `${ApiUtils.getImageUrl()}`;

const TipsPost = ({ tipspost }) => (
  <View style={styles.tipsPostContainer}>
    <Row style={styles.avaContainer}>
      <View style={styles.tipsPostAvatar}>
        <Image
          style={styles.avatarTips}
          source={tipspost.receiver && { uri: `${url}${tipspost.receiver.avatar}` }}
        />
      </View>
      <View style={styles.tipsPostAvatar}>
        <IconFT size={20} name="arrow-right" style={styles.arrowIcon} />
      </View>
      <View style={styles.tipsPostAvatar}>
        <Image style={styles.avatarTips} source={{ uri: `${url}${tipspost.sender.avatar}` }} />
      </View>
    </Row>
    <View style={styles.tipsPostGrid}>
      <Row style={styles.tipsFirstRow}>
        <View style={styles.tipsPostAvatar}>
          <Text style={[styles.name, styles.openSans]}>{tipspost.sender.firstname}</Text>
          <Text style={styles.openSans}>{tipspost.sender.lastname}</Text>
        </View>

        <View style={styles.tipsPostAvatar}>
          <Text style={styles.tipsAmount}>{tipspost.amount}</Text>
          <Text style={styles.openSans}>Tips</Text>
        </View>

        <View style={styles.tipsPostAvatar}>
          <Text style={styles.name}>{tipspost.receiver.firstname}</Text>
          <Text style={styles.openSans}>{tipspost.receiver.lastname}</Text>
        </View>
      </Row>
      <View style={styles.greyDevider} />
      <View style={styles.lastTipsRow}>
        <View style={styles.lastRowView}>
          <Text style={styles.openSans}>{tipspost.message}</Text>
        </View>
        <View style={styles.lastRowView}>
          <IconSLI size={17} style={styles.pinIcon} name="location-pin" />
          <Text style={styles.openSans}>
            {tipspost.bar && tipspost.bar.firstname}
            {tipspost.bar && tipspost.bar.lastname && tipspost.bar.lastname}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

TipsPost.propTypes = {
  tipspost: PropTypes.objectOf(PropTypes.any),
};
TipsPost.defaultProps = {
  tipspost: {},
};

export default TipsPost;
