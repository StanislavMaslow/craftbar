import React, { Component } from 'react';
import { StatusBar, View, Text, Platform, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content, List, Item, Label, Tab, Tabs, Input, Icon } from 'native-base';
import RadioGroup from 'react-native-radio-buttons-group';
import IconFt from 'react-native-vector-icons/Feather';

import Loader from '../../commons/Loader';
import { getSearchDataReq, clearSearchData } from '../../redux-controller/search';
import { getUnReadNotificationReq } from '../../redux-controller/notifications';
import styles from './styles';
import SettingButton from '../../commons/SettingButton';
import ScreenFooter from '../../commons/ScreenFooter';
import { greyText } from '../../utils/variables';
import Listitem from './ListItem';
import { followReq, unFollowReq, inviteToFollowReq } from '../../redux-controller/follow';
import { getMyUserDataReq } from '../../redux-controller/user';

class SearchScreen extends Component {
  static propTypes = {
    getUsersByRole: PropTypes.func,
    searchData: PropTypes.arrayOf(PropTypes.any),
    unRead: PropTypes.arrayOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    myUserData: PropTypes.objectOf(PropTypes.any),
    meta: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
    followRequest: PropTypes.func,
    unFollowRequest: PropTypes.func,
    inviteToFollowRequest: PropTypes.func,
    getMyUserDataRequest: PropTypes.func,
    clearSearchDataRequest: PropTypes.func,
    getUnReadNotificationRequest: PropTypes.func,
  };

