import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Controlls from './Controlls';

import ApiUtils from '../../api/api-utils';

import styles from './styles';

const baseUrl = `${ApiUtils.getImageUrl()}`;

const Follower = ({ data, role, handleRemove, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', { itemId: data.id })}>
    <View style={styles.followingMainBlock}>
      <View style={styles.followingImgTxt}>
        <Image source={{ uri: `${baseUrl}${data.avatar}` }} style={styles.followingImage} />
        <View style={styles.followingBlockText}>
          <Text style={styles.followingText1}>
            {data.firstname} {data.lastname}
          </Text>
          <Text style={styles.followingText2}>{data.username}</Text>
        </View>
      </View>
      <Controlls navigation={navigation} role={role} id={data.id} handleRemove={handleRemove} />
    </View>
  </TouchableOpacity>
);

Follower.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  role: PropTypes.string,
  handleRemove: PropTypes.func,
  navigation: PropTypes.objectOf(PropTypes.any),
};

Follower.defaultProps = {
  data: {},
  role: '',
  handleRemove: () => {},
  navigation: {},
};

export default Follower;
