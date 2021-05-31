import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUserDataReq, getMyUserDataReq, reportUserReq } from '../../redux-controller/user';
import {
  getUserPostsReq,
  clearUserPostsState,
  sharePostReq,
  postToggleLikeReq,
} from '../../redux-controller/post';

import { followReq, unFollowReq, inviteToFollowReq } from '../../redux-controller/follow';

import UserProfile from '../../commons/UserProfile';

class UserProfileScreen extends Component {
  static propTypes = {
    getUserDataRequest: PropTypes.func,
    getMyUserDataRequest: PropTypes.func,
    inviteToFollowRequest: PropTypes.func,
    followRequest: PropTypes.func,
    clearUserPostsStateRequest: PropTypes.func,
    unFollowRequest: PropTypes.func,
    getUserPosts: PropTypes.func,
    getAvailabilityRequest: PropTypes.func,
    userData: PropTypes.objectOf(PropTypes.any),
    myUserData: PropTypes.objectOf(PropTypes.any),
    meta: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    posts: PropTypes.arrayOf(PropTypes.any),
    isUserLoading: PropTypes.bool,
    isPostLoading: PropTypes.bool,
    sharePostRequest: PropTypes.func,
    postToggleLikeRequest: PropTypes.func,
    reportUserRequest: PropTypes.func,
  };

  static defaultProps = {
    getUserDataRequest: () => {},
    getMyUserDataRequest: () => {},
    getUserPosts: () => {},
    followRequest: () => {},
    clearUserPostsStateRequest: () => {},
    unFollowRequest: () => {},
    getAvailabilityRequest: () => {},
    inviteToFollowRequest: () => {},
    userData: {},
    myUserData: {},
    posts: [],
    navigation: {},
    meta: {},
    isUserLoading: false,
    isPostLoading: false,
    sharePostRequest: () => {},
    postToggleLikeRequest: () => {},
    reportUserRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // points: '23',
    };
  }

  componentDidMount() {
    const {
      getUserDataRequest,
      navigation,
      getUserPosts,
      getMyUserDataRequest,
      getAvailabilityRequest,
      clearUserPostsStateRequest,
    } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    getUserDataRequest(itemId);
    getMyUserDataRequest('user detail');
    clearUserPostsStateRequest();
    getAvailabilityRequest();

    getUserPosts(itemId);
  }

  componentWillUnmount() {
    const { getMyUserDataRequest } = this.props;
    getMyUserDataRequest();
  }

  handleFollow = () => {
    const { followRequest, userData } = this.props;
    followRequest(userData.id);
  };

  handleUnFollow = () => {
    const { unFollowRequest, userData } = this.props;
    unFollowRequest(userData.id);
  };

  handleInvite = () => {
    const { inviteToFollowRequest, userData } = this.props;
    inviteToFollowRequest(userData.id);
  };

  render() {
    const {
      userData,
      navigation,
      posts,
      isUserLoading,
      myUserData,
      isPostLoading,
      getUserPosts,
      clearUserPostsStateRequest,
      meta,
      sharePostRequest,
      postToggleLikeRequest,
      reportUserRequest,
    } = this.props;
    return (
      <UserProfile
        userData={userData}
        posts={posts}
        isUserLoading={isUserLoading}
        isPostLoading={isPostLoading}
        navigation={navigation}
        handleFollow={this.handleFollow}
        handleUnFollow={this.handleUnFollow}
        myUserData={myUserData}
        handleInvite={this.handleInvite}
        getUserPosts={getUserPosts}
        clearUserPostsStateRequest={clearUserPostsStateRequest}
        meta={meta}
        sharePostRequest={sharePostRequest}
        postToggleLikeRequest={postToggleLikeRequest}
        reportUserRequest={reportUserRequest}
      />
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user && state.user.userData.data,
  myUserData: state.user && state.user.myUserData.data,
  isUserLoading: state.user && state.user.loading,
  posts: state.posts.posts || [],
  meta: state.posts.meta || {},
  isPostLoading: state.posts.isPostLoading || false,
});

const mapDispatchToProps = dispatch => ({
  getUserDataRequest: bindActionCreators(getUserDataReq, dispatch),
  followRequest: bindActionCreators(followReq, dispatch),
  unFollowRequest: bindActionCreators(unFollowReq, dispatch),
  getUserPosts: bindActionCreators(getUserPostsReq, dispatch),
  getMyUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
  inviteToFollowRequest: bindActionCreators(inviteToFollowReq, dispatch),
  clearUserPostsStateRequest: bindActionCreators(clearUserPostsState, dispatch),
  sharePostRequest: bindActionCreators(sharePostReq, dispatch),
  postToggleLikeRequest: bindActionCreators(postToggleLikeReq, dispatch),

  reportUserRequest: bindActionCreators(reportUserReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileScreen);
