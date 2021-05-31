import React from 'react';
import PropTypes from 'prop-types';
import { Header, Body, Left, Right, Icon, Title, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';
import SettingButton from '../SettingButton';
import styles from './styles';

const ScreenHeader = ({ navigation, title, target }) => (
  <Header androidStatusBarColor="#000" style={styles.header}>
    <Left>
      <Button
        transparent
        onPress={() => {
          if (target) {
            return navigation.navigate(target);
          }
          return navigation.dispatch(NavigationActions.back());
        }}
      >
        <Icon style={styles.blackIcon} fontSize={16} name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title style={styles.title}>{title}</Title>
    </Body>
    <Right>{title !== 'Settings' && <SettingButton navigation={navigation} isHeader />}</Right>
  </Header>
);

ScreenHeader.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
  target: PropTypes.string,
};
ScreenHeader.defaultProps = {
  navigation: {},
  title: '',
  target: '',
};

export default ScreenHeader;
