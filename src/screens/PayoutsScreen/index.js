import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  View,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import { Container } from 'native-base';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import styles from './styles';
import { getPayoutsReq, clearArrayPayoutsReq } from '../../redux-controller/payment';
import NothingToShow from '../../commons/NothingToShow';
import Loader from '../../commons/Loader';

import Payout from './Payout';

class PayoutsScreen extends React.Component {
  static propTypes = {
    getPayoutsRequest: PropTypes.func,
    clearArrayPayoutsRequest: PropTypes.func,
    payouts: PropTypes.arrayOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    metaPayouts: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    getPayoutsRequest: () => {},
    clearArrayPayoutsRequest: () => {},
    payouts: [],
    navigation: {},
    metaPayouts: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { getPayoutsRequest, clearArrayPayoutsRequest } = this.props;
    clearArrayPayoutsRequest();
    getPayoutsRequest();

    this.setState({
      page: 1,
    });
  }

  refresh = () => {
    const { getPayoutsRequest, clearArrayPayoutsRequest } = this.props;

    this.setState({
      page: 1,
    });

    clearArrayPayoutsRequest();
    getPayoutsRequest();
  };

  loadMore = () => {
    const { getPayoutsRequest } = this.props;
    const { page } = this.state;

    this.setState(state => ({
      page: state.page + 1,
    }));
    getPayoutsRequest(page + 1);
  };

  renderLoadMore = () => {
    const { metaPayouts, payouts } = this.props;
    const { last_page: lastPage, per_page: perPage } = metaPayouts;
    const { page } = this.state;

    if (lastPage === page || payouts.length <= perPage - 1) {
      return null;
    }

    return (
      <TouchableOpacity onPress={this.loadMore}>
        <View
          style={{
            padding: 15,
            margin: 15,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }}
        >
          <Text style={{ textAlign: 'center' }}>Load more...</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { payouts, navigation, loading } = this.props;
    if (loading) {
      return <Loader />;
    }

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="PaymentsScreen" title="Payouts List" navigation={navigation} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} />}
        >
          <View>
            {payouts &&
              payouts.map(item => (
                <TouchableOpacity
                  key={item.link}
                  // onPress={() => {
                  //   navigation.navigate('PayoutsScreen', { item: item[key[0]] });
                  // }}
                >
                  <Payout item={item} />
                </TouchableOpacity>
              ))}
          </View>
          {payouts.length === 0 && <NothingToShow />}

          <View style={{ flex: 0.5 }} />
          <View>{payouts.length > 0 && !loading && this.renderLoadMore()}</View>
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  payouts: state.payment.payouts || [],
  metaPayouts: state.payment.metaPayouts || {},
  loading: state.payment.loading,
});

const mapDispatchToProps = dispatch => ({
  getPayoutsRequest: bindActionCreators(getPayoutsReq, dispatch),
  clearArrayPayoutsRequest: bindActionCreators(clearArrayPayoutsReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayoutsScreen);
