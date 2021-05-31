import React from 'react';
import PropTypes from 'prop-types';
import { Notifications } from 'expo';
import * as Facebook from 'expo-facebook';

import * as Permissions from 'expo-permissions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  ActivityIndicator,
  View,
  StatusBar,
  Image,
  AsyncStorage,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  Container,
  Button,
  H3,
  Text,
  Input,
  Icon,
  Toast,
  Form,
  Item,
  Label,
  Left,
  Right,
} from 'native-base';

import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import Loader from '../../commons/Loader';
import UserApi from '../../api/user';
import { signUpFacebookReq, getFacebookAuthorizationData } from '../../redux-controller/user';
import styles from './styles';

const resetActionLoginScreen = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
});
class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any),
    signUpFacebookRequest: PropTypes.func,
    getFacebookAuthorizationDataReq: PropTypes.func,
    isLoadingFacebook: PropTypes.bool,
  };

  static defaultProps = {
    navigation: {},
    signUpFacebookRequest: {},
    getFacebookAuthorizationDataReq: {},
    isLoadingFacebook: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      passwordFocus: false,
      usernameFocus: false,
      showPass: true,
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

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reminders', {
        name: 'Reminders',
        priority: 'normal',
        vibrate: [0, 250, 250, 250],
      });
    }

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

  handleNotification = (notification) => {
    console.log(notification);
  };

  signIn = async () => {
    const { username, password, tokenNotification } = this.state;
    const { navigation } = this.props;
    if (!username) {
      Alert.alert('Username cannot be blank!');
      return;
    }

    if (!password) {
      Alert.alert('Password cannot be blank!');
      return;
    }

    this.setState({ loading: true });
    try {
      const response = await UserApi.login({
        username,
        password,
        app_token: tokenNotification || 'no token-',
      });

      if (!response || response.status !== 'success' || response.status_code !== 200) {
        // Alert.alert('Wrong credentials! Please try again!');
        this.setState({ loading: false });
        return;
      }
      await AsyncStorage.setItem('tokenTCBK', `Bearer ${response.data.access_token}`);
      this.setState({ loading: false });
      navigation.dispatch(resetActionLoginScreen);
    } catch (e) {
      /* eslint-disable */
      console.error(e);
      /* eslint-enable */
      Toast.show({
        text: 'Wrong credentials! Please try again',
        buttonText: 'Close',
        duration: 5000,
      });
      this.setState({ loading: false });
    }
  };

  showPassFunc = () => {
    const { showPass } = this.state;
    this.setState({
      showPass: !showPass,
    });
  };

  onFocus = (input) => {
    this.setState({
      [input]: true,
    });
  };

  onBlur = (input) => {
    this.setState({
      [input]: false,
    });
  };

  logInFB = async () => {
    const { tokenNotification } = this.state;
    const { signUpFacebookRequest, getFacebookAuthorizationDataReq } = this.props;
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('2143475049294532', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday,picture.height(961)&access_token=${token}`,
        );

        const { email, picture, name } = await response.json();
        const firstName = name.split(' ')[0];

        getFacebookAuthorizationDataReq({ email, picture, firstName, token });
        signUpFacebookRequest({
          provider: 'facebook',
          access_token: token,
          app_token: tokenNotification || 'no token-',
        });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  resetPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('ForgotPassword');
  };

  loginBtn() {
    const { loading } = this.state;
    return (
      <Button
        title="Sign In"
        style={styles.button}
        /* eslint-disable */
        onPress={this.signIn.bind(this)}
        /* eslint-enable */
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          Login
        </Text>
      </Button>
    );
  }

  loadingAnimation() {
    const { loading } = this.state;
    return (
      <Button
        title="Sign In"
        style={styles.button}
        /* eslint-disable */
        onPress={this.signIn.bind(this)}
        /* eslint-enable */
        disabled={loading}
      >
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
  }

  render() {
    const { loading, showPass, usernameFocus, passwordFocus } = this.state;
    const { navigation, isLoadingFacebook } = this.props;

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}

        {isLoadingFacebook ? (
          <Loader />
        ) : (
          <View>
            <View style={styles.header}>
              <Left />
              <View>
                <Image
                  style={styles.image}
                  /* eslint-disable */
                  source={require('../../../assets/logo.png')}
                  /* eslint-enable */
                  resizeMode="contain"
                />

                <H3 style={styles.title}>The Crafty</H3>

                <Text style={[styles.title, styles.blackTitle]}>Barkeep</Text>
              </View>
              <Right />
            </View>
            <KeyboardAwareScrollView
              enableOnAndroid
              extraHeight={45}
              extraScrollHeight={45}
              enableAutoAutomaticScroll
            >
              <ScrollView>
                <View style={styles.column}>
                  <Button style={styles.connectButton} onPress={this.logInFB}>
                    <IconSL size={20} active name="social-facebook" style={styles.socialIcon} />

                    <Text style={styles.connectBuhttonText} uppercase={false}>
                      Connect with Facebook
                    </Text>
                  </Button>
                  <Form style={styles.inputSection}>
                    <View style={styles.inputContainer}>
                      <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                          style={styles.input}
                          floatingLabel
                          underline
                          onFocus={() => {
                            this.onFocus('usernameFocus');
                          }}
                          onBlur={() => {
                            this.onBlur('usernameFocus');
                          }}
                          placeholderTextColor="#999999"
                          //
                          selectionColor="#000"
                          onChangeText={(username) => this.setState({ username })}
                          editable={!loading}
                          autoCapitalize="none"
                          textContentType="username"
                        />
                      </Item>
                      <View style={usernameFocus && styles.inputBorderBottom} />
                    </View>
                    <View style={[styles.inputContainer]}>
                      <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                          style={styles.input}
                          underline
                          placeholderTextColor="#999999"
                          //
                          selectionColor="#000"
                          onChangeText={(password) => this.setState({ password })}
                          onFocus={() => {
                            this.onFocus('passwordFocus');
                          }}
                          onBlur={() => {
                            this.onBlur('passwordFocus');
                          }}
                          secureTextEntry={showPass}
                          editable={!loading}
                          required="true"
                          autoCapitalize="none"
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
                    <View>{loading ? this.loadingAnimation() : this.loginBtn()}</View>
                    <View style={styles.forgot}>
                      <Text
                        style={styles.link}
                        onPress={() => {
                          navigation.navigate('SignupScreen');
                        }}
                      >
                        Sign Up
                      </Text>
                      <Text style={styles.link} onPress={() => this.resetPassword()}>
                        Forgot password?
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.5 }} />
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoadingFacebook: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  signUpFacebookRequest: bindActionCreators(signUpFacebookReq, dispatch),
  getFacebookAuthorizationDataReq: bindActionCreators(getFacebookAuthorizationData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
