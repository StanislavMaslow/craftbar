import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Container, Button, Text } from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../commons/Loader';

import { getUserDataReq, getMyUserDataReq } from '../../redux-controller/user';
import { confirmTipReq } from '../../redux-controller/payment';

import styles from './styles';
import Header from './Header';
import ScreenFooter from '../../commons/ScreenFooter';
import Form from './Form';

class PaymentsCalculator extends Component {
  state = {
    amount: '',
    currency: 'USD',
    currencySign: '$',
    visibility: 'public',
  };

  componentDidMount() {
    const { navigation, getUserDataRequest, getMyUserDataRequest } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    getMyUserDataRequest();
    getUserDataRequest(id);
  }

  handlePressNumberDashboard = number => {
    this.setState(state => ({
      amount: state.amount + number,
    }));
  };

  handleDeleteText = () => {
    const { amount } = this.state;

    if (amount.length > 0) {
      this.setState(state => ({
        amount: state.amount.slice(0, state.amount.length - 1),
      }));
    }
  };

  handleChangeCurrency = currency => {
    this.setState({
      currency,
    });

    switch (currency) {
      case 'USD':
        this.setState({
          currencySign: '$',
        });
        break;
      case 'EUR':
        this.setState({
          currencySign: '€',
        });
        break;
      default:
        return null;
    }

    return null;
  };

  handleChangeStatus = visibility => {
    this.setState({
      visibility,
    });
  };

  handleConfirmTip = () => {
    const { confirmTipRequest, navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');

    const { amount, currency, visibility } = this.state;

    if (amount.length === 0) {
      Alert.alert('Please enter amount');
    } else {
      Alert.alert(
        'Confirmation',
        `Are you sure you want to tip ${amount}.00 ${currency}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              confirmTipRequest({
                bar_id: 5,
                id,
                amount,
                currency,
                visibility,
                message: 'With thanks!',
              }),
          },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    const { amount, currency, currencySign, visibility } = this.state;
    const {
      navigation,
      isLoading,
      user,
      confirmTipRequest,
      isConfirmTipLoading,
      myUser,
    } = this.props;
    return (
      <Container style={styles.container}>
        <ScrollView>
          {isLoading ? (
            <Loader />
          ) : (
            <View>
              <Header user={user} navigation={navigation} />
              {!myUser.charges && myUser.role === 'Patron' ? (
                <View style={styles.stubContainer}>
                  <Text style={{ textAlign: 'center' }}>
                    {' '}
                    You have no payment method added. Please add a payment method.
                  </Text>
                  <Button
                    title="Add"
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('AddCreditCardScreen');
                    }}
                  >
                    <Text style={styles.loginButtonText} uppercase={false}>
                      Add Card
                    </Text>
                  </Button>
                </View>
              ) : (
                <Form
                  amount={amount}
                  handlePressNumberDashboard={this.handlePressNumberDashboard}
                  handleDeleteText={this.handleDeleteText}
                  handleChangeCurrency={this.handleChangeCurrency}
                  currency={currency}
                  visibility={visibility}
                  handleChangeStatus={this.handleChangeStatus}
                  handleConfirmTip={this.handleConfirmTip}
                  confirmTipRequest={confirmTipRequest}
                  currencySign={currencySign}
                  isConfirmTipLoading={isConfirmTipLoading}
                />
              )}
            </View>
          )}
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

PaymentsCalculator.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  myUser: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  getUserDataRequest: PropTypes.func,
  getMyUserDataRequest: PropTypes.func,
  confirmTipRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  isConfirmTipLoading: PropTypes.bool,
};

PaymentsCalculator.defaultProps = {
  user: {},
  myUser: {},
  navigation: {},
  isLoading: false,
  isConfirmTipLoading: false,
  getUserDataRequest: () => {},
  getMyUserDataRequest: () => {},
  confirmTipRequest: () => {},
};

const mapStateToProps = state => ({
  user: state.user.userData.data || {},
  myUser: state.user.myUserData.data || {},
  isLoading: state.user.loading,
  isConfirmTipLoading: state.payment.isConfirmTipLoading,
});

export default connect(
  mapStateToProps,
  {
    getUserDataRequest: getUserDataReq,
    getMyUserDataRequest: getMyUserDataReq,
    confirmTipRequest: confirmTipReq,
  }
)(PaymentsCalculator);
