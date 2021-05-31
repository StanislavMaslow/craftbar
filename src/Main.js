import React from 'react';
import { Root } from 'native-base';
import { Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Network from 'expo-network';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Loader from './commons/Loader';
import NavigationService from './services/navigation';

import MyProfileScreen from './screens/MyProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SettingsScreen from './screens/SettingsScreen';
import LatestPostsScreen from './screens/LatestPostsScreen';
import SearchScreen from './screens/SearchScreen';
import AddPostScreen from './screens/AddPostScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AboutScreen from './screens/AboutScreen';
import AccountScreen from './screens/AccountScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import NatificationsSettingsScreen from './screens/NatificationsSettingsScreen';
import FollowersScreen from './screens/FollowersScreen';
import FollowingsScreen from './screens/FollowingsScreen';
import PostScreen from './screens/PostScreen';
import PaymentAddTipScreen from './screens/PaymentAddTipScreen';
import CongratulationsScreen from './screens/PaymentAddTipScreen/Congratulations';
import AddCreditCardScreen from './screens/AddCreditCardScreen';
import CardsScreen from './screens/PaymentsScreen/Cards/Cards';
import AddIdentityScreen from './screens/AddIdentityScreen';
import TipScreen from './screens/TipScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import IdentityScreen from './screens/IdentityScreen';
import AvailabilityScreen from './screens/AvailabilityScreen';
import AvailabilityListScreen from './screens/AvailabilityListScreen';
import PayoutsScreen from './screens/PayoutsScreen';
import RateScreen from './screens/RateScreen';
import FacebokLogInScreen from './screens/FacebokLogInScreen';
import ReportProblemScreen from './screens/ReportProblemScreen';
import TermsOfUseScreen from './screens/TermsOfUseScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';

const RootStack = createStackNavigator(
  {
    AboutScreen: {
      screen: AboutScreen,
    },
    AccountScreen: {
      screen: AccountScreen,
    },
    AddCreditCardScreen: {
      screen: AddCreditCardScreen,
    },
    AddIdentityScreen: {
      screen: AddIdentityScreen,
    },
    AddPostScreen: {
      screen: AddPostScreen,
    },
    AvailabilityListScreen: {
      screen: AvailabilityListScreen,
    },
    AvailabilityScreen: {
      screen: AvailabilityScreen,
    },
    CardsScreen: {
      screen: CardsScreen,
    },
    CongratulationsScreen: {
      screen: CongratulationsScreen,
    },
    CongratulationsScreenn: {
      screen: CongratulationsScreen,
    },
    FollowersScreen: {
      screen: FollowersScreen,
    },
    FollowingsScreen: {
      screen: FollowingsScreen,
    },
    IdentityScreen: {
      screen: IdentityScreen,
    },
    LatestPostsScreen: {
      screen: LatestPostsScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    MyProfileScreen: {
      screen: MyProfileScreen,
    },
    NatificationsSettingsScreen: {
      screen: NatificationsSettingsScreen,
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
    },
    PaymentAddTipScreen: {
      screen: PaymentAddTipScreen,
    },
    PaymentsScreen: {
      screen: PaymentsScreen,
    },
    PayoutsScreen: {
      screen: PayoutsScreen,
    },
    PostScreen: {
      screen: PostScreen,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    SettingsScreen: {
      screen: SettingsScreen,
    },
    SignupScreen: {
      screen: SignupScreen,
    },
    TipScreen: {
      screen: TipScreen,
    },
    UserProfileScreen: {
      screen: UserProfileScreen,
    },
    WithdrawScreen: {
      screen: WithdrawScreen,
    },
    RateScreen: {
      screen: RateScreen,
    },
    FacebokLogInScreen: {
      screen: FacebokLogInScreen,
    },
    ReportProblemScreen: {
      screen: ReportProblemScreen,
    },
    TermsOfUseScreen: {
      screen: TermsOfUseScreen,
    },
    PrivacyPolicyScreen: {
      screen: PrivacyPolicyScreen,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

const AppNavigator = createAppContainer(RootStack);

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isConnected: true,
    };
  }

  /*eslint-disable */
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    const connection = await Network.getNetworkStateAsync();
    this.setState({ isReady: true, isConnected: connection.isConnected });
  }
  /* eslint-enable */

  render() {
    const { isReady, isConnected } = this.state;
    if (!isReady) {
      return <Loader />;
    }
    if (!isConnected) {
      Alert.alert('No network connection :(');
      return <Loader />;
    }
    return (
      <Root>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Root>
    );
  }
}
