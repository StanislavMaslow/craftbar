import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform, Image, TouchableOpacity, Alert } from 'react-native';
import { Container, Text, Icon, ActionSheet } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconMa from 'react-native-vector-icons/MaterialIcons';

import With from '../../commons/With';
import {
  getPostDataReq,
  postToggleLikeReq,
  sharePostReq,
  reportPostReq,
} from '../../redux-controller/post';
import { getCommentsReq } from '../../redux-controller/comment';
import { getMyUserDataReq } from '../../redux-controller/user';
import ScreenHeader from '../../commons/ScreenHeader';
import Loader from '../../commons/Loader';
// import ScreenFooter from '../../commons/ScreenFooter';
import ApiUtils from '../../api/api-utils';
import styles from './styles';
import Comments from './Comments';

const url = `${ApiUtils.getImageUrl()}`;

const BUTTONS = [
  'Nudity',
  'Violence',
  'Harassment',
  'Suicide or Self-Injury',
  'Terrorism',
  'Gross Content',
  'Cancel',
];
// var DESTRUCTIVE_INDEX = 7;
const CANCEL_INDEX = 6;
class PostScreen extends React.Component {
  static propTypes = {
    getPostDataRequest: PropTypes.func,
    postData: PropTypes.objectOf(PropTypes.any),
    navigation: PropTypes.objectOf(PropTypes.any),
    isLoading: PropTypes.bool,
    getCommentsRequest: PropTypes.func,
    getMyUserDataRequest: PropTypes.func,
    postToggleLikeRequest: PropTypes.func,
    sharePostRequest: PropTypes.func,
    reportPostRequest: PropTypes.func,
  };

  static defaultProps = {
    getCommentsRequest: () => {},
    getMyUserDataRequest: () => {},
    getPostDataRequest: () => {},
    postToggleLikeRequest: () => {},
    postData: {},
    navigation: {},
    isLoading: false,
    sharePostRequest: () => {},
    reportPostRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // image: '',
    };
  }

  componentDidMount() {
    const { getPostDataRequest, navigation, getCommentsRequest, getMyUserDataRequest } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

    getPostDataRequest(itemId);

    getMyUserDataRequest('user detail');
    getCommentsRequest(itemId);
  }

  handleSharePost = id => {
    const { sharePostRequest } = this.props;
    Alert.alert(
      'Would you like to share this post on your page?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => sharePostRequest(id, 'posts') },
      ],
      { cancelable: false }
    );
  };

  openReportPopUp = (option, id) => {
    const { reportPostRequest } = this.props;
    if (option !== 'Cancel') {
      const type = new FormData();
      type.append('type', option);
      const data = {
        id,
        type,
      };
      console.log('Clicked on popup', option);
      reportPostRequest(data);
    }
  };

  render() {
    const { navigation, postData, isLoading, postToggleLikeRequest } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const { comments, likes, created_at: createdAt, shares, message, id } = postData;
    const isPost = true;
    return (
      <Container style={styles.wrapper}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader title="Back" navigation={navigation} />
        {isLoading ? (
          <Loader />
        ) : (
          <KeyboardAwareScrollView enableOnAndroid extraHeight={135} extraScrollHeight={135}>
            <View style={{ zIndex: 1 }}>
              {message && (
                <View style={postData.media ? styles.container : styles.noImagePostContainer}>
                  {postData.media && (
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{ uri: `${url + postData.media}` }}
                    />
                  )}

                  <View style={styles.infoContainer}>
                    <View style={postData.media ? styles.byContainer : styles.noImageByContainer}>
                      <Text style={styles.byText}>
                        By{' '}
                        <Text style={styles.name}>
                          {postData.posted_by[0].firstname} {postData.posted_by[0].lastname}
                        </Text>
                      </Text>
                      <Text style={styles.timeAgo}>{createdAt}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                      <TouchableOpacity onPress={() => postToggleLikeRequest(id, isPost)}>
                        <View style={styles.callInfo}>
                          <Icon style={styles.icon} name="glass" type="FontAwesome" />
                          <Text style={styles.number}>{likes}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.callInfo}>
                        <Icon style={styles.icon} name="message-square" type="Feather" />
                        <Text style={styles.number}>{comments}</Text>
                      </View>
                      <TouchableOpacity onPress={() => this.handleSharePost(id)}>
                        <View style={styles.callInfo}>
                          <Icon style={styles.icon} name="share-2" type="Feather" />
                          <Text style={styles.number}>{shares}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          ActionSheet.show(
                            {
                              options: BUTTONS,
                              cancelButtonIndex: CANCEL_INDEX,
                              // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                              title: 'Report this post because of:',
                            },
                            buttonIndex => {
                              this.openReportPopUp(BUTTONS[buttonIndex], id);
                            }
                          )
                        }
                      >
                        <IconMa size={20} active name="report" style={styles.reportIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              <With navigation={navigation} marginLeft={21} post={postData} />
              <View style={styles.description}>
                <Text style={styles.restText}> {message}</Text>
              </View>

              <View style={styles.border} />

              {itemId && <Comments navigation={navigation} id={itemId} />}
            </View>
          </KeyboardAwareScrollView>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  postData: state.posts && state.posts.post.data,
  isLoading: state.posts.isPostLoading,
});

const mapDispatchToProps = dispatch => ({
  getPostDataRequest: bindActionCreators(getPostDataReq, dispatch),
  getCommentsRequest: bindActionCreators(getCommentsReq, dispatch),
  getMyUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
  postToggleLikeRequest: bindActionCreators(postToggleLikeReq, dispatch),
  sharePostRequest: bindActionCreators(sharePostReq, dispatch),
  reportPostRequest: bindActionCreators(reportPostReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostScreen);
