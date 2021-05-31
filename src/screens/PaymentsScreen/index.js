import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { H3, Container, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyUserDataReq } from '../../redux-controller/user';
import {
  getCardsReq,
  getTipsReq,
  getBalanceReq,
  clearArrayTipsReq,
} from '../../redux-controller/payment';

import PaymentsHeader from './PaymentsHeader';
import BalanceSection from './BalanceSection';

import Post from './Post';
import PatronPost from './PatronScreen/PostItemTip';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

import styles from './styles';

class Payments extends Component {
  static propTypes = {
    getTipsRequest: PropTypes.func,
    getCardsRequest: PropTypes.func,
    getBalanceRequest: PropTypes.func,
    clearArrayTipsRequest: PropTypes.func,
    getMyUserDataRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    user: PropTypes.objectOf(PropTypes.any),
    tips: PropTypes.arrayOf(PropTypes.any),
    balance: PropTypes.objectOf(PropTypes.any),
    metaTips: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
    cards: PropTypes.arrayOf(PropTypes.any),
  };

  static defaultProps = {
    getTipsRequest: () => {},
    getCardsRequest: () => {},
    getBalanceRequest: () => {},
    clearArrayTipsRequest: () => {},
    getMyUserDataRequest: () => {},
    cards: [],
    navigation: {},
    user: {},
    tips: [],
    metaTips: {},
    balance: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const {
      getTipsRequest,
      clearArrayTipsRequest,
      getMyUserDataRequest,
      getBalanceRequest,
      getCardsRequest,
      navigation,
    } = this.props;
    const role = navigation.getParam('role', 'NO-ID');

    clearArrayTipsRequest();
    getTipsRequest();
    getCardsRequest();

    this.setState({
      page: 1,
    });

    if (role === 'Barkeep' || role === 'Bar') {
      getBalanceRequest();
    }
    getMyUserDataRequest();
  }

  refresh = () => {
    const {
      getTipsRequest,
      getMyUserDataRequest,
      getBalanceRequest,
      getCardsRequest,
      clearArrayTipsRequest,
    } = this.props;

    this.setState({
      page: 1,
    });

    clearArrayTipsRequest();
    getTipsRequest();
    getCardsRequest();
    getMyUserDataRequest();
    getBalanceRequest();
  };

  loadMore = () => {
    const { getTipsRequest } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getTipsRequest(page + 1);
  };

  renderLoadMore = () => {
    const { metaTips, tips } = this.props;
    const { last_page: lastPage, per_page: perPage } = metaTips;
    const { page } = this.state;

    if (lastPage === page || tips.length <= perPage - 1) {
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
    const { navigation, tips, loading, user, cards, balance } = this.props;
    const { role, lastname, firstname, avatar } = user;

    return (
      <Container style={styles.wrapper}>
        <ScreenHeader title="Payments" navigation={navigation} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} />}
        >
          <View>
            <View>
              <PaymentsHeader
                lastName={lastname}
                firstName={firstname}
                avatar={avatar}
                role={role}
                charges={user ? user.charges : null}
                balance={balance}
              />
              {role === 'Barkeep' && (
                <TouchableOpacity
                  onPress={() => {
                    if (cards.length === 0) {
                      Alert.alert('First add some card info!!!');
                      navigation.navigate('AddCreditCardScreen');
                    } else {
                      navigation.navigate('WithdrawScreen', { balance });
                    }
                  }}
                  style={styles.withdrawContainer}
                >
                  <BalanceSection balance={balance} />
                </TouchableOpacity>
              )}
              {role === 'Barkeep' && (
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('PayoutsScreen')}
                >
                  <Icon type="Feather" name="credit-card" style={styles.iconCard} />
                  <Text style={styles.connectPayment}>Watch your payouts</Text>
                </TouchableOpacity>
              )}
              <H3 style={styles.H3}>Tipping history</H3>
              {role && role === 'Patron' ? (
                <View>
                  {tips &&
                    tips.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          navigation.navigate('TipScreen', { id: item.id });
                        }}
                      >
                        <PatronPost {...item} />
                      </TouchableOpacity>
                    ))}
                  {tips && tips.length === 0 && (
                    <View>
                      <Text style={styles.stubContainer}>
                        You have no posts in your payments history!{' '}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.container}>
                  {tips &&
                    tips.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          navigation.navigate('TipScreen', { id: item.id });
                        }}
                      >
                        <Post {...item} />
                      </TouchableOpacity>
                    ))}
                  {tips && tips.length === 0 && (
                    <View>
                      <Text style={styles.stubContainer}>
                        You have no posts in your payments history!{' '}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View>{tips.length > 0 && !loading && this.renderLoadMore()}</View>
        </ScrollView>

        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  tips: state.payment.tips || [],
  metaTips: state.payment.metaTips || {},
  balance: state.payment.balance.data,
  loading: state.payment.loading,
  user: state.user.myUserData.data || {},
  cards: state.payment && state.payment.cards,
});

export default connect(
  mapStateToProps,
  {
    getTipsRequest: getTipsReq,
    getCardsRequest: getCardsReq,
    getMyUserDataRequest: getMyUserDataReq,
    getBalanceRequest: getBalanceReq,
    clearArrayTipsRequest: clearArrayTipsReq,
  }
)(Payments);
