import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { H3 } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';
import Label from './label';

export default class Labels extends React.Component {
  state = {
    labelValue: 'Nobody',
  };

  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  };

  static defaultProps = {
    labels: [],
    title: '',
  };

  handleSetLabelValue = value => {
    this.setState({
      labelValue: value,
    });
  };

  render() {
    const { labels, title } = this.props;
    const { labelValue } = this.state;

    return (
      <View style={{ marginTop: title === 'Posts' ? 14 : 35 }}>
        <H3 style={styles.h3}>{title}</H3>
        {labels.map((label, item) => (
          <TouchableOpacity key={label} onPress={() => this.handleSetLabelValue(label)}>
            <Label label={label} item={item} labelValue={labelValue} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
