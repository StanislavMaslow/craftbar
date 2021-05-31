import React, { Component } from 'react';
import { StatusBar, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content, View, Text, Input, Button } from 'native-base';
import { postReportRequest } from '../../redux-controller/user';
import styles from './styles';
import ScreenHeader from '../../commons/ScreenHeader';

class ReportProblemScreen extends Component {
  static propTypes = {
    postReport: PropTypes.func,
    loading: PropTypes.bool,
    navigation: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    postReport: () => {},
    loading: false,
    navigation: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  postReportProblem = () => {
    const { postReport } = this.props;
    const { message } = this.state;

    const data = new FormData();

    data.append('message', message);

    postReport(data);
  };

  loadingAnimation() {
    const { loading } = this.state;
    return (
      <Button title="Loading" style={styles.button} disabled={loading}>
        <ActivityIndicator style={{ flex: 1 }} size="small" />
      </Button>
    );
  }

  postBtn() {
    const { loading } = this.state;
    return (
      <Button
        title="Post"
        style={styles.button}
        /* eslint-disable */
        onPress={this.postReportProblem.bind(this)}
        /* eslint-enable */
        disabled={loading}
      >
        <Text style={styles.buttonText} uppercase={false}>
          Send Report
        </Text>
      </Button>
    );
  }

  render() {
    const { navigation, loading } = this.props;
    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Report a Problem" navigation={navigation} />
        <Content>
          <Text style={styles.textRow}>
            Briefly explain what happened. (max. number of char. 500)
          </Text>
          <View>
            <Input
              style={styles.input}
              multiline
              onChangeText={message => this.setState({ message })}
              editable={!loading}
              maxLength={500}
              numberOfLines={8}
            />
          </View>
          <View>{loading ? this.loadingAnimation() : this.postBtn()}</View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  postReport: bindActionCreators(postReportRequest, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportProblemScreen);
