import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  StatusBar,
  ScrollView,
  Platform,
  View,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Network from 'expo-network';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';

import NothingToShow from '../../commons/NothingToShow';

import { getMyUserDataReq, logOutReq } from '../../redux-controller/user';
import {
  postToggleLikeReq,
  getUserPostsReq,
  clearUserPostsState,
  sharePostReq,
  deletePostReq,
} from '../../redux-controller/post';
import { getUnReadNotificationReq } from '../../redux-controller/notifications';

import ProfiletHeader from './ProfileHeader';
import Post from './Post';
// import TipsPost from './TipsPost';
import ScreenFooter from '../../commons/ScreenFooter';
import ApiUtils from '../../api/api-utils';

import styles from './styles';

const baseUrl = `${ApiUtils.getImageUrl()}`;

class MyProfileScreen extends Component {
  static propTypes = {
    getUserDataRequest: PropTypes.func,
    getUserPostsRequest: PropTypes.func,
    clearUserPostsStateRequest: PropTypes.func,
    logOutRequest: PropTypes.func,
    postToggleLikeRequest: PropTypes.func,
    deletePostReqRequest: PropTypes.func,
    sharePostRequest: PropTypes.func,
    getUnReadNotificationRequest: PropTypes.func,
    userData: PropTypes.objectOf(PropTypes.any),
    meta: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    posts: PropTypes.arrayOf(PropTypes.any),
    unRead: PropTypes.arrayOf(PropTypes.any),
    isLoading: PropTypes.bool,
    isPostLoading: PropTypes.bool,
  };

  static defaultProps = {
    getUserDataRequest: () => {},
    getUserPostsRequest: () => {},
    clearUserPostsStateRequest: () => {},
    logOutRequest: () => {},
    postToggleLikeRequest: () => {},
    getUnReadNotificationRequest: () => {},
    deletePostReqRequest: () => {},
    sharePostRequest: () => {},
    userData: {},
    meta: {},
    navigation: {},
    posts: [],
    unRead: [],
    isLoading: false,
    isPostLoading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isConnected: true,
    };
  }

  componentDidMount() {
    const { getUserDataRequest, navigation, getUnReadNotificationRequest } = this.props;
    getUserDataRequest();
    const from = navigation.getParam('from', 'NO-ID');
    if (from === 'signUp') {
      Alert.alert('You have been successfully registered!');
    }
    this.controllConnection();
    getUnReadNotificationRequest();
  }

  componentWillUnmount() {
    const { clearUserPostsStateRequest } = this.props;
    clearUserPostsStateRequest();
  }

  controllConnection = async () => {
    const connection = await Network.getNetworkStateAsync();
    this.setState({
      isConnected: connection.isConnected,
    });
  };

  logOut = () => {
    const { logOutRequest } = this.props;
    logOutRequest();
  };

  refresh = () => {
    const { getUserDataRequest } = this.props;
    this.controllConnection();
    getUserDataRequest();
  };

  handleDeletePost = id => {
    const { deletePostReqRequest } = this.props;

    Alert.alert(
      '',
      'Delete this post ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deletePostReqRequest(id) },
      ],
      { cancelable: false }
    );
  };

  handleEditPost = post => {
    const { navigation } = this.props;

    Alert.alert(
      '',
      'Edit this post ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => navigation.navigate('AddPostScreen', { post }) },
      ],
      { cancelable: false }
    );
  };

  handleSharePost = id => {
    const { sharePostRequest } = this.props;

    Alert.alert(
      'Would you like to share this post on your page?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => sharePostRequest(id, 'posts') },
      ],
      { cancelable: false }
    );
  };

  renderPosts = (isPostLoading, posts, navigation, role, id) => {
    const { postToggleLikeRequest } = this.props;
    if (!isPostLoading && !posts.length) {
      return (
        <View>
          <NothingToShow />
        </View>
      );
    }

    return (
      <View style={{ marginTop: role === 'Patron' ? 0 : 40 }}>
        {posts.map(post => (
          <Post
            navigation={navigation}
            key={post.id}
            post={post}
            myUserId={id}
            handleSharePost={this.handleSharePost}
            handleDeletePost={this.handleDeletePost}
            handleEditPost={this.handleEditPost}
            postToggleLikeRequest={postToggleLikeRequest}
          />
        ))}
      </View>
    );
  };

  loadMore = () => {
    const { getUserPostsRequest, userData } = this.props;
    const { page } = this.state;
    const { id } = userData;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getUserPostsRequest(id, page + 1);
  };

  renderLoadMore = () => {
    const { meta, posts } = this.props;
    const { last_page: lastPage, per_page: perPage } = meta;
    const { page } = this.state;

    if (lastPage === page || posts.length <= perPage - 1) {
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
    const { userData, navigation, posts, isLoading, isPostLoading, unRead } = this.props;
    const { isConnected } = this.state;
    const { availability, role, id } = userData;
    if (!isConnected) {
      Alert.alert('No network connection! The app can work wrong.');
      return null;
    }
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}

        <View
          style={[styles.containerForScrollViewSpinner, isLoading && { backgroundColor: 'white' }]}
        />
        <ScrollView
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={this.refresh} />}
        >
          {!isLoading && (
            <View>
              <ProfiletHeader
                userData={userData}
                navigation={navigation}
                availability={availability}
                role={role}
                imageSrc={userData.avatar && `${baseUrl}${userData.avatar}`}
              />
              <View>
                <Text style={styles.headerText}> Your posts</Text>
              </View>
              {this.renderPosts(isPostLoading, posts, navigation, role, id)}
              <View>{posts.length > 0 && !isPostLoading && this.renderLoadMore()}</View>
            </View>
          )}

          {/* <TipsPost /> */}
        </ScrollView>
        <ScreenFooter navigation={navigation} addPostScreen={null} addPost={null} unRead={unRead} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: (state.user.myUserData && state.user.myUserData.data) || {},
  isLoading: state.user && state.user.loading,
  posts: state.posts.posts || [],
  meta: state.posts.meta || {},
  unRead:
    (state.notifications && state.notifications.unRead && state.notifications.unRead.data) || [],
  isPostLoading: state.posts.isPostLoading,
});

const mapDispatchToProps = dispatch => ({
  getUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
  logOutRequest: bindActionCreators(logOutReq, dispatch),
  postToggleLikeRequest: bindActionCreators(postToggleLikeReq, dispatch),
  getUnReadNotificationRequest: bindActionCreators(getUnReadNotificationReq, dispatch),
  getUserPostsRequest: bindActionCreators(getUserPostsReq, dispatch),
  clearUserPostsStateRequest: bindActionCreators(clearUserPostsState, dispatch),
  deletePostReqRequest: bindActionCreators(deletePostReq, dispatch),
  sharePostRequest: bindActionCreators(sharePostReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileScreen);
