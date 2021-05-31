import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { Input, Form, Item, Label, Picker, Icon } from 'native-base';
import PropTypes from 'prop-types';

import ApiUtils from '../../api/api-utils';
import MyInput from './MyInput';

import styles from './styles';
import stylesEdit from './editStyle';

const url = `${ApiUtils.getImageUrl()}`;

class Edit extends Component {
  state = {
    isFocus: false,
    inputName: '',
  };

  static propTypes = {
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    visibility: PropTypes.string,
    description: PropTypes.string,
    userName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
    onChange: PropTypes.func,
    pickImage: PropTypes.func,
  };

  static defaultProps = {
    lastName: '',
    firstName: '',
    visibility: '',
    description: '',
    userName: '',
    email: '',
    image: '',
    password: '',
    role: '',
    onChange: () => {},
    pickImage: () => {},
  };

  handleFocus = inputName => {
    this.setState({
      isFocus: true,
      inputName,
    });
  };

  handleBlur = () => {
    this.setState({
      isFocus: false,
    });
  };

  render() {
    const {
      lastName,
      firstName,
      visibility,
      description,
      userName,
      email,
      password,
      onChange,
      pickImage,
      image,
      role,
    } = this.props;

    const { inputName, isFocus } = this.state;

    return (
      <View>
        <View style={styles.containerForm}>
          <View style={styles.headerForm}>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.containerImage}>
                <Image
                  source={{
                    uri: image.indexOf('media') === -1 ? image : `${url + image}`,
                    cache: 'reload',
                  }}
                  style={stylesEdit.image}
                />
                <View style={styles.opacityImageContainer}>
                  <Icon style={styles.addIconImage} type="Ionicons" name="md-add" />
                </View>
              </View>
            </TouchableOpacity>
            <Form style={stylesEdit.form}>
              {role !== 'Bar' && (
                <Item
                  floatingLabel
                  style={
                    (isFocus && inputName === 'lastName') || lastName.length > 0
                      ? [stylesEdit.item, stylesEdit.itemIsFocus]
                      : [stylesEdit.item]
                  }
                >
                  <Label
                    style={
                      (isFocus && inputName === 'lastName') || lastName.length > 0
                        ? [stylesEdit.label, stylesEdit.labelIsFocus]
                        : stylesEdit.label
                    }
                  >
                    Last Name
                  </Label>
                  <Input
                    style={styles.input}
                    value={lastName}
                    onChangeText={text => onChange(text, 'lastName')}
                    onFocus={() => this.handleFocus('lastName')}
                    onBlur={() => this.handleBlur()}
                  />
                </Item>
              )}
              <Item
                floatingLabel
                style={
                  (isFocus && inputName === 'firstName') || firstName.length > 0
                    ? [stylesEdit.item, stylesEdit.itemIsFocus]
                    : stylesEdit.item
                }
              >
                <Label
                  style={
                    (isFocus && inputName === 'firstName') || firstName.length > 0
                      ? [stylesEdit.label, stylesEdit.labelIsFocus]
                      : stylesEdit.label
                  }
                >
                  {role === 'Bar' ? 'Name' : 'First Name'}
                </Label>
                <Input
                  style={styles.input}
                  value={firstName}
                  onChangeText={text => onChange(text, 'firstName')}
                  onFocus={() => this.handleFocus('firstName')}
                  onBlur={() => this.handleBlur()}
                />
              </Item>
              <View style={stylesEdit.containerPicker}>
                <Text style={stylesEdit.labelPicker}>Visibility</Text>

                <Picker
                  mode="dropdown"
                  iosHeader="Select your profile"
                  iosIcon={
                    <Icon name="ios-arrow-down" style={{ fontSize: 12, left: -20, top: 3 }} />
                  }
                  style={{
                    width: 120,
                    marginLeft: Platform.OS === 'ios' ? -16 : -8,
                    marginTop: -10,
                  }}
                  selectedValue={visibility}
                  textStyle={{ fontSize: 18 }}
                  onValueChange={text => onChange(text, 'visibility')}
                >
                  <Picker.Item label="Private" value="Private" />
                  <Picker.Item label="Public" value="Public" />
                </Picker>
              </View>
            </Form>
          </View>
          <Form style={[styles.form, { width: 305, marginTop: 10 }]}>
            <Item
              floatingLabel
              style={
                (isFocus && inputName === 'description') || description.length > 0
                  ? [stylesEdit.item, stylesEdit.itemIsFocus]
                  : stylesEdit.item
              }
            >
              <Label
                style={
                  (isFocus && inputName === 'description') || description.length > 0
                    ? [stylesEdit.label, stylesEdit.labelIsFocus]
                    : stylesEdit.label
                }
              >
                Short Description (Bio)
              </Label>
              <Input
                style={styles.input}
                value={description}
                onChangeText={text => onChange(text, 'description')}
                onFocus={() => this.handleFocus('description')}
                onBlur={() => this.handleBlur()}
              />
            </Item>
          </Form>
        </View>
        <View style={stylesEdit.myInputContainer}>
          <MyInput
            label="Username"
            name="userName"
            onChange={onChange}
            value={userName}
            placeholder="New Username"
          />
          <MyInput
            bordered
            label="E-mail"
            name="email"
            onChange={onChange}
            value={email}
            placeholder="New E-mail"
          />
          <MyInput
            bordered
            isPassword
            name="password"
            value={password}
            onChange={onChange}
            label="Password"
            placeholder="New Password"
          />
        </View>
      </View>
    );
  }
}

export default Edit;
