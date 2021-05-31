import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';
import { ActivityIndicator, View, StatusBar, AsyncStorage, Platform, Alert } from 'react-native';
import {
  Container,
  Button,
  Text,
  Input,
  Icon,
  Form,
  Item,
  Label,
  ListItem,
  Radio,
} from 'native-base';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { signUpReq } from '../../redux-controller/user';
import ScreenHeader from '../../commons/ScreenHeader';
import styles from './styles';

class SignupScreen extends React.Component {
  static propTypes = {
    signUpRequest: PropTypes.func,
    isLoading: PropTypes.bool,
    navigation: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    signUpRequest: () => {},
    navigation: {},
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      radio1: true,
      radio2: false,
      radio3: false,
      loading: false,
      showPass: true,
      passwordFocus: false,
      usernameFocus: false,
      emailFocus: false,
      firstnameFocus: false,
      lastnameFocus: false,
      tokenNotification: '',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const token = await AsyncStorage.getItem('tokenTCBK');

    if (token !== null) {
      navigation.navigate('MyProfileScreen');
    }

    this.registerForPushNotificationsAsync();

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();

    this.setState({
      tokenNotification: token,
    });
  };

  signUp = async () => {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      radio1,
      radio2,
      tokenNotification,
    } = this.state;
    const { signUpRequest } = this.props;

    if (!username || !firstname || !email) {
      Alert.alert('Error', 'Form fields cannot be blank');
      return;
    }

    if (username.length < 5) {
      Alert.alert('Error', 'The username must be at least 5 characters.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('The password must be at least 6 characters.');
      return;
    }
    const detectRole = () => {
      if (radio1) {
        return 'Patron';
      }
      if (radio2) {
        return 'Barkeep';
      }
      return 'Bar';
    };
    const data =
      !radio1 && !radio2
        ? {
            username,
            firstname,
            email,
            password,
            role: detectRole(),
            app_token: tokenNotification || 'token-',
          }
        : {
            username,
            firstname,
            lastname,
            email,
            password,
            role: detectRole(),
            app_token: tokenNotification || 'token-',
          };

    signUpRequest(data);
  };

