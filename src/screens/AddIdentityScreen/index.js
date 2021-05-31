import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StatusBar,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import countryList from 'react-select-country-list';
import { Container, Content, Button, Text, Input, Form, Item, Label, Icon } from 'native-base';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import IconSL from 'react-native-vector-icons/SimpleLineIcons';

import { addIdentityReq } from '../../redux-controller/payment';
import styles from './styles';

import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

const countryDataList = countryList().getData();

class AddIdentityScreen extends Component {
  static propTypes = {
    addCardIdentity: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    addCardIdentity: () => {},
    loading: false,
    navigation: {},
  };

  constructor(props) {
    super(props);
    const countryData = countryList().getData();
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      personalId: '',
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      addrLine1: '',
      addrLine2: '',
      addrCity: '',
      addrPostalCode: '',
      addrState: '',
      country: '',
      countryKod: '',
      cardNumberFocus: false,
      firstNameFocus: false,
      lastNameFocus: false,
      personalIdFocus: false,
      openModal: false,
      countryData,
    };
  }

  addCard = () => {
    const { addCardIdentity } = this.props;
    const {
      email,
      firstName,
      lastName,
      personalId,
      dobDay,
      dobMonth,
      dobYear,
      addrLine1,
      addrLine2,
      addrCity,
      addrPostalCode,
      addrState,
      countryKod,
    } = this.state;
    if (!email || !firstName || !lastName || !personalId || !dobDay) {
      Alert.alert('Form fields cannot be blank');
      return;
    }

    // if (email.length < 16) {
    //   Alert.alert('Card number must be at least 16 characters.');
    //   return;
    // }

    // if (personalId.length < 3) {
    //   Alert.alert('Cvc must be at least 3 characters.');
    //   return;
    // }
    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      personal_id_number: personalId,
      dob_day: dobDay,
      dob_month: dobMonth,
      dob_year: dobYear,
      addr_line1: addrLine1,
      addr_line2: addrLine2,
      addr_city: addrCity,
      addr_postal_code: addrPostalCode,
      addr_state: addrState,
      country: countryKod,
    };

    addCardIdentity(data);
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

  openCountryModal = () => {
    this.setState({
      openModal: true,
    });
  };

  renderCountryInput = country => (
    <View style={styles.inputWrapper}>
      <Text style={[styles.label, { top: country.length === 0 ? 10 : -8 }]}>Country</Text>
      <Text style={[styles.label, { color: '#000' }]}>{country}</Text>
    </View>
  );

  setCountryData = text => {
    setTimeout(() => {
      this.setState({
        countryData: countryDataList.filter(country => country.label.includes(text)),
      });
    }, 0);
  };

  chooseCountry = (countryKod, country) => {
    this.setState({
      country,
      countryKod,
      openModal: false,
    });
  };

  addCardButton() {
    const { loading } = this.state;
    /* eslint-disable */

    return (
      <Button
        title="Add identity"
        style={styles.button}
        onPress={() => this.addCard(this)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          Confirm identity
        </Text>
      </Button>
    );
    /* eslint-enable */
  }

  loadingAnimation() {
    const { loading } = this.state;
    /* eslint-disable */
    return (
      <Button title="Add identity" style={styles.button} disabled={loading}>
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
    /* eslint-enable */
  }

  renderCountryList = data =>
    data.map(obj => (
      <TouchableOpacity key={obj.value} onPress={() => this.chooseCountry(obj.value, obj.label)}>
        <Text style={styles.countryItem}>{obj.label}</Text>
      </TouchableOpacity>
    ));

  render() {
    const { navigation, loading } = this.props;
    const {
      cardNumberFocus,
      firstNameFocus,
      lastNameFocus,
      personalIdFocus,
      countryData,
      openModal,
      country,
    } = this.state;
    return (
      <Container style={{ position: 'relative' }}>
        {openModal && (
          <View style={styles.modalCountry}>
            <ScrollView>
              <Item floatingLabel>
                <Label style={[styles.label, styles.searchCountry]}>Search</Label>
                <Input
                  style={styles.input}
                  floatingLabel
                  underline
                  placeholderTextColor="#999999"
                  selectionColor="#000"
                  onChangeText={text => this.setCountryData(text)}
                  text
                />
                <Icon type="Feather" name="search" />
              </Item>
              {this.renderCountryList(countryData)}
            </ScrollView>
          </View>
        )}
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="PaymentsScreen" title="Add Identity" navigation={navigation} />
        <Content>
          <ScrollView>
            <View style={styles.column}>
              <Form style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Email</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={email => this.setState({ email })}
                      editable={!loading}
                      keyboardType="email-address"
                      onFocus={() => {
                        this.onFocus('emailFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('emailFocus');
                      }}
                    />
                  </Item>
                  <View style={cardNumberFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>First Name</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={firstName => this.setState({ firstName })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('firstNameFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('firstNameFocus');
                      }}
                    />
                  </Item>
                  <View style={firstNameFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Last Name</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={lastName => this.setState({ lastName })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('lastNameFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('lastNameFocus');
                      }}
                    />
                  </Item>
                  <View style={lastNameFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>SSN</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      maxLength={9}
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={personalId => this.setState({ personalId })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('personalIdFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('personalIdFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Dob day</Label>
                    <Input
                      style={styles.input}
                      keyboardType="numeric"
                      maxLength={2}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={dobDay => this.setState({ dobDay })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('dobDayFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('dobDayFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Dob Month</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      keyboardType="numeric"
                      maxLength={2}
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={dobMonth => this.setState({ dobMonth })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('dobMonthFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('dobMonthFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Dob Year</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      keyboardType="numeric"
                      maxLength={4}
                      onChangeText={dobYear => this.setState({ dobYear })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('dobYearFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('dobYearFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Address Line</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrLine1 => this.setState({ addrLine1 })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('AddrLine1Focus');
                      }}
                      onBlur={() => {
                        this.onBlur('AddrLine1Focus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>Address Line 2</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrLine2 => this.setState({ addrLine2 })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('AddrLine2Focus');
                      }}
                      onBlur={() => {
                        this.onBlur('AddrLine2Focus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>City</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrCity => this.setState({ addrCity })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('addrCityFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('addrCityFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}> ZIP/Postal Code</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrPostalCode => this.setState({ addrPostalCode })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('addrPostalCodeFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('addrPostalCodeFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label style={styles.label}>State/Province</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrState => this.setState({ addrState })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('addrStateFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('addrStateFocus');
                      }}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <TouchableOpacity onPress={this.openCountryModal}>
                  <View style={[styles.inputContainer, { marginLeft: 45 }]}>
                    {this.renderCountryInput(country)}
                  </View>
                </TouchableOpacity>
              </Form>
              <View style={styles.section}>
                <View>{loading ? this.loadingAnimation() : this.addCardButton()}</View>
              </View>
              <View style={{ flex: 0.5 }} />
            </View>
          </ScrollView>
          {/* </KeyboardAwareScrollView> */}
        </Content>
        {!openModal && <ScreenFooter navigation={navigation} />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.payment && state.payment.loading,
});

const mapDispatchToProps = dispatch => ({
  addCardIdentity: bindActionCreators(addIdentityReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddIdentityScreen);
