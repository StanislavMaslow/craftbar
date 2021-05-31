import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
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

const cutId = str => {
  const regular = /\d+/;

  return str.match(regular)[0];
};

const TipsPost = ({ tipspost, navigation }) => (
  <View style={styles.tipsPostContainer}>
    <Row style={styles.avaContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserProfileScreen', { itemId: cutId(tipspost.sender.link) })
        }
      >
        <View style={styles.tipsPostAvatar}>
          <Image
            style={styles.avatarTips}
            source={tipspost.receiver && { uri: `${url}${tipspost.sender.avatar}` }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.tipsPostAvatar}>
        <IconFT size={20} name="arrow-right" style={styles.arrowIcon} />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserProfileScreen', { itemId: cutId(tipspost.receiver.link) })
        }
      >
        <View style={styles.tipsPostAvatar}>
          <Image style={styles.avatarTips} source={{ uri: `${url}${tipspost.receiver.avatar}` }} />
        </View>
      </TouchableOpacity>
    </Row>
    <View style={styles.tipsPostGrid}>
      <Row style={styles.tipsFirstRow}>
        <View style={styles.tipsPostAvatar}>
          <Text style={[styles.name, styles.openSans]}>{tipspost.sender.firstname}</Text>
          <Text style={styles.openSans}>{tipspost.sender.lastname}</Text>
        </View>

        <View style={styles.tipsPostAvatar}>
          <Text style={styles.tipsAmount}>{tipspost.barkeep_receive}</Text>
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
        {tipspost.bar && (
          <View style={styles.lastRowView}>
            <IconSLI size={17} style={styles.pinIcon} name="location-pin" />
            <Text style={styles.openSans}>
              {tipspost.bar.firstname}
              {tipspost.bar.lastname && tipspost.bar.lastname}
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

TipsPost.propTypes = {
  tipspost: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
};
TipsPost.defaultProps = {
  tipspost: {},
  navigation: {},
};

export default TipsPost;