  showPassFunc = () => {
    const { showPass } = this.state;
    this.setState({
      showPass: !showPass,
    });
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

  signUpBtn() {
    const { loading } = this.state;
    /* eslint-disable */

    return (
      <Button
        title="Sign In"
        style={styles.button}
        onPress={this.signUp.bind(this)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          Sign Up
        </Text>
      </Button>
    );
    /* eslint-enable */
  }

  loadingAnimation() {
    const { loading } = this.state;
    /* eslint-disable */
    return (
      <Button
        title="Sign In"
        style={styles.button}
        onPress={this.signUp.bind(this)}
        disabled={loading}
      >
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
    /* eslint-enable */
  }

  resetPassword() {
    const { navigation } = this.props;
    navigation.navigate('ForgotPassword');
  }

  toggleRadio1() {
    this.setState({
      radio1: true,
      radio2: false,
      radio3: false,
    });
  }

  toggleRadio2() {
    this.setState({
      radio1: false,
      radio2: true,
      radio3: false,
    });
  }

  toggleRadio3() {
    this.setState({
      radio1: false,
      radio2: false,
      radio3: true,
    });
  }

  render() {
    const {
      loading,
      showPass,
      radio1,
      radio2,
      radio3,
      lastnameFocus,
      firstnameFocus,
      emailFocus,
      usernameFocus,
      passwordFocus,
    } = this.state;
    const { navigation, isLoading } = this.props;
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScreenHeader target="LoginScreen" title="Sign Up" navigation={navigation} />

        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={Platform.OS === 'ios' ? -80 : 60}
          extraScrollHeight={Platform.OS === 'ios' ? -80 : 60}
          enableAutoAutomaticScroll
        >
          <View style={styles.column}>
            <Form style={styles.inputSection}>
              <View style={styles.inputContainer}>
                <Item floatingLabel>
                  <Label>{!radio3 ? 'First Name' : 'Name'}</Label>
                  <Input
                    style={styles.input}
                    floatingLabel
                    underline
                    placeholderTextColor="#999999"
                    selectionColor="#000"
                    onChangeText={firstname => this.setState({ firstname })}
                    editable={!loading}
                    onFocus={() => {
                      this.onFocus('firstnameFocus');
                    }}
                    onBlur={() => {
                      this.onBlur('firstnameFocus');
                    }}
                  />
                </Item>
                <View style={firstnameFocus && styles.inputBorderBottom} />
              </View>
              {!radio3 && (
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Last Name</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={lastname => this.setState({ lastname })}
                      editable={!loading}
                      onFocus={() => {
                        this.onFocus('lastnameFocus');
                      }}
                      onBlur={() => {
                        this.onBlur('lastnameFocus');
                      }}
                    />
                  </Item>
                  <View style={lastnameFocus && styles.inputBorderBottom} />
                </View>
              )}
              <View style={styles.inputContainer}>
                <Item floatingLabel>
                  <Label>E-mail</Label>
                  <Input
                    style={styles.input}
                    floatingLabel
                    underline
                    placeholderTextColor="#999999"
                    autoCapitalize="none"
                    selectionColor="#000"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({ email })}
                    editable={!loading}
                    onFocus={() => {
                      this.onFocus('emailFocus');
                    }}
                    onBlur={() => {
                      this.onBlur('emailFocus');
                    }}
                  />
                </Item>
                <View style={emailFocus && styles.inputBorderBottom} />
              </View>
              <View style={styles.inputContainer}>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                    style={styles.input}
                    floatingLabel
                    underline
                    placeholderTextColor="#999999"
                    autoCapitalize="none"
                    selectionColor="#000"
                    onChangeText={username => this.setState({ username })}
                    editable={!loading}
                    onFocus={() => {
                      this.onFocus('usernameFocus');
                    }}
                    onBlur={() => {
                      this.onBlur('usernameFocus');
                    }}
                  />
                </Item>
                <View style={usernameFocus && styles.inputBorderBottom} />
              </View>
              <View style={styles.inputContainer}>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    style={styles.input}
                    underline
                    placeholderTextColor="#999999"
                    selectionColor="#000"
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry={showPass}
                    editable={!loading}
                    required="true"
                    onFocus={() => {
                      this.onFocus('passwordFocus');
                    }}
                    onBlur={() => {
                      this.onBlur('passwordFocus');
                    }}
                  />
                </Item>
                <View style={passwordFocus && styles.inputBorderBottom} />
                <Icon
                  active
                  type="SimpleLineIcons"
                  name="eye"
                  style={styles.icon}
                  size={10}
                  onPress={this.showPassFunc}
                />
              </View>
            </Form>
            <View style={styles.section}>
              <View style={styles.radioContainer}>
                <ListItem
                  style={[styles.radioListItem, styles.radio1]}
                  selected={radio1}
                  onPress={() => this.toggleRadio1()}
                >
                  <Radio
                    selectedColor="#7a7a7a"
                    color="#7a7a7a"
                    selected={radio1}
                    onPress={() => this.toggleRadio1()}
                  />
                  <Text style={styles.radioText}>Patron</Text>
                </ListItem>
                <ListItem
                  style={[styles.radioListItem, styles.radio2]}
                  selected={radio2}
                  onPress={() => this.toggleRadio2()}
                >
                  <Radio
                    selectedColor="#7a7a7a"
                    color="#7a7a7a"
                    selected={radio2}
                    onPress={() => this.toggleRadio2()}
                  />
                  <Text style={styles.radioText}>Barkeep</Text>
                </ListItem>
                <ListItem
                  style={[styles.radioListItem, styles.radio3]}
                  selected={radio3}
                  onPress={() => this.toggleRadio3()}
                >
                  <Radio
                    selectedColor="#7a7a7a"
                    color="#7a7a7a"
                    selected={radio3}
                    onPress={() => this.toggleRadio3()}
                  />
                  <Text style={styles.radioText}>Bar</Text>
                </ListItem>
              </View>
              <View>{isLoading ? this.loadingAnimation() : this.signUpBtn()}</View>
              <Button
                style={styles.connectButton}
                onPress={() => navigation.navigate('FacebokLogInScreen')}
              >
                <IconSL size={20} active name="social-facebook" style={styles.socialIcon} />

                <Text style={styles.connectBuhttonText} uppercase={false}>
                  Sign Up with Facebook
                </Text>
              </Button>
            </View>
            <View style={{ flex: 0.5 }} />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  signUpRequest: bindActionCreators(signUpReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
