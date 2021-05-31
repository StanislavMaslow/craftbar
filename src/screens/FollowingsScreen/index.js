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
import { getUserFollowingsReq, unFollowReq } from '../../redux-controller/follow';
import Following from './Following';

import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

import styles from './styles';

class FollowingsScreen extends Component {
  static propTypes = {
    getUserFollowingsRequest: PropTypes.func,
    removeFollowingRequest: PropTypes.func,
    userData: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    followings: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    getUserFollowingsRequest: () => {},
    removeFollowingRequest: () => {},
    userData: {},
    navigation: {},
    followings: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { getUserFollowingsRequest, userData } = this.props;
    getUserFollowingsRequest(userData.data.id, false, 1);
  }

  handleRemove = id => {
    const { removeFollowingRequest, userData } = this.props;
    removeFollowingRequest(id, userData.data.id);
  };

  handleSearchFollowers = search => {
    const { getUserFollowingsRequest, userData } = this.props;

    setTimeout(() => {
      getUserFollowingsRequest(userData.data.id, search);
    }, 500);
  };

  refresh = () => {
    const { getUserFollowingsRequest, userData } = this.props;
    this.setState({
      page: 1,
    });
    getUserFollowingsRequest(userData.data.id, false, 1);
  };

  loadMore = () => {
    const { getUserFollowingsRequest, userData } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getUserFollowingsRequest(userData.data.id, false, page + 1);
  };

  renderLoadMore = () => {
    const { followings } = this.props;
    const { meta } = followings;
    const { last_page: lastPage, per_page: perPage } = meta;
    const { page } = this.state;

    if (lastPage === page || followings.data.length <= perPage - 1) {
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
    const { navigation, followings, userData, loading } = this.props;
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader title="Following" navigation={navigation} />
        <Content>
          <ScrollView
            style={styles.body}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} />}
          >
            <View style={[styles.searchContainer]}>
              <View style={[styles.inputContainer]}>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Search for Following</Label>
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
                <Icon active type="SimpleLineIcons" name="magnifier" style={styles.icon} size={5} />
              </View>
            </View>
            {loading ? (
              <View />
            ) : (
              <View>
                {followings.data &&
                  followings.data.map(item => (
                    <Following
                      navigation={navigation}
                      key={item.id}
                      data={item}
                      followingsRole={item.role}
                      role={userData.data.role}
                      handleRemove={this.handleRemove}
                    />
                  ))}
                <View>
                  {followings.meta &&
                    followings.data &&
                    followings.data.length > 0 &&
                    this.renderLoadMore()}
                </View>
              </View>
            )}
          </ScrollView>
        </Content>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user && state.user.myUserData,
  followings: state.follow.followings,
  loading: state.follow.followingLoading,
});

const mapDispatchToProps = dispatch => ({
  getUserFollowingsRequest: bindActionCreators(getUserFollowingsReq, dispatch),
  removeFollowingRequest: bindActionCreators(unFollowReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingsScreen);
