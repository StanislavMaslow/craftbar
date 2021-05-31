import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Notifications } from 'expo';
import * as FileSystem from 'expo-file-system';
import * as Facebook from 'expo-facebook';

import * as Permissions from 'expo-permissions';
import {
  ActivityIndicator,
  View,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Input,
  Form,
  Item,
  Label,
  ListItem,
  Radio,
  H3,
} from 'native-base';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import Loader from '../../commons/Loader';

import { signUpFacebookReq } from '../../redux-controller/user';

import styles from '../SignupScreen/styles';

class SignupScreen extends React.Component {
  static propTypes = {
    signUpFacebookRequest: PropTypes.func,
    isLoading: PropTypes.bool,
    navigation: PropTypes.objectOf(PropTypes.any),
    facebookAuthorization: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    signUpFacebookRequest: () => {},
    navigation: {},
    facebookAuthorization: {},
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      token: '',
      radio1: true,
      radio2: false,
      radio3: false,
      loading: false,
      isLoadingFacebook: false,
      typeFile: '',
      firstName: '',
      tokenNotification: '',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const from = navigation.getParam('from', {});

    if (from === 'LogIn') {
      const {
        facebookAuthorization: { email, firstName, picture, token },
      } = this.props;

      this.convertPicture(picture);

      if (email) {
        this.setState({
          email,
        });
      }

      this.setState({
        token,
        firstName,
        isLoadingFacebook: false,
      });
    } else {
      this.logInFB();
    }
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reminders', {
        name: 'Reminders',
        priority: 'normal',
        vibrate: [0, 250, 250, 250],
      });
    }

    this.notificationSubscription = Notifications.addListener(this.handleNotification);

    this.registerForPushNotificationsAsync();
  }

  convertPicture = picture => {
    const randomNameImg = `${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    FileSystem.downloadAsync(
      picture.data.url,
      `${FileSystem.documentDirectory}${randomNameImg}.jpg`
    )
      .then(({ uri }) => {
        this.setState({
          typeFile: uri,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

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

  handleNotification = notification => {
    console.log(notification);
  };

  logInFB = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('2143475049294532', {
        permissions: ['public_profile', 'email'],
      });

      this.setState({
        isLoadingFacebook: true,
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday,picture.height(961)&access_token=${token}`
        );

        const { email, picture, name } = await response.json();
        const firstName = name.split(' ')[0];

        this.convertPicture(picture);

        this.setState({
          token,
          firstName,
          isLoadingFacebook: false,
        });

        if (email) {
          this.setState({
            email,
          });
        }
      } else {
        this.setState({
          isLoadingFacebook: false,
        });
      }
    } catch ({ message }) {
      this.setState({
        isLoadingFacebook: false,
      });
      console.log(`Facebook Login Error: ${message}`);
    }
  };

  signUp = async () => {
    const {
      username,
      radio1,
      radio2,
      email,
      token,
      typeFile,
      firstName,
      tokenNotification,
    } = this.state;
    const { signUpFacebookRequest } = this.props;

    if (!username) {
      Alert.alert('Error', 'Field username cannot be blank');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Field email cannot be blank');
      return;
    }

    if (username.length < 5) {
      Alert.alert('Error', 'The username must be at least 5 characters.');
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
    const data = {
      provider: 'facebook',
      username,
      access_token: token,
      email,
      role: detectRole(),
      app_token: tokenNotification || 'token-',
    };

    signUpFacebookRequest(data, { typeFile, firstName });
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
      radio1,
      radio2,
      radio3,
      firstnameFocus,
      email,
      isLoadingFacebook,
    } = this.state;
    const { isLoading, navigation } = this.props;

    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {isLoadingFacebook ? (
          <Loader />
        ) : (
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{ height: 200 }}
                /* eslint-disable */
                source={require('../../../assets/logo.png')}
                /* eslint-enable */
                resizeMode="contain"
              />

              <H3 style={styles.title}>The Crafty</H3>

              <Text style={[styles.title, styles.blackTitle]}>Barkeep</Text>
            </View>

            <View style={styles.column}>
              <Form style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={username => this.setState({ username })}
                      editable={!loading}
                    />
                  </Item>
                  <View style={firstnameFocus && styles.inputBorderBottom} />
                </View>
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      value={email}
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      onChangeText={emailParam => this.setState({ email: emailParam })}
                      editable={!loading}
                    />
                  </Item>
                  <View style={firstnameFocus && styles.inputBorderBottom} />
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
                <View style={styles.textContainer}>
                  <Text
                    style={styles.text}
                    onPress={() => {
                      navigation.navigate('LoginScreen');
                    }}
                  >
                    Login
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.loading,
  facebookAuthorization: state.user.facebookAuthorization,
});

const mapDispatchToProps = dispatch => ({
  signUpFacebookRequest: bindActionCreators(signUpFacebookReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
