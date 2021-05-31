import React from 'react';

import { View, Text, Image } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './PostItemTipStyles';
import ApiUtils from '../../../api/api-utils';

const baseUrl = `${ApiUtils.getImageUrl()}`;

const PostTip = ({ created_at: createdAt, amount, receiver, accepted }) => (
  <View style={styles.container}>
    <Icon style={styles.iconStrike} type="MaterialCommunityIcons" name="arrow-right" />
    <Image style={styles.image} source={{ uri: `${baseUrl}${receiver.avatar}` }} />
    <View style={styles.firstRow}>
      <View style={styles.firstRowLeftPart}>
        <Text style={styles.price}>{amount}</Text>
        <Text style={styles.tipsText}>Tips</Text>
      </View>
      <View style={styles.firstRowRightPart}>
        <Text>{receiver.firstname}</Text>
        <Text>{receiver.lastname}</Text>
      </View>
      <View
        style={{
          width: 15,
          height: 15,
          borderRadius: 7,
          marginTop: 5,
          marginRight: 5,
          backgroundColor: accepted === 'pending' ? '#ff9900' : '#33cc33',
        }}
      />
    </View>
    <View style={{ backgroundColor: 'rgb(236, 237, 241)' }}>
      <View style={styles.border} />
    </View>
    <View style={styles.firstRow}>
      <View style={styles.firstRowLeftPart}>
        <Icon style={styles.iconClock} type="Feather" name="clock" />
        <Text style={styles.tipsText}>{createdAt}</Text>
      </View>
    </View>
  </View>
);

PostTip.propTypes = {
  receiver: PropTypes.objectOf(PropTypes.any),
  amount: PropTypes.string,
  created_at: PropTypes.string,
  accepted: PropTypes.string,
};

PostTip.defaultProps = {
  receiver: {},
  created_at: '',
  amount: '',
  accepted: '',
};

export default PostTip;
