import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Platform, ScrollView } from 'react-native';
import { Container, Text, Content } from 'native-base';
/* eslint-disable */
import { Row } from 'react-native-easy-grid';
/* eslint-enable */
import IconFT from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { getTipReq } from '../../redux-controller/payment';
import { getMyUserDataReq } from '../../redux-controller/user';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import ClickableUserAvatar from '../../commons/ClickableUserAvatar';
import styles from './styles';

import Loader from '../../commons/Loader';

class TipScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any),
    getTipRequest: PropTypes.func,
    tip: PropTypes.objectOf(PropTypes.any),
    myUser: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
    getUserDataRequest: PropTypes.func,
  };

  static defaultProps = {
    navigation: {},
    getTipRequest: () => {},
    tip: {},
    myUser: {},
    loading: false,
    getUserDataRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // points: '23',
    };
  }

  componentDidMount() {
    const { getTipRequest, getUserDataRequest, navigation } = this.props;
    const itemId = navigation.getParam('id', 'NO-ID');
    getUserDataRequest();
    getTipRequest(itemId);
  }

  render() {
    const { navigation, tip, myUser, loading } = this.props;
    if (loading || !tip.amount || !myUser.data) {
      return <Loader />;
    }
    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Tip" navigation={navigation} />
        <Content>
          <ScrollView>
            <View style={styles.tipsPostContainer}>
              <Row style={styles.avaContainer}>
                <ClickableUserAvatar
                  navigation={navigation}
                  id={
                    +tip.sender.link.slice(
                      tip.sender.link.lastIndexOf('/') + 1,
                      tip.sender.link.length
                    )
                  }
                  avatarLink={tip.sender.avatar}
                />
                <View style={styles.tipsPostAvatar}>
                  <IconFT size={20} name="arrow-right" style={styles.arrowIcon} />
                </View>
                <ClickableUserAvatar
                  navigation={navigation}
                  id={
                    +tip.receiver.link.slice(
                      tip.receiver.link.lastIndexOf('/') + 1,
                      tip.receiver.link.length
                    )
                  }
                  avatarLink={tip.receiver.avatar}
                />
              </Row>
              <View style={styles.tipsPostGrid}>
                <Row style={styles.tipsFirstRow}>
                  <View style={styles.tipsPostAvatar}>
                    <Text style={[styles.name, styles.openSans]}>{tip.sender.lastname}</Text>
                    <Text style={styles.openSans}>{tip.sender.lastname}</Text>
                  </View>

                  <View style={styles.tipsPostAvatar}>
                    <Text style={styles.tipsAmount}>{tip.amount}</Text>

                    <Text style={styles.openSans}>Tips</Text>
                  </View>

                  <View style={styles.tipsPostAvatar}>
                    <Text style={styles.name}>{tip.receiver.firstname}</Text>
                    <Text style={styles.openSans}>{tip.receiver.lastname}</Text>
                  </View>
                </Row>
                <View style={styles.greyDevider} />
              </View>
            </View>
            <View>
              <Text style={styles.notificationCard}>
                Card Withdrawals may take 5-7 buisness days depending on your card
              </Text>
            </View>
            <View style={styles.buttons}>
              {myUser.data.role === 'Barkeep' && tip.status !== 'succeeded' && (
                <View>
                  <Text style={styles.notificationCard}>Accepted</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </Content>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tip: state.payment && state.payment.tip.data,
  loading: state.payment.loading,
  myUser: state.user && state.user.myUserData,
});

export default connect(
  mapStateToProps,
  {
    getTipRequest: getTipReq,
    getUserDataRequest: getMyUserDataReq,
  }
)(TipScreen);
