import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import IconFt from 'react-native-vector-icons/Feather';
import styles from './stylesHeader';
import { mango } from '../../utils/variables';

const ProfileHeader = ({
  navigation,
  userData: { firstname, lastname, followers, followings, rating },
}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.buttonBack}>
        <Text style={styles.buttonText}>
          <Icon style={styles.iconBack} type="Ionicons" name="ios-arrow-back" /> Back
        </Text>
      </View>
    </TouchableOpacity>
    <View style={styles.blockInformation}>
      <Text style={styles.name}>
        <Text style={styles.firstName}>{firstname || ''}</Text> {lastname || ''}
      </Text>
      <View style={styles.followContainer}>
        <View>
          <Text style={styles.followCount}>{followers || 0}</Text>
          <Text style={styles.followNote}>Followers</Text>
        </View>
        <View style={styles.followBlock}>
          <Text style={styles.followCount}>{followings || 0}</Text>
          <Text style={styles.followNote}>Following</Text>
        </View>
        {(rating || rating === 0) && (
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{rating || 0}</Text>
            <IconFt size={16} active name="star" style={styles.iconStar} color={mango} />
          </View>
        )}
      </View>
    </View>
  </View>
);

ProfileHeader.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any),
};

ProfileHeader.defaultProps = {
  navigation: {},
  userData: {},
};

export default ProfileHeader;
