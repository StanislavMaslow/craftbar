import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content, List, ListItem, Text, Left, Right, Icon, View } from 'native-base';
import Constants from 'expo-constants';
import { logOutReq, getMyUserDataReq } from '../../redux-controller/user';
import styles from './styles';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import Loader from '../../commons/Loader';

class SettingsScreen extends Component {
  static propTypes = {
    logOutRequest: PropTypes.func,
    getUserDataRequest: PropTypes.func,
    loading: PropTypes.bool,
    navigation: PropTypes.objectOf(PropTypes.any),
    myUser: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    logOutRequest: () => {},
    getUserDataRequest: () => {},
    loading: false,
    myUser: {},
    navigation: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // points: '23',
    };
  }

  componentDidMount() {
    const { getUserDataRequest } = this.props;
    getUserDataRequest();
  }

  logOut = () => {
    const { logOutRequest } = this.props;
    logOutRequest();
  };

  render() {
    const { navigation, myUser, loading } = this.props;
    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Settings" navigation={navigation} />
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Content>
              <List>
                <ListItem onPress={() => navigation.navigate('AccountScreen')}>
                  <Left>
                    <Text style={styles.textRow}>Account</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                {myUser.data && myUser.data.role === 'Barkeep' && (
                  <ListItem onPress={() => navigation.navigate('AvailabilityListScreen')}>
                    <Left>
                      <Text style={styles.textRow}>Set your Availability</Text>
                    </Left>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                )}
                <ListItem
                  onPress={() => navigation.navigate('PaymentsScreen', { role: myUser.data.role })}
                >
                  <Left>
                    <Text style={styles.textRow}>Payments</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                {/* <ListItem onPress={() => navigation.navigate('NatificationsSettingsScreen')}>
              <Left>
                <Text style={styles.textRow}>Notifications</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}
                <ListItem onPress={() => navigation.navigate('AboutScreen')}>
                  <Left>
                    <Text style={styles.textRow}>About and Help</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <TouchableOpacity onPress={this.logOut}>
                      <Text style={[styles.textRow, styles.logOutRow]}>Log Out</Text>
                    </TouchableOpacity>
                  </Left>
                  <Right />
                </ListItem>
              </List>
              <View style={styles.versionNameContainer}>
                <Text style={styles.versionName}>Version: {Constants.manifest.version} </Text>
              </View>
            </Content>
            <ScreenFooter navigation={navigation} />
          </React.Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  myUser: state.user && state.user.myUserData,
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  logOutRequest: bindActionCreators(logOutReq, dispatch),
  getUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
