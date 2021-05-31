import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Button, ListItem, Text, List } from 'native-base';
import IconEv from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import ClickableUserAvatar from '../../commons/ClickableUserAvatar';
import NothingToShow from '../../commons/NothingToShow';

const CloseIcon = ({ deleteNotificationRequest, id }) => (
  <View style={styles.thirdListItemContainer}>
    <TouchableOpacity onPress={() => deleteNotificationRequest(id)}>
      <IconEv name="close" size={18} />
    </TouchableOpacity>
  </View>
);

const Notification = ({
  data,
  loadingNotifications,
  refresh,
  handleAcceptFollow,
  handleIgnoreFollow,
  deleteNotificationRequest,
  followRequest,
  myUser,
  navigation,
  children,
}) => {
  const getNotificationMessage = el => {
    if (el.action === 'accepted the follow request.') {
      return (
        <Text style={styles.message}>
          You accepted a {el.from.firstname} {el.from.lastname} follow request.
        </Text>
      );
    }
    if (el.action === 'You have been tipped!') {
      return <Text style={styles.message}>{el.action}</Text>;
    }
    if (el.action === 'added new availability') {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfileScreen', { itemId: el.from.id })}
        >
          <Text style={styles.message}>
            {el.from.firstname} {el.from.lastname} {el.action}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <Text style={styles.message}>
        {el.from.firstname} {el.from.lastname} {el.action}
      </Text>
    );
  };

  const renderFollowTipNotification = el => (
    <View style={styles.secondListItemContainer}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {el.action === 'You have been tipped!'
            ? el.action
            : `${el.from.firstname} ${el.from.lastname} sent you a ${el.action}`}
        </Text>
      </View>
      <View style={styles.buttonsContiner}>
        <Button
          title="Follow"
          style={styles.acceptButton}
          onPress={() => {
            if (el.action.indexOf('tip') > 0 && !myUser.charges) {
              Alert.alert('Your payment identity is not set! Please add it. Also add card.');
              navigation.navigate('AddIdentityScreen');
              return null;
            }
            handleAcceptFollow(el.accept);
            return null;
          }}
        >
          <Text style={styles.buttonText} uppercase={false}>
            Accept
          </Text>
        </Button>
        <Button
          title="Ignore"
          style={styles.ignoreButton}
          onPress={() => {
            handleIgnoreFollow(el.decline ? el.decline : el.ignore);
          }}
        >
          <Text style={[styles.buttonText, styles.ignoreButtonText]} uppercase={false}>
            Ignore
          </Text>
        </Button>
      </View>
    </View>
  );

  const renderFollowInvitation = el => (
    <View style={styles.secondListItemContainer}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {el.from.firstname} {el.from.lastname} {el.action}
        </Text>
      </View>
      <View style={styles.buttonsContiner}>
        <Button
          title="Follow"
          style={styles.acceptButton}
          onPress={() => followRequest(el.from.id, el.id)}
        >
          <Text style={styles.buttonText} uppercase={false}>
            Accept
          </Text>
        </Button>
        <Button
          title="Ignore"
          style={styles.ignoreButton}
          onPress={() => deleteNotificationRequest(el.id)}
        >
          <Text style={[styles.buttonText, styles.ignoreButtonText]} uppercase={false}>
            Ignore
          </Text>
        </Button>
      </View>
    </View>
  );
  const renderTaggedNotification = el => {
    const r = /\d+/;
    const s = el.link;
    const id = s.match(r)[0];
    return (
      <TouchableOpacity
        style={styles.secondListItemContainer}
        onPress={() => navigation.navigate('PostScreen', { itemId: +id })}
      >
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {el.from.firstname} {el.from.lastname} {el.action}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderNotificationItem = el => (
    <ListItem key={el.id} style={styles.listItem}>
      <View style={styles.firstListItemContainer}>
        <ClickableUserAvatar navigation={navigation} id={el.from.id} avatarLink={el.from.avatar} />
      </View>
      <View>
        {/*  */}
        {el.accept && renderFollowTipNotification(el)}
        {el.action === ' sent you a follow invitation.' && renderFollowInvitation(el)}
        {(el.action === 'tagged you in a post.' ||
          el.action === 'commented on your post.' ||
          el.action === 'liked your post') &&
          renderTaggedNotification(el)}
        {!el.accept &&
          el.action !== ' sent you a follow invitation.' &&
          el.action !== 'tagged you in a post.' &&
          el.action !== 'liked your post' &&
          el.action !== 'commented on your post.' && (
            <View style={styles.secondListItemContainer}>
              <View style={styles.messageContainer}>{getNotificationMessage(el)}</View>
            </View>
          )}
        {/*  */}
      </View>
      <CloseIcon deleteNotificationRequest={deleteNotificationRequest} id={el.id} />
    </ListItem>
  );

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={loadingNotifications} onRefresh={refresh} />}
    >
      <View>
        {data.length ? (
          <List>
            {data.map(el => el && renderNotificationItem(el))}
            {children}
          </List>
        ) : (
          <NothingToShow />
        )}
      </View>
    </ScrollView>
  );
};

Notification.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  myUser: PropTypes.objectOf(PropTypes.any),
  loadingNotifications: PropTypes.bool,
  refresh: PropTypes.func,
  deleteNotificationRequest: PropTypes.func,
  handleAcceptFollow: PropTypes.func,
  handleIgnoreFollow: PropTypes.func,
  followRequest: PropTypes.func,
  navigation: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.any,
};
Notification.defaultProps = {
  data: [],
  myUser: {},
  loadingNotifications: false,
  refresh: () => {},
  deleteNotificationRequest: () => {},
  handleAcceptFollow: () => {},
  handleIgnoreFollow: () => {},
  followRequest: () => {},
  navigation: {},
  children: {},
};

CloseIcon.propTypes = {
  deleteNotificationRequest: PropTypes.func,
  id: PropTypes.string,
};
CloseIcon.defaultProps = {
  deleteNotificationRequest: () => {},
  id: '',
};

ClickableUserAvatar.propTypes = {
  id: PropTypes.number,
  avatarLink: PropTypes.string,
  navigation: PropTypes.objectOf(PropTypes.any),
};

ClickableUserAvatar.defaultProps = {
  navigation: {},
  id: 0,
  avatarLink: '',
};

export default Notification;
