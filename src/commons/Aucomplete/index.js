import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Form, Item, Input, Label, Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class AutocompleteAddItems extends Component {
  static propTypes = {
    actionRequest: PropTypes.func,
    handleSetBarId: PropTypes.func,
    handleSetBarName: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any),
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    initialValue: PropTypes.string,
  };

  static defaultProps = {
    actionRequest: () => {},
    handleSetBarId: () => {},
    handleSetBarName: () => {},
    data: [],
    isLoading: false,
    label: 'Choose item',
    initialValue: '',
  };

  state = {
    isShowList: false,
    text: this.props.initialValue || '',
  };

  handleChooseBar = bar => {
    const { handleSetBarId } = this.props;
    const { text } = this.state;

    this.setState({
      text: bar.bar_name,
      isShowList: false,
    });
    handleSetBarId(bar, text);
  };

  handleChangeText = text => {
    const { actionRequest, handleSetBarName, data } = this.props;
    handleSetBarName(text);
    if (text === '') {
      this.setState({
        text: '',
        isShowList: false,
      });
      data.length = 0;
      return;
    }
    this.setState({
      text,
      isShowList: true,
    });

    setTimeout(() => actionRequest(text), 400);
  };

  // handleFocus = () => {
  //   const { actionRequest } = this.props;
  //   actionRequest('a');

  //   this.setState({
  //     isShowList: true,
  //   });
  // };

  handleClearInput = () => {
    this.setState({
      text: '',
    });

    this.inputNativeBase._root.focus();
  };

  handleClose = () => {
    this.setState({
      isShowList: false,
    });
  };

  render() {
    const { isShowList, text } = this.state;
    const { data, isLoading, label } = this.props;

    return (
      <View style={styles.container}>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={{ top: 0, paddingTop: 7 }}>{label}</Label>
            <Input
              onChangeText={inputText => this.handleChangeText(inputText)}
              // onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              value={text}
            />
          </Item>
          {isLoading && <Spinner color="grey" size="small" style={styles.spinner} />}
        </Form>
        {isShowList && data.length !== 0 && (
          <View style={styles.listPeople}>
            <TouchableOpacity style={styles.closeList} onPress={this.handleClose}>
              <Icon type="MaterialIcons" name="close" />
         </TouchableOpacity>

            {data.slice(0, 9).map(bar => (
              <TouchableOpacity
                style={styles.item}
                key={bar.id}
                onPress={() => {
                  this.handleClose();
                  this.handleChooseBar(bar);
                }}
              >
                <Text style={styles.itemText}>{bar.bar_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default AutocompleteAddItems;
