import { Alert, AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import NavigationService from '../services/navigation';

const ApiUtils = {
  /* eslint-disable */
  checkStatus: async (response, options, url) => {
    if (response.status === 400 && response.url.indexOf('login/facebook') !== -1) {
      let parced = null;
      parced = await response.json();
      console.log('-response in utils--', parced);

      const keys = Object.keys(parced.errors);

      keys.map(key => {
        if (parced.errors[key][0] === 'The email has already been taken.') {
          Alert.alert('Error', parced.errors[key][0]);
        }

        if (parced.errors[key][0] === 'The role field is required.') {
          Alert.alert(
            'Error',
            `You don't have "The Crafty Barkeep" account yet. Complete the application form below.`,
          );
        }
      });

      NavigationService.navigate('FacebokLogInScreen', { from: 'LogIn' });
      throw new Error('message');
    }
    if (response.status_code === 401 || response.status === 401) {
      console.log('Unauthenticated!!');
      AsyncStorage.removeItem('tokenTCBK', () => {
        NavigationService.navigate('LoginScreen');
      });
      Toast.show({
        text: 'Please log in. Session expired!!!',
        buttonText: 'Close',
        duration: 2000,
      });
      throw new Error('Please log in. Session expired!!!');
    } else if (response.status === 404) {
      let parced = null;
      parced = await response.json();
      console.log('parced in 404', parced);
      NavigationService.navigate('LatestPostsScreen');
      throw new Error(parced.errors.message);
    }

    if (response.status === 500 || response.status === 400) {
      let parced = null;
      parced = await response.json();
      console.log('parced in 500');
      const keys = Object.keys(parced.errors);
      keys.map(key => {
        console.log('Error', JSON.stringify(parced.errors[key][0]));
        if (typeof parced.errors[key] === 'object') {
          Alert.alert('Error', JSON.stringify(parced.errors[key][0]).slice(1, -1));
        } else {
          if (parced.errors[key].slice(1, -1).indexOf('stored before identity information') > 0) {
            Alert.alert('Please complete all information requested on this form!');
          } else {
            Alert.alert('Error', JSON.stringify(parced.errors[key]).slice(1, -1));
          }
        }
      });
      throw new Error(parced.errors.message);
    }
    if (response.ok) {
      console.log('response ok----------');
      return response;
    } else {
      let parced = null;
      parced = await response.json();
      console.log('parced in error(not 400 or 500)', parced);
      if (parced.errors) {
        Alert.alert('Error', JSON.stringify(parced.errors));
      } else {
        Alert.alert('Error', JSON.stringify(parced));
      }
      throw new Error(response);
    }
  },
  /* eslint-enable */
  getBaseUrl: () => 'http://app.thecraftybarkeep.com/api',
  getImageUrl: () => 'http://app.thecraftybarkeep.com',
};
export { ApiUtils as default };
