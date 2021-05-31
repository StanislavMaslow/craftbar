import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { View, StatusBar, ScrollView, Platform, Image, Clipboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as Permissions from 'expo-permissions';

import { Container, Input, Form, Item, Label } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getMyUserDataReq, updateUserReq } from '../../redux-controller/user';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import ButtonComponent from './Button';
import Edit from './Edit';
import styles from './styles';

import ApiUtils from '../../api/api-utils';

// const noAva = require('../../../assets/images/no-ava.png');

const url = `${ApiUtils.getImageUrl()}`;

class AccountScreen extends React.Component {
  state = {
    dataForm: {
      lastName: this.props.myUser.data.lastname || '',
      firstName: this.props.myUser.data.firstname || '',
      visibility: this.props.myUser.data.visibility || 'Public',
      description: this.props.myUser.data.bio_information || '',
      userName: this.props.myUser.data.username || '',
      email: this.props.myUser.data.email || '',
      role: this.props.myUser.data.role || '',
      password: '',
    },
    image: this.props.myUser.data.avatar || '',
    isEdit: false,
    fileType: '',
  };

  static propTypes = {
    getUserDataRequest: PropTypes.func,
    updateUserDataRequest: PropTypes.func,
    navigation: PropTypes.objectOf(PropTypes.any),
    myUser: PropTypes.objectOf(PropTypes.any),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    getUserDataRequest: () => {},
    updateUserDataRequest: () => {},
    navigation: {},
    myUser: {},
    isLoading: false,
  };

  componentDidMount() {
    const { getUserDataRequest } = this.props;
    getUserDataRequest();
  }

  handleChange = (value, name) => {
    const { dataForm } = this.state;

    this.setState({
      dataForm: { ...dataForm, [name]: value },
    });
  };

  setIsEdit = isEdit => {
    this.setState({
      isEdit,
    });
  };

  handleEdit = () => {
    this.setIsEdit(true);
  };

  _copyToClipboard = () => {
    const { image } = this.state;
    Clipboard.setString(image);
    // alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);

    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 6],
        quality: 0.2,
      });

      this.handleImagePicked(pickerResult);
    }
  };

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 6],
        quality: 0.2,
      });

      this.handleImagePicked(pickerResult);
    }
  };

  handleImagePicked = async pickerResult => {
    // let uploadResponse;
    // let uploadResult;
    try {
      if (!pickerResult.cancelled) {
        const uriParts = pickerResult.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        this.setState({
          image: pickerResult.uri,
          fileType,
        });
        // uploadResponse = await uploadImageAsync(pickerResult.uri);
        // uploadResult = await uploadResponse.json();
      }
    } catch (e) {
      /* eslint-disable */
      alert('Upload failed, sorry :(');
      /* eslint-enable */
    }
  };

  handleSave = () => {
    const { updateUserDataRequest } = this.props;
    // const data = {};

    const { image, dataForm, fileType } = this.state;

    const {
      lastName,
      firstName,
      visibility,
      description,
      userName,
      email,
      password,
      role,
    } = dataForm;
    const data = new FormData();

    if (password.length > 0) {
      data.append('password', password);
    }

    if (role !== 'Bar') {
      data.append('lastname', lastName);
    }

    if (image.indexOf('file:/') !== -1) {
      data.append('avatar', { uri: image, name: 'avatar', type: `image/${fileType}` });
    } else {
      data.append('avatar', image);
    }

    data.append('firstname', firstName);
    data.append('email', email);
    data.append('bio_information', description);
    data.append('username', userName);
    data.append('visibility', visibility);

    updateUserDataRequest(data);
    this.setIsEdit(true);
  };

  render() {
    const { navigation, isLoading } = this.props;
    const { dataForm, isEdit, image } = this.state;
    const { lastName, firstName, visibility, description, userName, email, role } = dataForm;

    return (
      <Container style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Account" navigation={navigation} />
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={120}
          extraScrollHeight={120}
          enableAutoAutomaticScroll={Platform.OS === 'ios'}
        >
          <ScrollView>
            <View>
              {isEdit ? (
                <Edit
                  {...dataForm}
                  image={image}
                  onChange={this.handleChange}
                  pickImage={this.pickImage}
                />
              ) : (
                <View>
                  <View style={styles.containerForm}>
                    <View style={styles.headerForm}>
                      <View style={styles.containerImage}>
                        <Image
                          source={{
                            uri: image.indexOf('media') === -1 ? image : `${url + image}`,
                            cache: 'reload',
                          }}
                          style={styles.image}
                        />
                      </View>
                      <Form style={styles.form}>
                        {role !== 'Bar' && (
                          <Item floatingLabel style={styles.item}>
                            <Label
                              style={
                                lastName.length > 0
                                  ? [styles.label, { fontSize: 14, top: 6 }]
                                  : styles.label
                              }
                            >
                              Last Name
                            </Label>
                            <Input style={styles.input} value={lastName} editable={false} />
                          </Item>
                        )}
                        <Item floatingLabel style={styles.item}>
                          <Label
                            style={
                              firstName.length > 0
                                ? [styles.label, { fontSize: 14, top: 6 }]
                                : styles.label
                            }
                          >
                            {role === 'Bar' ? 'Name' : 'First Name'}
                          </Label>
                          <Input style={styles.input} value={firstName} editable={false} />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                          <Label
                            style={
                              visibility.length > 0
                                ? [styles.label, { fontSize: 14, top: 6 }]
                                : styles.label
                            }
                          >
                            Visibility
                          </Label>
                          <Input style={styles.input} value={visibility} editable={false} />
                        </Item>
                      </Form>
                    </View>
                    <Form style={styles.form}>
                      <Item floatingLabel style={styles.item}>
                        <Label
                          style={
                            description.length > 0
                              ? [styles.label, { fontSize: 14, top: 6 }]
                              : styles.label
                          }
                        >
                          Short Bio Description
                        </Label>
                        <Input style={styles.input} value={description} editable={false} />
                      </Item>
                      <Item floatingLabel style={styles.item}>
                        <Label
                          style={
                            userName.length > 0
                              ? [styles.label, { fontSize: 14, top: 6 }]
                              : styles.label
                          }
                        >
                          Username
                        </Label>
                        <Input style={styles.input} value={userName} editable={false} />
                      </Item>
                      <Item floatingLabel style={styles.item}>
                        <Label
                          style={
                            email.length > 0
                              ? [styles.label, { fontSize: 14, top: 6 }]
                              : styles.label
                          }
                        >
                          E-mail
                        </Label>
                        <Input style={styles.input} value={email} editable={false} />
                      </Item>
                    </Form>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              {isEdit ? (
                <ButtonComponent disabled={isLoading} handleClick={this.handleSave}>
                  Save
                </ButtonComponent>
              ) : (
                <ButtonComponent handleClick={this.handleEdit}>Edit</ButtonComponent>
              )}
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  myUser: state.user && state.user.myUserData,
  isLoading: state.user && state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  getUserDataRequest: bindActionCreators(getMyUserDataReq, dispatch),
  updateUserDataRequest: bindActionCreators(updateUserReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
