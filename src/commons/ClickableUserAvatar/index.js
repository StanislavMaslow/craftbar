import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image } from 'react-native';
import ApiUtils from '../../api/api-utils';

const url = `${ApiUtils.getImageUrl()}`;

const styles = {
  avatar: { height: 40, width: 40, borderRadius: 5 },
};

const ClickableUserAvatar = ({ navigation, id, avatarLink }) => (
  <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', { itemId: id })}>
    <View>
      <Image style={styles.avatar} source={{ uri: `${url + avatarLink}` }} />
    </View>
  </TouchableOpacity>
);

ClickableUserAvatar.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.string,
  avatarLink: PropTypes.string,
};
ClickableUserAvatar.defaultProps = {
  navigation: {},
  id: '',
  avatarLink: '',
};
export default ClickableUserAvatar;
