import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import styles from './editStyle';

class Input extends React.Component {
  state = {
    isShowInput: false,
  };

  setIsShowInput = () => {
    this.setState({
      isShowInput: true,
    });
  };

  setIsHideInput = () => {
    this.setState({
      isShowInput: false,
    });
  };

  render() {
    const { value, label, placeholder, isPassword, onChange, name } = this.props;
    const { isShowInput } = this.state;

    return (
      <View style={styles.containerChangePersonalData}>
        <View style={{ marginLeft: 35 }}>
          <Text style={styles.labelInput}>{label}</Text>
          {!isShowInput && (
            <View>
              {isPassword ? (
                <TouchableOpacity onPress={this.setIsShowInput}>
                  {!isPassword && <Text style={styles.change}> (Change)</Text>}
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.currentValue}>{value}</Text>
                  <TouchableOpacity onPress={this.setIsShowInput}>
                    <Text style={styles.change}> (Change) </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          <View>
            {isPassword && !isShowInput && (
              <TouchableOpacity onPress={this.setIsShowInput}>
                <Text style={[styles.changePassword, styles.change]}>ChangePassword</Text>
              </TouchableOpacity>
            )}
          </View>
          {isShowInput && (
            <View style={styles.containerInput}>
              <TextInput
                placeholderTextColor="rgb(217, 217, 217)"
                placeholder={placeholder}
                style={styles.inputPersonal}
                value={value}
                onChangeText={text => onChange(text, name)}
              />
              <View style={styles.button}>
                <TouchableOpacity onPress={this.setIsHideInput}>
                  <Icon style={styles.iconCheck} type="MaterialIcons" name="check" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  isPassword: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  name: '',
  isPassword: false,
  onChange: () => {},
};

export default Input;
