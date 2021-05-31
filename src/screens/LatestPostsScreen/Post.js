import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text, ActionSheet } from 'native-base';
import IconFT from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMa from 'react-native-vector-icons/MaterialIcons';

import With from '../../commons/With';
import styles from './styles';
import ClickableUserAvatar from '../../commons/ClickableUserAvatar';
import ApiUtils from '../../api/api-utils';

const BUTTONS = [
  'Nudity',
  'Violence',
  'Harassment',
  'Suicide or Self-Injury',
  'Terrorism',
  'Gross Content',
  'Cancel',
];
// var DESTRUCTIVE_INDEX = 7;
const CANCEL_INDEX = 6;

const url = `${ApiUtils.getImageUrl()}`;

const isContainImageUrl = imageUrl => {
  const sliceImageUrl = imageUrl.slice(13);
  return !!sliceImageUrl;
};

const Post = ({ post, postToggleLikeRequest, navigation, handleSharePost, openReportPopUp }) => {
  const isImagePresent = isContainImageUrl(post.media);
  return (
    <View style={styles.postContainer}>
      {post.posted_by[0] && (
        <View style={styles.postedByAva}>
          <ClickableUserAvatar
            navigation={navigation}
            id={post.posted_by[0].id}
            avatarLink={post.posted_by[0].avatar}
          />
          <View>
            <Text style={styles.postedBy}>
              {post.posted_by[0].firstname} {post.posted_by[0].lastname}
            </Text>

            {post.bar_name && (
              <Text style={[styles.greyCollor, styles.postedAt]}>at {post.bar_name}</Text>
            )}
          </View>
        </View>
      )}
      <View style={styles.postGrid}>
        <View style={styles.postImageContainer}>
          <TouchableOpacity
            style={styles.reportIconContainer}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: 'Report this post because of:',
                },
                buttonIndex => {
                  openReportPopUp(BUTTONS[buttonIndex], post.id);
                }
              )
            }
          >
            <IconMa size={28} active name="report" style={styles.reportIcon} />
          </TouchableOpacity>

          {isImagePresent && (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostScreen', { itemId: post.id })}
            >
              <Image style={styles.postImage} source={{ uri: `${url}${post.media}` }} />
            </TouchableOpacity>
          )}
        </View>
        <View style={isImagePresent ? styles.postHeader : styles.postHeaderNoImage}>
          {!isImagePresent && (
            <TouchableOpacity
              style={styles.postDescriptionContainerTextNoImage}
              onPress={() => navigation.navigate('PostScreen', { itemId: post.id })}
            >
              <Text textAlign="justify" style={styles.postDescriptionTextNoImage}>
                {post.message}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.postData}>
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
            <Text style={[styles.greyCollor, styles.createdAt]}>{post.created_at}</Text>
          </View>
        </View>
        <View style={styles.postDescription}>
          <With navigation={navigation} post={post} marginLeft={10} />
          {isImagePresent && (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostScreen', { itemId: post.id })}
              style={styles.postDescriptionTextContainer}
            >
              <Text textAlign="justify" style={styles.postDescriptionText}>
                {post.message}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  postToggleLikeRequest: PropTypes.func,
  openReportPopUp: PropTypes.func,
  handleSharePost: PropTypes.func,
  navigation: PropTypes.objectOf(PropTypes.any),
};
Post.defaultProps = {
  post: {},
  postToggleLikeRequest: () => {},
  openReportPopUp: () => {},
  handleSharePost: () => {},
  navigation: {},
};

export default Post;
