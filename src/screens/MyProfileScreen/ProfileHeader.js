import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
/* eslint-disable */

import { Col, Row, Grid } from 'react-native-easy-grid';
/* eslint-enable */
import IconFt from 'react-native-vector-icons/Feather';

import Available from '../../commons/UserProfile/Available';
import SettingsButton from '../../commons/SettingButton';
import styles from './styles';
import { mango } from '../../utils/variables';

const defaultAva = require('../../../assets/images/default.png');

const ProfileHeader = ({ imageSrc, navigation, userData, availability, role }) => (
  <View
    style={[styles.headerContainer, { height: role === 'Patron' || role === 'Bar' ? 300 : 380 }]}
    key="header"
  >
    <SettingsButton navigation={navigation} />
    <View style={styles.sections}>
      <View style={styles.avatar}>
        <TouchableOpacity onPress={() => navigation.navigate('AccountScreen')}>
          <Image
            style={
              imageSrc
                ? styles.avatarImage
                : {
                    width: 0,
                    height: 0,
                  }
            }
            source={imageSrc ? { uri: imageSrc, cache: 'reload' } : defaultAva}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.greyHeader}>
        <View style={styles.innerContainer} />
        <View style={[styles.innerContainer, styles.nameContainer]}>
          <Text style={styles.name}>{userData.firstname}</Text>
          <Text style={styles.name}>{userData.lastname}</Text>
        </View>
      </View>
      <View style={styles.whitePart}>
        <View style={styles.innerContainer} />
        <View style={styles.innerContainer}>
          <Grid style={styles.followersContainer}>
            <Row>
              <Col>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowersScreen', { userData });
                  }}
                >
                  <Text style={[styles.centerText, styles.bold]}>{userData.followers}</Text>
                  <Text style={[styles.centerText, styles.smallSizetext]}>Followers</Text>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FollowingsScreen', { userData });
                  }}
                >
                  <Text style={[styles.centerText, styles.bold]}>{userData.followings}</Text>
                  <Text style={[styles.centerText, styles.smallSizetext]}>Following</Text>
                </TouchableOpacity>
              </Col>
              {role !== 'Patron' && (
                <Col>
                  <View style={styles.rating}>
                    <Text style={styles.ratingText}>{userData.rating || 0}</Text>
                    <IconFt size={16} active name="star" style={styles.iconStar} color={mango} />
                  </View>
                </Col>
              )}
            </Row>
          </Grid>
          <View style={{ marginBottom: 5 }}>
            {role !== 'Patron' && role !== 'Bar' && (
              <Available
                availability={availability}
                role={role}
                navigation={navigation}
                isCurrent
              />
            )}
          </View>
        </View>
      </View>
    </View>
  </View>
);

ProfileHeader.propTypes = {
  imageSrc: PropTypes.string,
  navigation: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any),
  availability: PropTypes.arrayOf(PropTypes.any),
  role: PropTypes.string,
};
ProfileHeader.defaultProps = {
  imageSrc: '',
  navigation: {},
  userData: {},
  availability: [],
  role: '',
};

export default ProfileHeader;
