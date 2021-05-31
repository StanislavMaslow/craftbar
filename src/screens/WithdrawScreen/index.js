import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Platform } from 'react-native';
import {
  Container,
  Button,
  Text,
  Content,
  Input,
  Item,
  Label,
  Form,
  Picker,
  Icon,
  Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { getCardsReq, withdrawFundsReq } from '../../redux-controller/payment';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import styles from './styles';

class WithdrawScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any),
    getCardsRequest: PropTypes.func,
    withdrawFundsRequest: PropTypes.func,
    cards: PropTypes.arrayOf(PropTypes.any),
    loading: PropTypes.bool,
    withdrawLoading: PropTypes.bool,
    getUserDataRequest: PropTypes.func,
  };

  static defaultProps = {
    navigation: {},
    getCardsRequest: () => {},
    withdrawFundsRequest: () => {},
    cards: [],
    loading: false,
    withdrawLoading: false,
    getUserDataRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      currency: 'usd',
      indexCard: 0,
    };
  }

  componentDidMount() {
    const { getCardsRequest, getUserDataRequest } = this.props;
    getUserDataRequest();
    getCardsRequest();
  }

  withDrawFunds = () => {
    const { withdrawFundsRequest, cards } = this.props;
    const { amount, currency, indexCard } = this.state;
    const data = new FormData();
    data.append('amount', amount);
    data.append('currency', currency);
    data.append('card', cards[indexCard].id);

    withdrawFundsRequest(data);
  };

  handleChangeCard = indexCard => {
    this.setState({
      indexCard,
    });
  };

  handleSetCurrency = value => {
    this.setState({
      currency: value,
    });
  };

  render() {
    const { navigation, cards, loading, withdrawLoading } = this.props;
    const balance = navigation.getParam('balance', 'NO-ID');
    const { indexCard, currency } = this.state;
    const currencys = Object.keys(balance);
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader targetcontainer="" title="Withdraw Funds" navigation={navigation} />

        <View style={styles.body}>
          <View style={styles.warningBlock}>
            <Text style={styles.warningBlockText}>
              Before you withdraw,see the perks you&apos;ll miss out on.
            </Text>
          </View>
          <View style={styles.availableMoney}>
            {currencys.map(item => (
              <View key={balance[item].pending + balance[item].available}>
                <Text>
                  Available: {balance && balance[item].available} {item}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.inputAmount}>
            <Form>
              <Item floatingLabel>
                <Label>Amount</Label>
                <Input
                  style={styles.input}
                  floatingLabel
                  underline
                  placeholderTextColor="#999999"
                  selectionColor="#000"
                  onChangeText={amount => this.setState({ amount })}
                  editable={!loading}
                />
              </Item>

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={styles.colorPickerText}
                placeholder="USD"
                placeholderStyle={{ color: '#ccc' }}
                textStyle={{ fontSize: 18 }}
                selectedValue={currency}
                onValueChange={this.handleSetCurrency}
              >
                <Picker.Item label="USD" value="usd" />
                <Picker.Item label="EURO" value="eur" />
              </Picker>

              <Picker
                mode="dropdown"
                iosHeader="Select your bar"
                iosIcon={
                  <Icon
                    type="Feather"
                    name="chevron-right"
                    style={{ color: 'rgba(0, 0, 0, 0.4)' }}
                  />
                }
                textStyle={{
                  color: 'rgba(0, 0, 0, 0.4)',
                }}
                style={styles.colorPickerText}
                selectedValue={indexCard}
                onValueChange={this.handleChangeCard}
              >
                {cards &&
                  cards.map((item, index) => (
                    <Picker.Item key={item.id} label={item.last4} value={index} />
                  ))}
              </Picker>
            </Form>
          </View>
          <Text style={styles.notificationCard}>
            Card Withdrawals may take 5-7 buisness days depending on your card
          </Text>
          <View style={styles.buttons}>
            <Button
              onPress={() => {
                this.withDrawFunds();
              }}
              dark
              disabled={withdrawLoading}
              style={styles.darkButton}
            >
              {!withdrawLoading ? (
                <Text uppercase={false} style={styles.darkButtonTxt}>
                  Continue
                </Text>
              ) : (
                <Spinner color="#ccc" />
              )}
            </Button>
          </View>
        </View>

        <Content />
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.payment && state.payment.cards,
  loading: state.payment.loading,
  withdrawLoading: state.payment.withdrawLoading,
});

export default connect(
  mapStateToProps,
  {
    getCardsRequest: getCardsReq,
    withdrawFundsRequest: withdrawFundsReq,
  }
)(WithdrawScreen);
