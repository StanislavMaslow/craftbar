import React, { Component } from 'react';
import { StatusBar, Platform, TouchableOpacity, View, Text } from 'react-native';
import { Notifications } from 'expo';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Tab, Tabs } from 'native-base';

import SettingButton from '../../commons/SettingButton';
import {
  getNotificationsReq,
  postAcceptFollowReq,
  postIgnoreFollowReq,
  deleteNotificationReq,
  markAsReadNotificationsReq,
  clearStateNotifications,
} from '../../redux-controller/notifications';

import { followReq } from '../../redux-controller/follow';

import Loader from '../../commons/Loader';

import styles from './styles';
import ScreenFooter from '../../commons/ScreenFooter';
// import Coupons from './Coupons';
import Notification from './Notification';

class NotificationsScreen extends Component {
  static propTypes = {
    getNotificationsRequest: PropTypes.func,
    postAcceptFollowRequest: PropTypes.func,
    postIgnoreFollowRequest: PropTypes.func,
    deleteNotificationRequest: PropTypes.func,
    clearStateNotificationsRequest: PropTypes.func,
    followRequest: PropTypes.func,
    markAsReadNotificationsRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    meta: PropTypes.objectOf(PropTypes.any),
    notifications: PropTypes.arrayOf(PropTypes.any),
    myUser: PropTypes.objectOf(PropTypes.any),
    loadingNotifications: PropTypes.bool,
  };

  static defaultProps = {
    getNotificationsRequest: () => {},
    postAcceptFollowRequest: () => {},
    postIgnoreFollowRequest: () => {},
    deleteNotificationRequest: () => {},
    clearStateNotificationsRequest: () => {},
    followRequest: () => {},
    markAsReadNotificationsRequest: () => {},
    navigation: {},
    notifications: [],
    meta: {},
    loadingNotifications: false,
    myUser: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { getNotificationsRequest, markAsReadNotificationsRequest } = this.props;
    const { page } = this.state;
    Notifications.getBadgeNumberAsync().then(badgeNumber => {
      if (badgeNumber !== 0) {
        Notifications.setBadgeNumberAsync(0);
      }
    });
    getNotificationsRequest(page);
    markAsReadNotificationsRequest();
  }

  componentWillUnmount() {
    const { clearStateNotificationsRequest } = this.props;

    this.setState({
      page: 1,
    });

    clearStateNotificationsRequest();
  }

  refresh = () => {
    const { getNotificationsRequest, clearStateNotificationsRequest } = this.props;
    clearStateNotificationsRequest();
    getNotificationsRequest();
  };

  handleAcceptFollow = link => {
    const { postAcceptFollowRequest } = this.props;
    postAcceptFollowRequest(link);
  };

  loadMore = () => {
    const { getNotificationsRequest } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getNotificationsRequest(page + 1);
  };

  renderLoadMore = () => {
    const { meta, notifications } = this.props;

    const { last_page: lastPage, per_page: perPage } = meta;
    const { page } = this.state;

    if (lastPage === page || notifications.length <= perPage - 1) {
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

  handleIgnoreFollow = link => {
    const { postIgnoreFollowRequest } = this.props;
    postIgnoreFollowRequest(link);
  };

  render() {
    const {
      navigation,
      notifications,
      loadingNotifications,
      deleteNotificationRequest,
      followRequest,
      myUser,
    } = this.props;
    const { page } = this.state;
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <View style={styles.content}>
          <SettingButton navigation={navigation} />
          <Tabs
            locked
            style={styles.tabs}
            tabBarUnderlineStyle={{
              backgroundColor: '#000',
              height: 2,
            }}
          >
            <Tab
              activeTextStyle={styles.activeTextStyle}
              tabStyle={styles.tab}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              heading="Notifications"
            >
              <View>
                {loadingNotifications ? (
                  <Loader />
                ) : (
                  <Notification
                    data={notifications}
                    myUser={myUser}
                    loadingNotifications={loadingNotifications}
                    refresh={this.refresh}
                    handleAcceptFollow={this.handleAcceptFollow}
                    handleIgnoreFollow={this.handleIgnoreFollow}
                    deleteNotificationRequest={deleteNotificationRequest}
                    followRequest={followRequest}
                    navigation={navigation}
                    page={page}
                  >
                    {notifications.length > 0 && !loadingNotifications && this.renderLoadMore()}
                  </Notification>
                )}
              </View>
            </Tab>
            {/* <Tab
              activeTextStyle={styles.activeTextStyle}
              tabStyle={styles.tab}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              heading="Coupons"
            >
              <Coupons />
            </Tab> */}
          </Tabs>
        </View>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications || [],
  meta: state.notifications.meta || {},
  loadingNotifications: state.notifications.loading,
  myUser: (state.user.myUserData && state.user.myUserData.data) || {},
});
const mapDispatchToProps = dispatch => ({
  getNotificationsRequest: bindActionCreators(getNotificationsReq, dispatch),
  postAcceptFollowRequest: bindActionCreators(postAcceptFollowReq, dispatch),
  postIgnoreFollowRequest: bindActionCreators(postIgnoreFollowReq, dispatch),
  deleteNotificationRequest: bindActionCreators(deleteNotificationReq, dispatch),
  markAsReadNotificationsRequest: bindActionCreators(markAsReadNotificationsReq, dispatch),
  followRequest: bindActionCreators(followReq, dispatch),
  clearStateNotificationsRequest: bindActionCreators(clearStateNotifications, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
