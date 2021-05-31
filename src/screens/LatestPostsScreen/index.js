import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  StatusBar,
  ScrollView,
  View,
  Text,
  Platform,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Container } from 'native-base';
import { connect } from 'react-redux';
import Post from './Post';
import TipsPost from './TipsPost';
import { getUnReadNotificationReq } from '../../redux-controller/notifications';
import ScreenFooter from '../../commons/ScreenFooter';
import SettingButton from '../../commons/SettingButton';

import {
  getFeedReq,
  postToggleLikeReq,
  clearUserFeedsState,
  sharePostReq,
  reportPostReq,
} from '../../redux-controller/post';
import styles from './styles';
import NothingToShow from '../../commons/NothingToShow';

class LatestPostsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any),
    loadingPosts: PropTypes.bool,
    getPostsRequest: PropTypes.func,
    reportPostRequest: PropTypes.func,
    getUnReadNotificationRequest: PropTypes.func,
    clearUserFeedsStateRequest: PropTypes.func,
    postToggleLikeRequest: PropTypes.func,
    // userData: PropTypes.objectOf(PropTypes.any),
    posts: PropTypes.arrayOf(PropTypes.any),
    meta: PropTypes.objectOf(PropTypes.any),
    unRead: PropTypes.arrayOf(PropTypes.any),
    sharePostRequest: PropTypes.func,
  };

  static defaultProps = {
    navigation: {},
    loadingPosts: false,
    getPostsRequest: () => {},
    reportPostRequest: () => {},
    getUnReadNotificationRequest: () => {},
    clearUserFeedsStateRequest: () => {},
    postToggleLikeRequest: () => {},
    meta: {},
    // userData: {},
    posts: [],
    unRead: [],
    sharePostRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const {
      getPostsRequest,
      getUnReadNotificationRequest,
      clearUserFeedsStateRequest,
    } = this.props;

    clearUserFeedsStateRequest();
    getPostsRequest();
    getUnReadNotificationRequest();
  }

  refresh = () => {
    const { getPostsRequest, clearUserFeedsStateRequest } = this.props;
    clearUserFeedsStateRequest();

    getPostsRequest();
  };

  loadMore = () => {
    const { getPostsRequest } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getPostsRequest(page + 1);
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
        { text: 'OK', onPress: () => sharePostRequest(id) },
      ],
      { cancelable: false }
    );
  };

  openReportPopUp = (option, id) => {
    const { reportPostRequest } = this.props;
    if (option !== 'Cancel') {
      const type = new FormData();
      type.append('type', option);
      const data = {
        id,
        type,
      };
      console.log('Clicked on popup', option);
      reportPostRequest(data);
    }
  };

  render() {
    const { navigation, posts, loadingPosts, postToggleLikeRequest, unRead } = this.props;

    // if (!userData.username) {
    //   return (
    //     <Container
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Spinner color="#0077FF" />
    //     </Container>
    //   );
    // }
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScrollView
          refreshControl={<RefreshControl refreshing={loadingPosts} onRefresh={this.refresh} />}
        >
          <SettingButton navigation={navigation} />
          <View style={styles.pageHeader}>
            <Text style={styles.headerTitle}>Latest Posts</Text>
          </View>
          {posts.length > 0 ? (
            posts.map(post => {
              if (post.type === 'post') {
                return (
                  <Post
                    key={post.shared_by ? post.shared_by.id + post.id : post.id}
                    postToggleLikeRequest={postToggleLikeRequest}
                    navigation={navigation}
                    post={post}
                    handleSharePost={this.handleSharePost}
                    openReportPopUp={this.openReportPopUp}
                  />
                );
              }
              if (post.type === 'tips') {
                return (
                  <TipsPost
                    key={`${post.id}${post.shared_by && post.shared_by.email}`}
                    postToggleLikeRequest={postToggleLikeRequest}
                    navigation={navigation}
                    tipspost={post}
                  />
                );
              }
              return null;
            })
          ) : (
            <NothingToShow />
          )}
          <View>{posts.length > 0 && !loadingPosts && this.renderLoadMore()}</View>
        </ScrollView>
        <ScreenFooter navigation={navigation} addPostScreen={null} addPost={null} unRead={unRead} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.feed || [],
  meta: state.posts.meta || {},
  loadingPosts: state.posts.loading,
  unRead:
    (state.notifications && state.notifications.unRead && state.notifications.unRead.data) || [],
});

const mapDispatchToProps = dispatch => ({
  getPostsRequest: bindActionCreators(getFeedReq, dispatch),
  postToggleLikeRequest: bindActionCreators(postToggleLikeReq, dispatch),
  getUnReadNotificationRequest: bindActionCreators(getUnReadNotificationReq, dispatch),
  clearUserFeedsStateRequest: bindActionCreators(clearUserFeedsState, dispatch),
  sharePostRequest: bindActionCreators(sharePostReq, dispatch),
  reportPostRequest: bindActionCreators(reportPostReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestPostsScreen);
