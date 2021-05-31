import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  ActivityIndicator,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  Clipboard,
  Image,
  Share,
  StyleSheet,
  Alert,
} from 'react-native';

import * as Sharing from 'expo-sharing';

import { Container, Text, Input, Form, Item, Label, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconMt from 'react-native-vector-icons/MaterialIcons';
// import IconEn from 'react-native-vector-icons/Entypo';

import Autocomplete from '../../commons/Aucomplete';
import AutocompleteAddItems from '../../commons/AutocompleteAddItems';

import {
  addPostReq,
  getCheckInReq,
  editPostReq,
  getSearchPeopleReq,
} from '../../redux-controller/post';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import styles from './styles';
import { getMyUserDataReq } from '../../redux-controller/user';
import { OpenSans18pt } from '../../utils/variables';
import ApiUtils from '../../api/api-utils';

const defaultImage = require('../../../assets/images/post1.jpg');

const baseUrl = `${ApiUtils.getImageUrl()}`;

class AddPostScreen extends React.Component {
  static propTypes = {
    addPostRequest: PropTypes.func,
    getMyUserDataRequest: PropTypes.func,
    getCheckInRequest: PropTypes.func,
    editPostRequest: PropTypes.func,
    getSearchPeopleRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    myUser: PropTypes.objectOf(PropTypes.any),
    checkIn: PropTypes.arrayOf(PropTypes.any),
    unRead: PropTypes.arrayOf(PropTypes.any),
    people: PropTypes.arrayOf(PropTypes.any),
    isCheckInLoading: PropTypes.bool,
    isPeopleLoading: PropTypes.bool,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    addPostRequest: () => {},
    getMyUserDataRequest: () => {},
    getCheckInRequest: () => {},
    editPostRequest: () => {},
    getSearchPeopleRequest: () => {},
    navigation: {},
    myUser: {},
    checkIn: [],
    people: [],
    unRead: [],
    isCheckInLoading: false,
    isPeopleLoading: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      fileType: '',
      uploading: false,
      message: '',
      barId: null,
      isEdit: false,
      usersId: {},
      barName: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.navigation.state.params && prevState.barId === null) {
      const { post } = nextProps.navigation.state.params;
      return {
        message: post.message || '',
        barId: post.bar_id || '',
        image: post.media ? `${baseUrl}${post.media}` : 'notImage',
        isEdit: true,
        withPeople: post.with,
      };
    }

    return null;
  }

  componentDidMount() {
    const { getMyUserDataRequest } = this.props;
    getMyUserDataRequest();
  }
  /* eslint-disable */
  maybeRenderImage = () => {
    const { image } = this.state;

    if (!image) {
      return;
    }

    return (
      <View style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this.share}
          style={styles.maybeRenderImageText}
        >
          {image}
        </Text>
      </View>
    );
  };
  /* eslint-enable */

  maybeRenderUploadingOverlay = () => {
    const { uploading } = this.state;
    if (uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
    return <View />;
  };

  share = () => {
    const { image } = this.state;
    Share.share({
      message: image,
      title: 'Check out this photo',
      url: image,
    });
  };

  _copyToClipboard = () => {
    const { image } = this.state;
    Clipboard.setString(image);
    // alert('Copied image URL to clipboard');
  };

  takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);

    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0.1,
      });

      this.handleImagePicked(pickerResult);
    }
  };

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll...
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 3],
        quality: 0.1,
        mediaTypes: 'All',
      });

      this.handleImagePicked(pickerResult);
    }
  };

  handleImagePicked = async pickerResult => {
    // let uploadResponse;
    // let uploadResult;

    try {
      this.setState({
        uploading: true,
      });

      if (!pickerResult.cancelled) {
        const uriParts = pickerResult.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        // uploadResponse = await uploadImageAsync(pickerResult.uri);
        // uploadResult = await uploadResponse.json();

        this.setState({
          image: pickerResult.uri,
          fileType,
        });
      }
    } catch (e) {
      /* eslint-disable */
      alert('Upload failed, sorry :( ');
      /* eslint-enable */
    } finally {
      this.setState({
        uploading: false,
      });
    }
  };

  addPost = () => {
    const { addPostRequest, myUser } = this.props;
    const { image, barId, message, usersId, fileType, barName } = this.state;
    if (!message) {
      Alert.alert('Please add your message!');
      return;
    }
    const { role } = myUser;
    const data = new FormData();
    if (image) {
      data.append('media', { uri: image, name: 'image', type: `image/${fileType}` });
    }
    if (barId) {
      data.append('bar_id', barId);
    }
    data.append('bar_name', barName);
    data.append('role', role);
    data.append('message', message);

    for (const key in usersId) {
      data.append(key, usersId[key]);
    }
    addPostRequest(data);
  };

  handleSetBarId = ({ id }) => {
    this.setState({
      barId: id,
    });
  };

  editPost = () => {
    const { myUser, editPostRequest, navigation } = this.props;
    const post = navigation.getParam('post', {});
    const { id } = post;
    const { image, barId, message, usersId, fileType, barName } = this.state;

    if (!message) {
      Alert.alert('Please add your message!');
      return;
    }
    const { role } = myUser;
    const data = new FormData();

    if (image.indexOf('file:/') !== -1) {
      data.append('media', { uri: image, name: 'image', type: `image/${fileType}` });
    } else {
      data.append('media', image);
    }

    if (barId) {
      data.append('bar_id', barId);
    }
    data.append('bar_name', barName);
    data.append('role', role);
    data.append('message', message);

    for (const key in usersId) {
      data.append(key, usersId[key]);
    }

    editPostRequest({ id, data });
  };

  sharePost = async () => {
    const { message, image } = this.state;

    if (Platform.OS === 'android' && image) {
      const options = { dialogTitle: 'The Crafty Barkeep', UTI: 'The Crafty Barkeep' };

      Sharing.shareAsync(image, options);
    } else {
      try {
        const result = await Share.share({
          message,
          url: image,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  handleGetWithUser = people => {
    const users = {};

    people.forEach((person, index) => {
      users[`with_user[${index}]`] = person.id;
    });

    this.setState({
      usersId: users,
      withPeople: [],
    });
  };

  handleSetBarName = barName => {
    this.setState({
      barName,
      barId: null,
    });
  };

  render() {
    const { image, message, isEdit, withPeople } = this.state;
    const {
      navigation,
      checkIn,
      isCheckInLoading,
      getCheckInRequest,
      unRead,
      loading,
      getSearchPeopleRequest,
      people,
      isPeopleLoading,
    } = this.props;
    const post = navigation.getParam('post', {});
    const { bar_name: barName } = post;

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="New Post" navigation={navigation} />

        {/* <View style={styles.containerEx}>
          <Button
          onPress={this.pickImage}
          title="Pick an image from camera roll"
          >
          <Text>Pick an image from camera roll</Text>
          </Button>


          <Text style={styles.exampleText}>
          Example: Upload ImagePicker result
          </Text>

          {this.maybeRenderImage()}
          {this.maybeRenderUploadingOverlay()}
        </View> */}
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={120}
          extraScrollHeight={120}
          enableAutoAutomaticScroll={Platform.OS === 'ios'}
        >
          <ScrollView>
            <View style={styles.column}>
              <View style={styles.addPhotoContainer}>
                <TouchableOpacity onPress={this.pickImage} style={styles.addPhotoButton}>
                  <IconMt size={27} style={styles.pinIcon} name="photo-library" />
                  <Text style={[styles.addPhotoButtonText, OpenSans18pt]}>Browse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.takePhoto} style={styles.addPhotoButton}>
                  <IconMt size={27} style={styles.pinIcon} name="photo-camera" />
                  <Text style={[styles.addPhotoButtonText, OpenSans18pt]}>Camera</Text>
                </TouchableOpacity>
              </View>
              {!!image && (
                <View style={styles.imageContainer}>
                  <Image
                    source={image === 'notImage' ? defaultImage : { uri: image }}
                    style={styles.maybeRenderImage}
                  />
                </View>
              )}
              <Form style={styles.inputSection}>
                <Autocomplete
                  label="Search Bar"
                  actionRequest={getCheckInRequest}
                  isLoading={isCheckInLoading}
                  data={checkIn}
                  handleSetBarId={this.handleSetBarId}
                  initialValue={barName}
                  handleSetBarName={this.handleSetBarName}
                  isIcon
                />
                <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Tell us what you think ...</Label>
                    <Input
                      style={styles.input}
                      floatingLabel
                      underline
                      placeholderTextColor="#999999"
                      selectionColor="#000"
                      value={message}
                      onChangeText={text => this.setState({ message: text })}
                    />
                  </Item>
                </View>
                {/* <View style={styles.inputContainer}>
                  <Item floatingLabel>
                    <Label>Add People</Label>
                    <Input
                      style={styles.input}
                      underline
                      placeholderTextColor="#999999"
                      
                      selectionColor="#000"
                    />
                  </Item>
                </View> */}
                <AutocompleteAddItems
                  actionRequest={getSearchPeopleRequest}
                  data={people}
                  ititialData={withPeople}
                  isLoading={isPeopleLoading}
                  handleGetItems={this.handleGetWithUser}
                />
                {/* <View style={styles.shareOnMediaContainer}>
                  <View style={styles.socialIconsContainer}>
                    <Button onPress={this.sharePost} style={styles.socialButton}>
                      <Text style={styles.socialButtonText}>Share on Social Media</Text>
                    </Button>
                  </View>
                </View> */}
              </Form>
              <View style={{ flex: 0.5 }} />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        {!isEdit ? (
          <ScreenFooter
            navigation={navigation}
            addPostScreen
            addPost={this.addPost}
            unRead={unRead}
            isLoading={loading}
          />
        ) : (
          <ScreenFooter
            navigation={navigation}
            isEditPostScreen
            editPost={this.editPost}
            unRead={unRead}
            isLoading={loading}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  myUser: state.user.myUserData.data || {},
  unRead: (state.notifications && state.notifications.unRead.data) || [],
  checkIn: state.posts.checkIn || [],
  people: state.posts.people || [],
  isPeopleLoading: state.posts.isPeopleLoading,
  isCheckInLoading: state.posts.isCheckInLoading,
  loading: state.posts.loading,
});

const mapDispatchToProps = dispatch => ({
  addPostRequest: bindActionCreators(addPostReq, dispatch),
  getCheckInRequest: bindActionCreators(getCheckInReq, dispatch),
  getMyUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
  editPostRequest: bindActionCreators(editPostReq, dispatch),
  getSearchPeopleRequest: bindActionCreators(getSearchPeopleReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostScreen);
