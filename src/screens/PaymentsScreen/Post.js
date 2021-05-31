import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './postStyle';
import ApiUtils from '../../api/api-utils';

const baseUrl = `${ApiUtils.getImageUrl()}`;

const Post = ({ sender, bar, created_at: createdAt, amount }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View>
        <View style={styles.pesonContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${baseUrl}${sender.avatar}` }}
              borderRadius={15}
              style={styles.image}
            />
          </View>
          <Text style={styles.name}>
            {sender.firstname}
            {sender.lastname}
          </Text>
        </View>
        <View style={styles.secondrRow}>
          {bar !== null && (
            <Text style={styles.namePlace}>
              at {bar.firstname}
              {bar.lastname && bar.lastname}
            </Text>
          )}
          <Icon type="Entypo" name="dot-single" style={styles.icon} />
        </View>
        <View style={styles.secondrRow}>
          <Text style={styles.date}>{createdAt}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.cash}>{amount}</Text>
      </View>
    </View>
  </View>
);

Post.propTypes = {
  sender: PropTypes.objectOf(PropTypes.any),
  bar: PropTypes.objectOf(PropTypes.any),
  created_at: PropTypes.string,
  amount: PropTypes.string,
};

Post.defaultProps = {
  sender: {},
  bar: {},
  created_at: '',
  amount: '',
};

export default Post;
