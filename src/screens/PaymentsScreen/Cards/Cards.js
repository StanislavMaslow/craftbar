import React from 'react';

import { View, ScrollView, Alert } from 'react-native';
import { Container, Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../../commons/ScreenHeader';
import ScreenFooter from '../../../commons/ScreenFooter';
import Card from './Card';
import Loader from '../../../commons/Loader';

import { getCardsReq, deleteCardReq, postSelectCardReq } from '../../../redux-controller/payment';

import styles from './cardsStyles';

const renderCards = (
  isLoading,
  cards,
  handleDeleteCard,
  handleSelectStatusCard,
  isSelectCardLoader
) => {
  if (cards.length > 0 && !isLoading) {
    return (
      <View>
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            handleDeleteCard={handleDeleteCard}
            handleSelectStatusCard={handleSelectStatusCard}
            isSelectCardLoader={isSelectCardLoader}
          />
        ))}
      </View>
    );
  }
  return (
    <View style={styles.messageNotCardsContainer}>
      <Text style={styles.messageNotCards}>You don&#180;t have any credit cards</Text>
    </View>
  );
};

class Cards extends React.Component {
  state = {};

  componentDidMount() {
    const { getCardsRequest } = this.props;
    getCardsRequest();
  }

  handleSelectStatusCard = id => {
    const { postSelectCardRequest } = this.props;

    Alert.alert(
      'Are you sure that you want to set this card as default ?',
      '',
      [
        { text: 'No', onPress: () => null },
        { text: 'Yes', onPress: () => postSelectCardRequest(id) },
      ],
      { cancelable: false }
    );
  };

  handleDeleteCard = id => {
    const { deleteCardRequest } = this.props;

    Alert.alert(
      'Are you sure that you want to delete this card ?',
      '',
      [{ text: 'No', onPress: () => null }, { text: 'Yes', onPress: () => deleteCardRequest(id) }],
      { cancelable: false }
    );
  };

  renderCardsComponent = () => {
    const { navigation, cards, isLoading, isSelectCardLoader } = this.props;

    if (isLoading) {
      return (
        <Container style={styles.containerLoader}>
          <Loader />
        </Container>
      );
    }

    return (
      <Container>
        <Header targetcontainer="SettingsScreen" title="Cards" navigation={navigation} />
        <ScrollView>
          {renderCards(
            isLoading,
            cards,
            this.handleDeleteCard,
            this.handleSelectStatusCard,
            isSelectCardLoader
          )}
          <Button
            full
            style={styles.button}
            onPress={() => navigation.navigate('AddCreditCardScreen')}
          >
            <Text style={styles.buttonText}>Add new card</Text>
          </Button>
        </ScrollView>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  };

  render() {
    return this.renderCardsComponent();
  }
}

Cards.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  cards: PropTypes.arrayOf(PropTypes.any),
  getCardsRequest: PropTypes.func,
  deleteCardRequest: PropTypes.func,
  postSelectCardRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  isSelectCardLoader: PropTypes.bool,
};

Cards.defaultProps = {
  navigation: {},
  cards: [],
  isLoading: false,
  isSelectCardLoader: false,
  getCardsRequest: () => {},
  postSelectCardRequest: () => {},
  deleteCardRequest: () => {},
};

const mapStateToProps = state => ({
  cards: state.payment.cards,
  isLoading: state.payment.isCardsLoading,
  isSelectCardLoader: state.payment.isSelectCardLoader,
});

export default connect(
  mapStateToProps,
  {
    getCardsRequest: getCardsReq,
    deleteCardRequest: deleteCardReq,
    postSelectCardRequest: postSelectCardReq,
  }
)(Cards);
