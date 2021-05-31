import React from 'react';
import { StatusBar, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import styles from './styles';

import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

const AboutScreen = ({ navigation }) => {
  const handleOpenBrowser = async () => {
    await WebBrowser.openBrowserAsync('https://www.thecraftybarkeep.com/contacts/');
  };
  return (
    <Container>
      {Platform.OS === 'ios' ? (
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor="#000" barStyle="light-content" />
      )}
      <ScreenHeader target="" title="About and Help" navigation={navigation} />
      <Content>
        <List>
          <ListItem onPress={handleOpenBrowser}>
            <Left>
              <Text style={styles.textRow}>Help Center</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('ReportProblemScreen')}>
            <Left>
              <Text style={styles.textRow}>Report a Problem</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            <Left>
              <Text style={styles.textRow}>Privacy Policy</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('TermsOfUseScreen')}>
            <Left>
              <Text style={styles.textRow}>Terms of Use</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
      <ScreenFooter navigation={navigation} />
    </Container>
  );
};

AboutScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

AboutScreen.defaultProps = {
  navigation: {},
};

export default AboutScreen;
