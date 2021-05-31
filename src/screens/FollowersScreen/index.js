import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  View,
  StatusBar,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Container, Content, Input, Item, Label, Icon } from 'native-base';
import { getUserFollowersReq, removeFollowerReq } from '../../redux-controller/follow';
import Loader from '../../commons/Loader';
import Follower from './Follower';

import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

import styles from './styles';

class FollowersScreen extends Component {
  static propTypes = {
    getUserFollowersRequest: PropTypes.func,
    removeFollowerRequest: PropTypes.func,
    userData: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    followers: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    getUserFollowersRequest: () => {},
    removeFollowerRequest: () => {},
    userData: {},
    navigation: {},
    followers: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { getUserFollowersRequest, userData } = this.props;

    getUserFollowersRequest(userData.data.id, false, 1);
  }

  handleRemove = id => {
    const { removeFollowerRequest, userData } = this.props;
    removeFollowerRequest(id, userData.data.id);
  };

  handleSearchFollowers = search => {
    const { getUserFollowersRequest, userData } = this.props;

    setTimeout(() => {
      getUserFollowersRequest(userData.data.id, search);
    }, 500);
  };

  refresh = () => {
    const { getUserFollowersRequest, userData } = this.props;
    this.setState({
      page: 1,
    });
    getUserFollowersRequest(userData.data.id);
  };

  loadMore = () => {
    const { getUserFollowersRequest, userData } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getUserFollowersRequest(userData.data.id, false, page + 1);
  };

  renderLoadMore = () => {
    const { followers } = this.props;
    const { meta } = followers;
    const { last_page: lastPage, per_page: perPage } = meta;
    const { page } = this.state;
    if (lastPage === page || followers.data.length <= perPage - 1) {
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
    const { navigation, followers, userData, loading } = this.props;

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader title="Followers" navigation={navigation} />
        <Content style={styles.content}>
          <ScrollView
            style={styles.body}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} />}
          >
            {loading ? (
              <Loader />
            ) : (
              <View>
                <View style={[styles.searchContainer]}>
                  <View style={[styles.inputContainer]}>
                    <Item floatingLabel style={styles.item}>
                      <Label style={styles.label}>Search for Followers</Label>
                      <Input
                        style={styles.input}
                        underline
                        placeholderTextColor="#999999"
                        underlineColorAndroid="#E5E5E5"
                        selectionColor="#000"
                        required="true"
                        onChangeText={text => this.handleSearchFollowers(text)}
                      />
                    </Item>
                    <View />
                    <Icon
                      active
                      type="SimpleLineIcons"
                      name="magnifier"
                      style={styles.icon}
                      size={5}
                    />
                  </View>
                </View>

                {followers.data &&
                  followers.data.map(item => (
                    <Follower
                      key={item.id}
                      data={item}
                      role={userData.data && userData.data.role}
                      navigation={navigation}
                      handleRemove={this.handleRemove}
                    />
                  ))}
                <View>
                  {followers.meta &&
                    followers.data &&
                    followers.data.length > 0 &&
                    this.renderLoadMore()}
                </View>
              </View>
            )}
          </ScrollView>
        </Content>
        <ScreenFooter style={styles.footer} navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user && state.user.myUserData,
  followers: state.follow.followers,
  loading: state.follow.followersLoading,
});

const mapDispatchToProps = dispatch => ({
  getUserFollowersRequest: bindActionCreators(getUserFollowersReq, dispatch),
  removeFollowerRequest: bindActionCreators(removeFollowerReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowersScreen);
