import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import Post from '../../screens/MyProfileScreen/Post';

import styles from './postsStyles';

const Posts = ({ posts, navigation, handleSharePost, postToggleLikeRequest, userData }) => (
  <View style={styles.posts}>
    <Text style={styles.header}>
      {userData.firstname} {userData.lastname}`s posts
    </Text>
    {posts.map(post => (
      <Post
        key={post.id}
        post={post}
        navigation={navigation}
        postToggleLikeRequest={postToggleLikeRequest}
        handleSharePost={handleSharePost}
      />
    ))}
  </View>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any),
  handleSharePost: PropTypes.func,
  postToggleLikeRequest: PropTypes.func,
};

Posts.defaultProps = {
  posts: [],
  navigation: {},
  userData: {},
  handleSharePost: () => {},
  postToggleLikeRequest: () => {},
};

export default Posts;
