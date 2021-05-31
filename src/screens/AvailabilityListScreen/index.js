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
  RefreshControl,
} from 'react-native';
import { Container, Text, Icon } from 'native-base';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import styles from './styles';
import { getAvailabilityReq } from '../../redux-controller/user';
import Loader from '../../commons/Loader';

import Availability from './Availability';

class AvailabilityListScreen extends React.Component {
  static propTypes = {
    getAvailabilityRequest: PropTypes.func,
    availability: PropTypes.arrayOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    getAvailabilityRequest: () => {},
    availability: [],
    navigation: {},
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      // barId: null,
    };
  }

  componentDidMount() {
    const { getAvailabilityRequest } = this.props;
    getAvailabilityRequest();
  }

  refresh = () => {
    const { getAvailabilityRequest } = this.props;
    getAvailabilityRequest();
  };

  render() {
    const { availability, navigation, loading } = this.props;
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
        <ScreenHeader target="SettingsScreen" title="Availability List" navigation={navigation} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} />}
        >
          <View>
            {availability &&
              availability.map(item => {
                const key = Object.keys(item);
                return (
                  <TouchableOpacity
                    key={item[key[0]].id}
                    onPress={() => {
                      navigation.navigate('AvailabilityScreen', { item: item[key[0]] });
                    }}
                  >
                    <Availability name={key[0]} item={item[key[0]]} />
                  </TouchableOpacity>
                );
              })}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AvailabilityScreen');
            }}
          >
            <View style={styles.addNewContainer}>
              <Text style={styles.addNewText}>Add new</Text>
              <Icon style={styles.addNewIcon} type="Ionicons" name="ios-arrow-forward" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 0.5 }} />
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  availability: state.user.availability.data || [],
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  getAvailabilityRequest: bindActionCreators(getAvailabilityReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailabilityListScreen);
