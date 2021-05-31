import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Form, Item, Input, Label, Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class AutocompleteAddItems extends Component {
  static propTypes = {
    actionRequest: PropTypes.func,
    handleGetItems: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any),
    ititialData: PropTypes.arrayOf(PropTypes.any),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    actionRequest: () => {},
    handleGetItems: () => {},
    data: [],
    ititialData: [],
    isLoading: false,
  };

  state = {
    people: [],
    isShowList: false,
    text: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ititialData.length && !prevState.people.length) {
      nextProps.handleGetItems(nextProps.ititialData);
      return {
        people: nextProps.ititialData,
        // query: nextProps.initialBarName,
      };
    }

    return null;
  }

  handleChoosePerson = person => {
    const { people } = this.state;
    const { handleGetItems } = this.props;

    const isSameName = people.some(item => item.id === person.id);
    if (isSameName) {
      Alert.alert('You already add this person');
      return;
    }
    this.setState(state => {
      handleGetItems([...state.people, person]);

      return {
        people: [...state.people, person],
      };
    });
  };

  handleDeletePerson = id => {
    const { handleGetItems } = this.props;

    this.setState(state => {
      handleGetItems(state.people.filter(person => person.id !== id));

      return {
        people: state.people.filter(person => person.id !== id),
      };
    });
  };

  handleChangeText = text => {
    const { actionRequest } = this.props;
    this.setState({
      text,
    });

    setTimeout(() => actionRequest(text), 400);
  };

  handleFocus = () => {
    const { actionRequest } = this.props;
    actionRequest('a');

    this.setState({
      isShowList: true,
    });
  };

  handleClose = () => {
    this.setState({
      isShowList: false,
      text: '',
    });
  };

  render() {
    const { people, isShowList, text } = this.state;
    const { data, isLoading } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.tagsContainer}>
          {people.map(person => (
            <View key={person.id} style={styles.tag}>
              <Text style={styles.tagText}>
                {person.firstname} {person.lastname[0]}.
              </Text>
              <TouchableOpacity onPress={() => this.handleDeletePerson(person.id)}>
                <Icon style={styles.iconClose} type="MaterialIcons" name="close" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={{ top: 0, paddingTop: 7 }}>Add People</Label>
            <Input
              onChangeText={inputText => this.handleChangeText(inputText)}
              onFocus={this.handleFocus}
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

            {data.slice(0, 9).map(person => (
              <TouchableOpacity
                style={styles.item}
                key={person.id}
                onPress={() => {
                  this.handleClose();
                  this.handleChoosePerson(person);
                }}
              >
                <Text style={styles.itemText}>
                  {person.lastname} {person.firstname}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default AutocompleteAddItems;
