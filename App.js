import React from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import Main from './src/Main';
import store from './src/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

YellowBox.ignoreWarnings(['Require cycle:', 'Remote debugger']);
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  /*eslint-disable */
  _loadResourcesAsync = async () =>
    Promise.all([
      Font.loadAsync({
        OpenSans: require('./assets/fonts/Open_Sans.ttf'),
        OpenSansLight: require('./assets/fonts/Open_Sans_Light.ttf'),
        OpenSansBold: require('./assets/fonts/OpenSans_SemiBold.ttf'),
        OpenSansRegular: require('./assets/fonts/Open_Sans_Regular.ttf'),
        Dancing: require('./assets/fonts/Dancing_Script.ttf'),
        OpenSansItalic: require('./assets/fonts/Open_Sans-Italic.ttf'),
      }),
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <Main />
        </Provider>
      </View>
    );
  }
  /* eslint-enable */
}
