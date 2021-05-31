import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, StatusBar, Image, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Container,
  Button,
  H3,
  Text,
  Input,
  Toast,
  Form,
  Item,
  Label,
  Left,
  Right,
} from 'native-base';

import UserApi from '../../api/user';
import styles from './styles';

class ForgotPassword extends React.Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    navigation: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      emailFocus: false,
    };
  }

  ressetPass = async () => {
    const { email } = this.state;
    const { navigation } = this.props;
    if (!email) {
      Alert.alert('Email cannot be blank!');
      return;
    }

    this.setState({ loading: true });
    try {
      const response = await UserApi.ressetPasswprdApi({
        email,
      });
      if (!response || response.status !== 'success') {
        Alert.alert('Server error! Please try again!');
        this.setState({ loading: false });
        return;
      }
      Alert.alert(response.data.message);
      this.setState({ loading: false });
      navigation.navigate('LoginScreen');
    } catch (e) {
      /* eslint-disable */
      console.error(e);
      /* eslint-enable */
      Toast.show({
        text: 'Server error! Please try again!',
        buttonText: 'Close',
        duration: 5000,
      });
      this.setState({ loading: false });
    }
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

  loadingAnimation() {
    const { loading } = this.state;
    return (
      <Button style={styles.button} disabled={loading}>
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
  }

  ressetBtn() {
    const { loading } = this.state;
    return (
      <Button
        title="Reset Password"
        style={styles.button}
        onPress={() => this.ressetPass()}
        disabled={loading}
      >
        <Text style={styles.loginButtonText} uppercase={false}>
          Reset Password
        </Text>
      </Button>
    );
  }

  render() {
    const { loading, emailFocus } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}

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
          extraHeight={20}
          extraScrollHeight={20}
          enableAutoAutomaticScroll
        >
          <View style={styles.column}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Please enter your email to search for your account and send you a reset link.
              </Text>
            </View>
            <Form style={styles.inputSection}>
              <View style={styles.inputContainer}>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    style={styles.input}
                    floatingLabel
                    underline
                    onFocus={() => {
                      this.onFocus('emailFocus');
                    }}
                    onBlur={() => {
                      this.onBlur('emailFocus');
                    }}
                    placeholderTextColor="#999999"
                    
                    selectionColor="#000"
                    onChangeText={post => this.setState({ email: post })}
                    editable={!loading}
                    autoCapitalize="none"
                  />
                </Item>
                <View style={emailFocus && styles.inputBorderBottom} />
              </View>
            </Form>
            <View style={styles.section}>
              <View>{loading ? this.loadingAnimation() : this.ressetBtn()}</View>
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
            <View style={{ flex: 0.5 }} />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

export default ForgotPassword;