  static defaultProps = {
    getUsersByRole: () => {},
    followRequest: () => {},
    getMyUserDataRequest: () => {},
    unFollowRequest: () => {},
    inviteToFollowRequest: () => {},
    clearSearchDataRequest: () => {},
    getUnReadNotificationRequest: () => {},
    navigation: {},
    meta: {},
    searchData: [],
    unRead: [],
    myUserData: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      // / selectedFilter: '',
      showFilterSelect: false,
      filter: {
        role: 'barkeep',
        filter: '',
        search: '',
        page: 1,
      },

      filters: [
        {
          label: 'Best Rating',
          color: greyText,
        },
        {
          label: 'Newest',
          color: greyText,
        },
      ],
      filtersPatron: [
        {
          label: 'Newest',
          color: greyText,
        },
        {
          label: 'Popular',
          color: greyText,
        },
      ],
    };
  }

  componentDidMount() {
    const { getUsersByRole, getMyUserDataRequest, getUnReadNotificationRequest } = this.props;
    const { filter } = this.state;
    getUsersByRole(filter);
    getMyUserDataRequest();
    getUnReadNotificationRequest();
  }
  // onPress = data => this.setState({ data });

  componentWillUnmount() {
    const { clearSearchDataRequest } = this.props;

    this.setState({
      filter: {
        userType: 'barkeep',
        filter: '',
        search: '',
        page: 1,
      },
    });
    clearSearchDataRequest();
  }

  onFilterValueChange = value => {
    const { filter } = this.state;
    const { getUsersByRole, clearSearchDataRequest } = this.props;

    const { role } = filter;

    const selectedFilter = value.find(e => e.selected === true);
    const { label } = selectedFilter;

    clearSearchDataRequest();

    this.setState({
      showFilterSelect: false,
    });

    if (label === 'Best Rating') {
      getUsersByRole({ role, filter: 'rating', search: '', page: 1 });

      this.setState({
        filter: {
          role,
          filter: 'rating',
          search: '',
          page: 1,
        },
      });
      return;
    }

    if (label === 'Newest') {
      clearSearchDataRequest();
      getUsersByRole({ role, filter: 'newest', search: '', page: 1 });

      this.setState({
        filter: {
          role,
          filter: 'newest',
          search: '',
          page: 1,
        },
      });
      return;
    }

    if (label === 'Popular') {
      clearSearchDataRequest();
      getUsersByRole({ role, filter: 'popularity', search: '', page: 1 });

      this.setState({
        filter: {
          role,
          filter: 'popularity',
          search: '',
          page: 1,
        },
      });
    }
  };

  handleFollow = (id, notId, filter) => {
    const { followRequest } = this.props;
    followRequest(id, notId, filter);
  };

  handleUnFollow = (id, loggedUserId, filter) => {
    const { unFollowRequest } = this.props;
    unFollowRequest(id, loggedUserId, filter);
  };

  showFilterSelect = () => {
    const { showFilterSelect } = this.state;
    this.setState({
      showFilterSelect: !showFilterSelect,
    });
  };

  loadMore = () => {
    const { filter } = this.state;
    const { getUsersByRole } = this.props;

    getUsersByRole({ ...filter, page: filter.page + 1 });
    this.setState({
      filter: {
        ...filter,
        page: filter.page + 1,
      },
    });
  };

  changeTab = value => {
    const { getUsersByRole, clearSearchDataRequest } = this.props;
    const { filter } = this.state;
    if (value === 1) {
      clearSearchDataRequest();
      getUsersByRole({ ...filter, role: 'bar', filter: '', search: '', page: 1 });
      this.setState({
        filter: {
          ...filter,
          search: '',
          filter: '',
          role: 'bar',
          page: 1,
        },
      });
    } else if (value === 2) {
      clearSearchDataRequest();
      getUsersByRole({ ...filter, role: 'patron', filter: '', search: '', page: 1 });
      this.setState({
        filter: {
          ...filter,
          role: 'patron',
          filter: '',
          search: '',
          page: 1,
        },
      });
    } else {
      clearSearchDataRequest();
      getUsersByRole({ ...filter, role: 'barkeep', filter: '', search: '', page: 1 });
      this.setState({
        filter: {
          ...filter,
          role: 'barkeep',
          filter: '',
          search: '',
          page: 1,
        },
      });
    }
  };

  handeleChangeText = text => {
    const { filter } = this.state;
    const { getUsersByRole, clearSearchDataRequest } = this.props;

    setTimeout(() => {
      clearSearchDataRequest();
      getUsersByRole({ ...filter, search: text, page: undefined });
    }, 500);

    this.setState({
      filter: {
        ...filter,
        page: 1,
        search: text,
      },
    });
  };

  refresh = () => {
    const { getUsersByRole, clearSearchDataRequest } = this.props;
    const { filter } = this.state;

    clearSearchDataRequest();
    getUsersByRole(filter);
  };

  renderLoadMore = () => {
    const { meta, searchData } = this.props;

    const { last_page: lastPage, per_page: perPage } = meta;
    const { filter } = this.state;

    if (lastPage === filter.page || searchData.length <= perPage - 1) {
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
    const {
      inviteToFollowRequest,
      navigation,
      searchData,
      loading,
      myUserData,
      clearSearchDataRequest,
      unRead,
    } = this.props;

    const { filters, filter, filtersPatron, showFilterSelect } = this.state;

    const { role, id } = myUserData;

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}

        <SettingButton navigation={navigation} />
        <Tabs
          style={styles.tabs}
          onChangeTab={({ i }) => this.changeTab(i)}
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
            heading="Barkeeps"
          >
            <Content>
              <View style={[styles.searchContainer]}>
                <View style={[styles.inputContainer]}>
                  <Item style={styles.item} floatingLabel>
                    <Label style={styles.label}>Search for Barkeeps</Label>
                    <Input
                      style={styles.input}
                      underline
                      placeholderTextColor="#999999"
                      underlineColorAndroid="#E5E5E5"
                      selectionColor="#000"
                      required="true"
                      value={filter.search}
                      onChangeText={text => this.handeleChangeText(text)}
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

                <TouchableOpacity style={styles.filterContainer} onPress={this.showFilterSelect}>
                  <View>
                    <Text style={styles.filterText}>Filter</Text>
                  </View>
                  <View>
                    <IconFt size={17} name="filter" style={styles.filterIcon} />
                  </View>
                </TouchableOpacity>
              </View>
              {showFilterSelect && (
                <View style={styles.selectFilterContainer}>
                  <RadioGroup radioButtons={filters} onPress={this.onFilterValueChange} />
                </View>
              )}

              <List>
                {loading ? (
                  <Loader />
                ) : (
                  searchData.map(el => (
                    <Listitem
                      key={el.id}
                      myId={id}
                      user={el}
                      handleFollow={this.handleFollow}
                      unFollowRequest={this.handleUnFollow}
                      navigation={navigation}
                      role={role}
                      inviteToFollowRequest={inviteToFollowRequest}
                      filter={filter}
                      clearSearchDataRequest={clearSearchDataRequest}
                    />
                  ))
                )}
              </List>
              {!loading && this.renderLoadMore()}
            </Content>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTextStyle}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            heading="Bars"
          >
            <Content>
              <View style={[styles.searchContainer]}>
                <View style={[styles.inputContainer]}>
                  <Item style={styles.item} floatingLabel>
                    <Label style={styles.label}>Search for Bar</Label>
                    <Input
                      style={styles.input}
                      underline
                      placeholderTextColor="#999999"
                      underlineColorAndroid="#E5E5E5"
                      selectionColor="#000"
                      required="true"
                      value={filter.search}
                      onChangeText={text => this.handeleChangeText(text)}
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

                <TouchableOpacity style={styles.filterContainer} onPress={this.showFilterSelect}>
                  <View>
                    <Text style={styles.filterText}>Filter</Text>
                  </View>
                  <View>
                    <IconFt size={17} name="filter" style={styles.filterIcon} />
                  </View>
                </TouchableOpacity>
              </View>

              {showFilterSelect && (
                <View style={styles.selectFilterContainer}>
                  <RadioGroup radioButtons={filters} onPress={this.onFilterValueChange} />
                </View>
              )}
              <List>
                {loading ? (
                  <Loader />
                ) : (
                  searchData.map(el => (
                    <Listitem
                      key={el.id}
                      handleFollow={this.handleFollow}
                      unFollowRequest={this.handleUnFollow}
                      inviteToFollowRequest={inviteToFollowRequest}
                      user={el}
                      myId={id}
                      navigation={navigation}
                      role={role}
                      filter={filter}
                      clearSearchDataRequest={clearSearchDataRequest}
                    />
                  ))
                )}
              </List>
              {!loading && this.renderLoadMore()}
            </Content>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTextStyle}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            heading="Patrons"
          >
            <Content>
              <View style={[styles.searchContainer]}>
                <View style={[styles.inputContainer]}>
                  <Item floatingLabel style={styles.item}>
                    <Label style={styles.label}>Search for Patrons</Label>
                    <Input
                      style={styles.input}
                      underline
                      placeholderTextColor="#999999"
                      underlineColorAndroid="#E5E5E5"
                      selectionColor="#000"
                      required="true"
                      value={filter.search}
                      onChangeText={text => this.handeleChangeText(text)}
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

                <TouchableOpacity style={styles.filterContainer} onPress={this.showFilterSelect}>
                  <View>
                    <Text style={styles.filterText}>Filter</Text>
                  </View>
                  <View>
                    <IconFt size={17} name="filter" style={styles.filterIcon} />
                  </View>
                </TouchableOpacity>
              </View>
              {showFilterSelect && (
                <View style={styles.selectFilterContainer}>
                  <RadioGroup radioButtons={filtersPatron} onPress={this.onFilterValueChange} />
                </View>
              )}
              <List>
                {loading ? (
                  <Loader />
                ) : (
                  searchData.map(el => (
                    <Listitem
                      key={el.id}
                      user={el}
                      myId={id}
                      handleFollow={this.handleFollow}
                      unFollowRequest={this.handleUnFollow}
                      role={role}
                      navigation={navigation}
                      inviteToFollowRequest={inviteToFollowRequest}
                      filter={filter}
                      clearSearchDataRequest={clearSearchDataRequest}
                    />
                  ))
                )}
              </List>
              <TouchableOpacity onPress={this.loadMore}>
                {!loading && this.renderLoadMore()}
              </TouchableOpacity>
            </Content>
          </Tab>
        </Tabs>

        <ScreenFooter navigation={navigation} addPostScreen={null} addPost={null} unRead={unRead} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  searchData: state.search.search,
  meta: state.search.meta,
  loading: state.search.loading,
  myUserData: state.user && state.user.myUserData && state.user.myUserData.data,
  unRead: (state.notifications && state.notifications.unRead.data) || [],
});

const mapDispatchToProps = dispatch => ({
  getUsersByRole: bindActionCreators(getSearchDataReq, dispatch),
  followRequest: bindActionCreators(followReq, dispatch),
  unFollowRequest: bindActionCreators(unFollowReq, dispatch),
  getMyUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
  inviteToFollowRequest: bindActionCreators(inviteToFollowReq, dispatch),
  clearSearchDataRequest: bindActionCreators(clearSearchData, dispatch),
  getUnReadNotificationRequest: bindActionCreators(getUnReadNotificationReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
