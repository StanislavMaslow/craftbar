import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import ApiUtils from '../../api/api-utils';
import styles from './headerStyles';
import Available from '../../commons/UserProfile/Available';

const url = `${ApiUtils.getImageUrl()}`;

const fill = require('../../../assets/icons/fill.png');

const Header = ({
  navigation,
  user: { firstname, lastname, rating, avatar, availability, role },
}) => (
  <View>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backContainer}>
          <Icon style={styles.icon} type="EvilIcons" name="chevron-left" />
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View>
            <Text style={styles.firstName}>{firstname}</Text>
            <Text style={styles.lastName}>{lastname}</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>
              {rating || 0} <Image style={styles.imageRating} source={fill} />
            </Text>
          </View>
        </View>
      </View>
    </View>
    <View style={{ flexDirection: 'row', marginLeft: 35, marginRight: 35 }}>
      <View style={styles.containerImage}>
        {avatar && (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: `${url}${avatar}`,
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.rightPart}>
        <View style={styles.puzleBarContainer}>
          {availability && <Available availability={availability} role={role} isCurrent={false} />}
        </View>
      </View>
    </View>
    <View style={styles.footerHeader}>
      <Text style={styles.textFooter}>Give this barkeep a tip</Text>
    </View>
  </View>
);

Header.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
};

Header.defaultProps = {
  navigation: {},
  user: {},
};

export default Header;
