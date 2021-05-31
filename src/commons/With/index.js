import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

// import styles from './styles';

const With = ({ post, navigation, marginLeft }) => (
  <View>
    {post.with && post.with.length > 0 && (
      <View
        style={{
          marginLeft,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        <Text style={{ fontFamily: 'OpenSans', fontSize: 14 }}>With: </Text>
        {post.with.map(withPeople => (
          <TouchableOpacity
            onPress={() => {
              if (!withPeople.follow || withPeople.follow === 'pending') {
                Alert.alert('Follow request must be approved to access profile!');
              } else {
                navigation.navigate('UserProfileScreen', { itemId: withPeople.id });
              }
            }}
            key={withPeople.id}
          >
            <Text
              style={{ marginRight: 3, color: '#0188FE', fontFamily: 'OpenSans', fontSize: 14 }}
            >
              @{withPeople.firstname}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

With.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  marginLeft: PropTypes.number,
};
With.defaultProps = {
  post: {},
  navigation: {},
  marginLeft: 37,
};

export default With;
