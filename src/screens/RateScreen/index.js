import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Platform, View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Text, Button } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import Loader from '../../commons/Loader';
import ScreenFooter from '../../commons/ScreenFooter';
import ProfileHeader from '../../commons/UserProfile/ProfileHeader';
import styles from './styles';
import ApiUtils from '../../api/api-utils';
import { addRatingReq } from '../../redux-controller/user';

const glass = require('../../../assets/icons/fill.png');

const baseUrl = `${ApiUtils.getImageUrl()}`;
const defaultAvatar = require('../../../assets/images/default.png');

class RateScreen extends Component {
  static propTypes = {
    addRatingRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    addRatingRequest: () => {},
    navigation: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      review: '',
    };
  }

  ratingCompleted = rating => {
    this.setState({
      rating,
    });
  };

  submitRating = () => {
    const { rating, review } = this.state;

    const { addRatingRequest, navigation } = this.props;
    const userData = navigation.getParam('userData', {});
    const data = { rating, review, id: userData.id };
    addRatingRequest(data);
  };

  addCardButton() {
    const { loading } = this.state;
    /* eslint-disable */

    return (
      <Button
        title="Add Card"
        style={styles.button}
        onPress={() => this.submitRating(this)}
        disabled={loading}
      >
        <Text style={styles.rateButtonText} uppercase={false}>
          Rate
        </Text>
      </Button>
    );
    /* eslint-enable */
  }

  loadingAnimation() {
    const { loading } = this.props;
    /* eslint-disable */
    return (
      <Button title="Add Card" style={styles.button} disabled={loading}>
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
    /* eslint-enable */
  }

  render() {
    const { loading, navigation } = this.props;
    const userData = navigation.getParam('userData', {});

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}

        <ScrollView>
          {!loading ? (
            <View>
              <ProfileHeader userData={userData} navigation={navigation} />
              <Image
                style={styles.avatar}
                source={userData.avatar ? { uri: `${baseUrl}${userData.avatar}` } : defaultAvatar}
              />
              <View style={styles.content}>
                <AirbnbRating
                  type="custom"
                  ratingImage={glass}
                  defaultRating={5}
                  onFinishRating={this.ratingCompleted}
                />
                <View style={styles.section}>
                  <View>{loading ? this.loadingAnimation() : this.addCardButton()}</View>
                </View>
              </View>
            </View>
          ) : (
            <Loader />
          )}
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  addRatingRequest: bindActionCreators(addRatingReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateScreen);
