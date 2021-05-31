import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Icon } from 'native-base';
import IconFT from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import With from '../../commons/With';
import styles from './styles';
import ApiUtils from '../../api/api-utils';

const url = `${ApiUtils.getImageUrl()}`;

const isYourPost = post => {
  if (!post.shared_by) {
    return true;
  }

  return false;
};

const Post = ({
  post,
  postToggleLikeRequest,
  navigation,
  handleDeletePost,
  handleEditPost,
  handleSharePost,
  myUserId,
}) => (
  <View style={post.media ? styles.postContainer : [styles.postContainer, { paddingTop: 28 }]}>
    {navigation.state.routeName === 'MyProfileScreen' && isYourPost(post, myUserId) && (
      <Icon
        name="edit"
        type="MaterialIcons"
        style={styles.editIcon}
        onPress={() => handleEditPost(post)}
      />
    )}
    {navigation.state.routeName === 'MyProfileScreen' && isYourPost(post, myUserId) && (
      <Icon
        name="trash-o"
        type="FontAwesome"
        style={styles.deleteIcon}
        onPress={() => handleDeletePost(post.id)}
      />
    )}

    <View style={styles.postGrid}>
      <View style={post.media ? styles.postImage : {}}>
        {post.media && (
          <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { itemId: post.id })}>
            <Image
              style={{ width: 305, height: 170, borderRadius: 5 }}
              source={{ uri: `${url}${post.media}` }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={post.media ? styles.postHeader : styles.postHeaderNoImage}>
        <View style={post.media ? styles.postData : {}}>
          {!post.media && (
            <View style={styles.postDescriptionNoImage}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => navigation.navigate('PostScreen', { itemId: post.id })}
              >
                <Text style={[styles.postDescriptionText, styles.userDescriptionText]}>
                  {post.message}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.controlsContainer}>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => postToggleLikeRequest(post.id)}>
                <View style={styles.iconsContainer}>
                  <IconFa size={17} active name="glass" style={styles.socialIcon} />
                  <Text style={styles.greyCollor}>{post.likes}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('PostScreen', { itemId: post.id })}
                >
                  <IconFT size={20} active name="message-square" style={styles.socialIcon} />
                  <Text style={styles.greyCollor}>{post.comments}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleSharePost(post.id)}>
                <View style={styles.iconsContainer}>
                  <IconFT size={20} active name="share-2" style={styles.socialIcon} />
                  <Text style={styles.greyCollor}>{post.shares}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.greyCollor}>{post.created_at}</Text>
              {post.bar_name && <Text style={styles.greyCollor}>at {post.bar_name}</Text>}
            </View>
          </View>
        </View>
      </View>
      <With navigation={navigation} post={post} />
      {post.media && (
        <View style={styles.postDescription}>
          <Text style={[styles.postDescriptionText, styles.userDescriptionText]}>
            {post.message}
          </Text>
        </View>
      )}
    </View>
  </View>
);

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  myUserId: PropTypes.number,
  handleDeletePost: PropTypes.func,
  handleEditPost: PropTypes.func,
  postToggleLikeRequest: PropTypes.func,
  handleSharePost: PropTypes.func,
};
Post.defaultProps = {
  post: {},
  navigation: {},
  myUserId: null,
  postToggleLikeRequest: () => {},
  handleDeletePost: () => {},
  handleEditPost: () => {},
  handleSharePost: () => {},
};

export default Post;
