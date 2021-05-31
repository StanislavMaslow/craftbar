import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WebBrowser } from 'expo';

import {
  View,
  StatusBar,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Input,
  Form,
  Item,
  Label,
  Icon,
  Picker,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import CheckBox from '../../commons/Checkbox';

import { addCardReq } from '../../redux-controller/payment';
import styles from './styles';

import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

class AddCreditCardScreen extends Component {
  static propTypes = {
    addCardRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    addCardRequest: () => {},
    loading: false,
    navigation: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      cardExpMonth: '',
      cardExpYear: '',
      cardCvc: '',
      cardCurrency: 'USD',
      cardNumberFocus: false,
      cardExpMonthFocus: false,
      cardExpYearFocus: false,
      cardCvcFocus: false,
      cardCurrencyFocus: false,
      isChecked: false,
    };
  }

  addCard = () => {
    const { isChecked } = this.state;

    const { addCardRequest } = this.props;
    const { cardNumber, cardExpMonth, cardExpYear, cardCvc, cardCurrency } = this.state;
    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCvc || !cardCurrency) {
      Alert.alert('Form fields cannot be blank');
      return;
    }

    if (cardNumber.length < 15) {
      Alert.alert('Card number must be at least 15 characters.');
      return;
    }

    if (cardCvc.length < 3) {
      Alert.alert('Cvc must be at least 3 characters.');
      return;
    }

    if (!isChecked) {
      Alert.alert('You must read and accept all of the terms and conditions!');
      return;
    }

    const data = {
      card_number: cardNumber,
      card_exp_month: cardExpMonth,
      card_exp_year: cardExpYear,
      card_cvc: cardCvc,
      card_currency: cardCurrency,
    };

    addCardRequest(data);
  };

  onFocus = input => {
    this.setState({
      [input]: true,
    });
  };

  onBlur = input => {
    this.setState({
      [input]: false,
    });
  };

  handleChecked = isChecked => {
    this.setState({ isChecked });
  };

  handleSetCurrency = value => {
    this.setState({
      cardCurrency: value,
    });
  };

  handleOpenBrowser = async () => {
    await WebBrowser.openBrowserAsync('https://stripe.com/legal');
  };

  addCardButton() {
    const { loading } = this.state;
    /* eslint-disable */

    return (
      <Button
        title="Add Card"
        style={styles.button}
        onPress={() => this.addCard(this)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          Confirm
        </Text>
      </Button>
    );
    /* eslint-enable */
  }

  loadingAnimation() {
    const { loading } = this.state;
    /* eslint-disable */
    return (
      <Button title="Add Card" style={styles.button} disabled={loading}>
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
    /* eslint-enable */
  }

  render() {
    const { navigation, loading } = this.props;
    const {
      cardNumberFocus,
      cardExpMonthFocus,
      cardExpYearFocus,
      cardCvcFocus,
      cardCurrencyFocus,
      cardCurrency,
    } = this.state;

    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Connect Card" navigation={navigation} />
        <Content>
          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={120}
            extraScrollHeight={120}
            enableAutoAutomaticScroll={Platform.OS === 'ios'}
          >
            <ScrollView>
              <View style={styles.column}>
                <Form style={styles.inputSection}>
                  <View style={styles.inputContainer}>
                    <Item floatingLabel>
                      <Label style={styles.label}>Card Number</Label>
                      <Input
                        style={styles.input}
                        floatingLabel
                        underline
                        keyboardType="numeric"
                        maxLength={16}
                        placeholderTextColor="#999999"
                        selectionColor="#000"
                        onChangeText={cardNumber => this.setState({ cardNumber })}
                        editable={!loading}
                        // onFocus={() => {
                        //   this.onFocus('cardNumberFocus');
                        // }}
                        // onBlur={() => {
                        //   this.onBlur('cardNumberFocus');
                        // }}
                      />
                      {/* <Icon style={styles.inputIconHint} type="SimpleLineIcons" name="question" /> */}
                    </Item>
                    <View style={cardNumberFocus && styles.inputBorderBottom} />
                  </View>
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel>
                        <Label style={styles.label}>Expiry Month</Label>
                        <Input
                          style={styles.input}
                          floatingLabel
                          underline
                          placeholderTextColor="#999999"
                          selectionColor="#000"
                          keyboardType="numeric"
                          maxLength={2}
                          onChangeText={cardExpMonth => this.setState({ cardExpMonth })}
                          editable={!loading}
                          // onFocus={() => {
                          //   this.onFocus('cardExpMonthFocus');
                          // }}
                          // onBlur={() => {
                          //   this.onBlur('cardExpMonthFocus');
                          // }}
                        />
                      </Item>
                      <View style={cardExpMonthFocus && styles.inputBorderBottom} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel>
                        <Label style={styles.label}>Expiry Year</Label>
                        <Input
                          style={styles.input}
                          floatingLabel
                          underline
                          placeholderTextColor="#999999"
                          keyboardType="numeric"
                          maxLength={2}
                          selectionColor="#000"
                          onChangeText={cardExpYear => this.setState({ cardExpYear })}
                          editable={!loading}
                          // onFocus={() => {
                          //   this.onFocus('cardExpYearFocus');
                          // }}
                          // onBlur={() => {
                          //   this.onBlur('cardExpYearFocus');
                          // }}
                        />
                      </Item>
                      <View style={cardExpYearFocus && styles.inputBorderBottom} />
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel>
                        <Label style={styles.label}>Card CVC</Label>
                        <Input
                          style={styles.input}
                          floatingLabel
                          underline
                          placeholderTextColor="#999999"
                          keyboardType="numeric"
                          maxLength={4}
                          selectionColor="#000"
                          onChangeText={cardCvc => this.setState({ cardCvc })}
                          editable={!loading}
                          // onFocus={() => {
                          //   this.onFocus('cardCvcFocus');
                          // }}
                          // onBlur={() => {
                          //   this.onBlur('cardCvcFocus');
                          // }}
                        />
                        {/* <Icon
                          style={[
                            styles.inputIconHint,
                            {
                              right: -8,
                            },
                          ]}
                          type="SimpleLineIcons"
                          name="question"
                        /> */}
                      </Item>
                      <View style={cardCvcFocus && styles.inputBorderBottom} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Label style={styles.labelSelect}>Card Currency</Label>
                      <Item style={styles.selectItem} picker>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="ios-arrow-down" />}
                          style={styles.picker}
                          placeholder="USD"
                          placeholderStyle={{ color: '#ccc' }}
                          textStyle={{ fontSize: 18 }}
                          selectedValue={cardCurrency}
                          onValueChange={this.handleSetCurrency}
                        >
                          <Picker.Item label="USD" value="USD" />
                          <Picker.Item label="EURO" value="EUR" />
                        </Picker>
                      </Item>
                      <View style={cardCurrencyFocus && styles.inputBorderBottom} />
                    </View>
                  </View>
                  <View style={styles.containerCheckbox}>
                    <View style={styles.checkBox}>
                      <CheckBox handleChecked={this.handleChecked} />
                    </View>
                    <TouchableOpacity onPress={this.handleOpenBrowser} style={styles.linkContainer}>
                      <Text>Accept </Text>
                      <Text style={styles.termsLink}>terms and conditions</Text>
                    </TouchableOpacity>
                  </View>
                </Form>
                <View style={styles.section}>
                  <View>{loading ? this.loadingAnimation() : this.addCardButton()}</View>
                </View>
                <View style={{ flex: 0.5 }} />
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </Content>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.payment && state.payment.loading,
});

const mapDispatchToProps = dispatch => ({
  addCardRequest: bindActionCreators(addCardReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCreditCardScreen);
