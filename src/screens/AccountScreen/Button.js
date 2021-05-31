import React from 'react';
import { Button, Text, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import styles from './buttonStyle';

const ButtonComponent = ({ children, handleClick, disabled }) => (
  <Button disabled={disabled} style={styles.button} onPress={handleClick}>
    {!disabled ? <Text style={styles.buttonText}>{children}</Text> : <Spinner color="#C0C0C0" />}
  </Button>
);

ButtonComponent.propTypes = {
  children: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  children: 'Ok',
  handleClick: () => {},
  disabled: false,
};

export default ButtonComponent;
