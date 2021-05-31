import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StatusBar, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Container, Content, Button, Text, Input, Form, Item, Label } from 'native-base';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../commons/Loader';

import { getIdentityReq, editIdentityReq, removeIdentityReq } from '../../redux-controller/payment';
import styles from './styles';

import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

class IdentityScreen extends Component {
  static propTypes = {
    getIdentityRequest: PropTypes.func,
    removeIdentityRequest: PropTypes.func,
    editIdentityRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    identity: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    getIdentityRequest: () => {},
    removeIdentityRequest: () => {},
    editIdentityRequest: () => {},
    loading: false,
    navigation: {},
    identity: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      addrLine1: '',
      addrLine2: '',
      addrCity: '',
      addrPostalCode: '',
      addrState: '',
      editable: false,
      cardNumberFocus: false,
      firstNameFocus: false,
      lastNameFocus: false,
      personalIdFocus: false,
      country: '',
    };
  }

  componentDidMount() {
    const { getIdentityRequest } = this.props;
    getIdentityRequest();
  }

  toggleEditIdentity = () => {
    const { identity } = this.props;

    this.setState(state => ({
      editable: !state.editable,
      email: identity.data.email,
      firstName: identity.data.first_name,
      lastName: identity.data.last_name,
      dobDay: identity.data.dob_day < 10 ? `0${identity.data.dob_day}` : identity.data.dob_day,
      dobMonth: identity.data.dob_month,
      dobYear: identity.data.dob_year,
      addrLine1: identity.data.addr_line1,
      addrLine2: identity.data.addr_line2,
      addrCity: identity.data.addr_city,
      addrPostalCode: identity.data.addr_postal_code,
      addrState: identity.data.addr_state,
    }));
  };

  cancelEdit = () => {
    this.setState({
      editable: false,
    });
  };

  submitEditIdentity = () => {
    const { editIdentityRequest } = this.props;
    const {
      email,
      firstName,
      lastName,
      dobDay,
      dobMonth,
      dobYear,
      addrLine1,
      addrLine2,
      addrCity,
      addrPostalCode,
      addrState,
      country,
    } = this.state;
    if (!email || !firstName || !lastName || !dobDay) {
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
      personal_id_number: '',
      dob_day: dobDay,
      dob_month: dobMonth,
      dob_year: dobYear,
      addr_line1: addrLine1,
      addr_line2: addrLine2,
      addr_city: addrCity,
      addr_postal_code: addrPostalCode,
      addr_state: addrState,
      country,
    };
    editIdentityRequest(data);
  };

  removeIdentity = () => {
    const { removeIdentityRequest } = this.props;
    removeIdentityRequest();
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

  editIdentityButton() {
    const { loading } = this.state;
    /* eslint-disable */

    return (
      <Button
        title="Add identity"
        style={styles.button}
        onPress={() => this.toggleEditIdentity(this)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          EDIT IDENTITY
        </Text>
      </Button>
    );
    /* eslint-enable */
  }

  submitButton() {
    const { loading } = this.state;
    /* eslint-disable */

    return (
      <Button
        title="Submit"
        style={styles.button}
        onPress={() => this.submitEditIdentity(this)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          SUBMIT
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

  render() {
    const { navigation, loading, identity } = this.props;
    const {
      cardNumberFocus,
      firstNameFocus,
      lastNameFocus,
      personalIdFocus,
      email,
      addrLine1,
      addrLine2,
      addrCity,
      addrPostalCode,
      addrState,
      editable,
      dobDay,
    } = this.state;
    if (loading || !identity.data) {
      return <Loader />;
    }
    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Identity" navigation={navigation} />
        <Content>
          {/* <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={120}
            extraScrollHeight={120}
            enableAutoAutomaticScroll={Platform.OS === 'ios'}
          > */}
          <ScrollView>
            <View style={styles.column}>
              <Form style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                      style={editable ? styles.editableInput : styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={emailParam => this.setState({ email: emailParam })}
                      value={editable ? email : identity.data.email}
                      editable={editable}
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
                    <Label>First Name</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={firstName => this.setState({ firstName })}
                      editable={false}
                      onFocus={() => {
                        this.onFocus('firstNameFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('firstNameFocus');
                      }}
                      value={identity.data.first_name}
                    />
                  </Item>
                  <View style={firstNameFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Last Name</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={lastName => this.setState({ lastName })}
                      editable={false}
                      onFocus={() => {
                        this.onFocus('lastNameFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('lastNameFocus');
                      }}
                      value={identity.data.last_name}
                    />
                  </Item>
                  <View style={lastNameFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Dob day</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={dobDayParam => this.setState({ dobDay: dobDayParam })}
                      editable={false}
                      onFocus={() => {
                        this.onFocus('dobDayFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('dobDayFocus');
                      }}
                      value={editable ? `${dobDay}` : `${identity.data.dob_day}`}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Dob Month</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={dobMonth => this.setState({ dobMonth })}
                      editable={false}
                      onFocus={() => {
                        this.onFocus('dobMonthFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('dobMonthFocus');
                      }}
                      value={`${identity.data.dob_month}`}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Dob Year</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={dobYear => this.setState({ dobYear })}
                      editable={false}
                      onFocus={() => {
                        this.onFocus('dobYearFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('dobYearFocus');
                      }}
                      value={`${identity.data.dob_year}`}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Address Line</Label>
                    <Input
                      style={editable ? styles.editableInput : styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrLine1Param => this.setState({ addrLine1: addrLine1Param })}
                      editable={editable}
                      onFocus={() => {
                        this.onFocus('AddrLine1Focus');
                      }}
                      onBlur={() => {
                        this.onBlur('AddrLine1Focus');
                      }}
                      value={editable ? addrLine1 : identity.data.addr_line1}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Address Line 2</Label>
                    <Input
                      style={editable ? styles.editableInput : styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrLine2Param => this.setState({ addrLine2: addrLine2Param })}
                      editable={editable}
                      onFocus={() => {
                        this.onFocus('AddrLine2Focus');
                      }}
                      onBlur={() => {
                        this.onBlur('AddrLine2Focus');
                      }}
                      value={editable ? addrLine2 : identity.data.addr_line2}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>City</Label>
                    <Input
                      style={editable ? styles.editableInput : styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrCityParam => this.setState({ addrCity: addrCityParam })}
                      editable={editable}
                      onFocus={() => {
                        this.onFocus('addrCityFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('addrCityFocus');
                      }}
                      value={editable ? addrCity : identity.data.addr_city}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>ZIP/Postal Code</Label>
                    <Input
                      style={editable ? styles.editableInput : styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrPostalCodeParam =>
                        this.setState({ addrPostalCode: addrPostalCodeParam })
                      }
                      editable={editable}
                      onFocus={() => {
                        this.onFocus('addrPostalCodeFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('addrPostalCodeFocus');
                      }}
                      value={editable ? addrPostalCode : identity.data.addr_postal_code}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>State/Province</Label>
                    <Input
                      style={editable ? styles.editableInput : styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={addrStateParam => this.setState({ addrState: addrStateParam })}
                      editable={editable}
                      onFocus={() => {
                        this.onFocus('addrStateFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('addrStateFocus');
                      }}
                      value={editable ? addrState : identity.data.addr_state}
                    />
                  </Item>
                  <View style={personalIdFocus && styles.inputBorderBottom} />
                </View>
              </Form>
              <View style={styles.section}>
                {editable ? (
                  <View>
                    <View>
                      <Button
                        light
                        style={styles.lightButton}
                        onPress={() => {
                          this.cancelEdit();
                        }}
                      >
                        <Text>CANCEL</Text>
                      </Button>
                    </View>
                    <View>{loading ? this.loadingAnimation() : this.submitButton()}</View>
                  </View>
                ) : (
                  <View>
                    <View>
                      <Button
                        light
                        style={styles.lightButton}
                        onPress={() => {
                          this.removeIdentity();
                        }}
                      >
                        <Text>REMOVE IDENTITY</Text>
                      </Button>
                    </View>
                    <View>{this.editIdentityButton()}</View>
                  </View>
                )}
              </View>
              <View style={{ flex: 0.5 }} />
            </View>
          </ScrollView>
          {/* </KeyboardAwareScrollView> */}
        </Content>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.payment && state.payment.loading,
  identity: state.payment.identity,
});

export default connect(
  mapStateToProps,
  {
    getIdentityRequest: getIdentityReq,
    editIdentityRequest: editIdentityReq,
    removeIdentityRequest: removeIdentityReq,
  }
)(IdentityScreen);
