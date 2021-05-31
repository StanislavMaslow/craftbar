import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Platform, RefreshControl, Image, TouchableOpacity, Alert, Text } from 'react-native';
import { Item, Input, View } from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  getCommentsReq,
  addCommentReq,
  editCommentReq,
  deleteCommentReq,
} from '../../redux-controller/comment';
import styles from './styles';
import { greyText } from '../../utils/variables';
import Comment from './Comment';
import ApiUtils from '../../api/api-utils';

const url = `${ApiUtils.getImageUrl()}`;
class Comments extends React.Component {
  static propTypes = {
    addCommentRequest: PropTypes.func,
    getCommentsRequest: PropTypes.func,
    deleteCommentRequest: PropTypes.func,
    editCommentRequest: PropTypes.func,
    id: PropTypes.number,
    userData: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    comments: PropTypes.objectOf(PropTypes.any),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    addCommentRequest: () => {},
    getCommentsRequest: () => {},
    deleteCommentRequest: () => {},
    editCommentRequest: () => {},
    id: 1,
    userData: {},
    comments: {},
    isLoading: true,
    navigation: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      editMode: false,
      editableCommentID: 0,
      page: 1,
    };
  }

  // componentDidMount() {
  //   const { comments } = this.props;
  //   if (comments.meta) {
  //     this.setState({
  //       page: comments.meta.last_page,
  //     });
  //   }
  // }

  sendComment = () => {
    const { comments, addCommentRequest, editCommentRequest, id } = this.props;
    const { comment, editMode, editableCommentID } = this.state;
    const data = {
      id,
      comment,
      page: comments.meta ? comments.meta.last_page : 1,
    };
    if (editMode) {
      editCommentRequest({
        comment,
        id: editableCommentID,
        postId: id,
        page: comments.meta ? comments.meta.current_page : 1,
      });
    } else {
      addCommentRequest(data);
    }
    this.setState({ comment: '', editMode: false, editableCommentID: '' });
  };

  deleteComment = commentID => {
    const { deleteCommentRequest, id, comments } = this.props;
    const data = {
      postId: id,
      commentID,
      page: comments.meta.current_page,
    };

    Alert.alert(
      'Would you like to delete this comment?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteCommentRequest(data);
          },
        },
      ],
      { cancelable: false }
    );
  };

  editComment = comment => {
    this.setState({
      comment: comment.comment,
      editMode: true,
      editableCommentID: comment.id,
    });
  };

  refresh = () => {
    const { id, getCommentsRequest } = this.props;
    getCommentsRequest(id);
  };

  loadMore = () => {
    const { id, getCommentsRequest } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getCommentsRequest(id, page + 1);
  };

  prevPage = () => {
    const { id, getCommentsRequest } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page - 1,
    }));
    getCommentsRequest(id, page - 1);
  };

  renderShowPrev = () => {
    const { page } = this.state;

    if (page === 1) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.prevPage}>
        <View
          style={{
            padding: 15,
            margin: 15,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }}
        >
          <Text style={{ textAlign: 'center' }}>Show previous...</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderLoadMore = () => {
    const { comments } = this.props;
    const { meta } = comments;
    const { last_page: lastPage, per_page: perPage } = meta;
    const { page } = this.state;

    if (lastPage === page || comments.data.length <= perPage - 1) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.loadMore}>
        <View
          style={{
            padding: 15,
            margin: 15,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }}
        >
          <Text style={{ textAlign: 'center' }}>Load more...</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { comments, userData, isLoading, navigation } = this.props;
    const { comment } = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={Platform.OS === 'ios' ? -80 : 20}
        extraScrollHeight={Platform.OS === 'ios' ? -80 : 20}
        enableAutoAutomaticScroll
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={this.refresh} />}
      >
        {this.renderShowPrev()}
        <View style={styles.comentsContainer}>
          {comments.data &&
            comments.data.map(item => (
              <Comment
                comment={item}
                key={item.comment + item.created_at}
                deleteComment={this.deleteComment}
                editComment={this.editComment}
                userID={userData.id}
                navigation={navigation}
                keyboardOpeningTime={250}
              />
            ))}
          <View>
            {comments.meta && comments.data && comments.data.length > 0 && this.renderLoadMore()}
          </View>
        </View>
        <View style={styles.commentInputContainer}>
          <View style={styles.avaContainer}>
            {userData.avatar && (
              <Image
                style={{ height: 40, width: 40 }}
                source={{ uri: `${url + userData.avatar}` }}
              />
            )}
          </View>
          <Item rounded style={styles.inputContainer}>
            <Input
              multiline
              spellCheck
              value={comment}
              placeholder="Write your comment..."
              onChangeText={commentText => this.setState({ comment: commentText })}
              style={styles.input}
            />
            <TouchableOpacity onPress={this.sendComment}>
              <IconFA style={styles.sendIcon} size={26} color={greyText} name="send-o" />
            </TouchableOpacity>
          </Item>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments && state.comments.comments,
  isLoading: state.comments.loading,
  userData: state.user.myUserData && state.user.myUserData.data,
});

const mapDispatchToProps = dispatch => ({
  getCommentsRequest: bindActionCreators(getCommentsReq, dispatch),
  addCommentRequest: bindActionCreators(addCommentReq, dispatch),
  editCommentRequest: bindActionCreators(editCommentReq, dispatch),
  deleteCommentRequest: bindActionCreators(deleteCommentReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
