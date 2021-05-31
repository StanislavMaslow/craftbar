import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StatusBar,
  Platform,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Container } from 'native-base';

import ScreenFooter from '../ScreenFooter';

import Content from './Content';
import Posts from './Posts';

import ProfileHeader from './ProfileHeader';
import styles from './styles';

const imageSrc = require('../../../assets/images/default.png');

class UserProfile extends Component {
  static propTypes = {
    handleFollow: PropTypes.func,
    handleUnFollow: PropTypes.func,
    handleInvite: PropTypes.func,
    getUserPosts: PropTypes.func,
    clearUserPostsStateRequest: PropTypes.func,
    posts: PropTypes.arrayOf(PropTypes.any),
    userData: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    myUserData: PropTypes.objectOf(PropTypes.any),
    meta: PropTypes.objectOf(PropTypes.any),
    isUserLoading: PropTypes.bool,
    isPostLoading: PropTypes.bool,
    sharePostRequest: PropTypes.func,
    postToggleLikeRequest: PropTypes.func,
    reportUserRequest: PropTypes.func,
  };

  static defaultProps = {
    handleFollow: () => {},
    handleUnFollow: () => {},
    handleInvite: () => {},
    getUserPosts: () => {},
    clearUserPostsStateRequest: () => {},
    userData: {},
    navigation: {},
    myUserData: {},
    meta: {},
    posts: [],
    isUserLoading: false,
    isPostLoading: false,
    sharePostRequest: () => {},
    postToggleLikeRequest: () => {},
    reportUserRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentWillUnmount() {
    const { clearUserPostsStateRequest } = this.props;
    clearUserPostsStateRequest();
    this.setState({
      page: 1,
    });
  }

  renderPosts = () => {
    const { posts, navigation, postToggleLikeRequest, userData } = this.props;
    return (
      <Posts
        posts={posts}
        navigation={navigation}
        postToggleLikeRequest={postToggleLikeRequest}
        handleSharePost={this.handleSharePost}
        userData={userData}
      />
    );
  };

  renderMessage = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 17, fontFamily: 'OpenSansRegular' }}>
        This user doesn&#39;t have posts
      </Text>
    </View>
  );

  loadMore = () => {
    const { getUserPosts, userData } = this.props;
    const { id } = userData;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getUserPosts(id, page + 1);
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

  refresh = () => {
    const { getUserPosts, clearUserPostsStateRequest, userData } = this.props;
    const { id } = userData;

    clearUserPostsStateRequest();
    getUserPosts(id, 1);

    this.setState({
      page: 1,
    });
  };

  handleSharePost = id => {
    const { sharePostRequest } = this.props;

    Alert.alert(
      'Would you like to share this post on your page?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => sharePostRequest(id, 'posts') },
      ],
      { cancelable: false }
    );
  };

  openReportPopUp = (option, userId) => {
    const { reportUserRequest } = this.props;
    if (option !== 'Cancel') {
      const type = new FormData();
      type.append('type', option);
      const data = {
        userId,
        type,
      };
      reportUserRequest(data);
    }
  };

  render() {
    const {
      userData,
      navigation,
      handleFollow,
      handleUnFollow,
      handleInvite,
      isUserLoading,
      myUserData,
      isPostLoading,
      posts,
    } = this.props;

    const { indexBar } = this.state;

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}

        <ScrollView
          refreshControl={<RefreshControl refreshing={isPostLoading} onRefresh={this.refresh} />}
        >
          {!isUserLoading && (
            <View>
              <ProfileHeader userData={userData} navigation={navigation} imageSrc={imageSrc} />
              <Content
                userData={userData}
                indexBar={indexBar}
                handleUnFollow={handleUnFollow}
                handleInvite={handleInvite}
                handleFollow={handleFollow}
                myUserData={myUserData}
                openReportPopUp={this.openReportPopUp}
              />
              {!isPostLoading && (
                <View>
                  {posts.length > 0 && !isPostLoading ? this.renderPosts() : this.renderMessage()}
                </View>
              )}
              {posts.length > 0 && !isPostLoading && this.renderLoadMore()}
            </View>
          )}
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

export default UserProfile;
