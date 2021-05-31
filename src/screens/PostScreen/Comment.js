import React from 'react';

import { View, Text } from 'native-base';
import PropTypes from 'prop-types';
import IconFt from 'react-native-vector-icons/Feather';
import ClickableUserAvatar from '../../commons/ClickableUserAvatar';
/* eslint-disable */

import { Col, Row, Grid } from 'react-native-easy-grid';
/* eslint-enable */
import { greyText } from '../../utils/variables';
import styles from './styles';

const Comment = ({ comment, editComment, deleteComment, userID, navigation }) => (
  <View>
    <View style={styles.firstCommentRow}>
      <ClickableUserAvatar
        navigation={navigation}
        id={comment.user.id}
        avatarLink={comment.user.avatar}
      />
      <View style={styles.greyContainer}>
        <View style={styles.nameAndIconContainer}>
          <View style={styles.nameContainer}>
            <Text>{comment.user.firstname} </Text>
            <Text>{comment.user.lastname}</Text>
          </View>
          {comment.user.id === userID && (
            <View style={styles.iconContainer}>
              <IconFt
                style={styles.editIcon}
                size={19}
                color={greyText}
                name="edit-2"
                onPress={() => editComment(comment)}
              />
              <IconFt
                style={styles.deleteIcon}
                size={19}
                color={greyText}
                name="trash"
                onPress={() => deleteComment(comment.id)}
              />
            </View>
          )}
        </View>

        <View style={styles.commentSection}>
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.lastCommentRow}>
      <Text style={styles.createdAt}>{comment.created_at}</Text>
      {/* <Text>Cheers</Text>
        <Text>Reply</Text> */}
    </View>
  </View>
);

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any),
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  userID: PropTypes.number,
  navigation: PropTypes.objectOf(PropTypes.any),
};

Comment.defaultProps = {
  comment: {},
  deleteComment: () => {},
  editComment: () => {},
  userID: 0,
  navigation: {},
};

export default Comment;
