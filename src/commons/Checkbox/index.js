import React from 'react';
/* eslint-disable */
import CheckBox from 'react-native-check-box';
/* eslint-enable */
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

import styles from './styles';

class CheckboxComponent extends React.Component {
  state = {
    isChecked: false,
  };

  static propTypes = {
    label: PropTypes.string,
    isCheck: PropTypes.bool,
    handleChecked: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    isCheck: false,
    handleChecked: () => {},
  };

  componentDidMount() {
    const { isCheck } = this.props;

    this.setState({
      isChecked: isCheck,
    });
  }

  setIsChecked = () => {
    const { handleChecked } = this.props;
    const { isChecked } = this.state;

    this.setState(state => ({
      isChecked: !state.isChecked,
    }));

    handleChecked(!isChecked);
  };

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;

    return (
      <CheckBox
        style={{ width: 250, paddingTop: 10, paddingBottom: 10 }}
        onClick={this.setIsChecked}
        isChecked={isChecked}
        rightText={label}
        checkedCheckBoxColor="red"
        rightTextStyle={{
          fontSize: 14,
          opacity: 0.6,
          fontFamily: 'OpenSansRegular',
        }}
        checkedImage={<Icon style={styles.icon} type="MaterialIcons" name="radio-button-checked" />}
        unCheckedImage={
          <Icon style={styles.icon} type="MaterialIcons" name="radio-button-unchecked" />
        }
      />
    );
  }
}

export default CheckboxComponent;
