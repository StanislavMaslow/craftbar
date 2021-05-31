import React from 'react';
import { Image, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Button, ListItem, Text } from 'native-base';
import styles from './styles';

import ApiUtils from '../../api/api-utils';

const url = `${ApiUtils.getImageUrl()}`;

const renderFollowButton = (
  isFollow,
  id,
  handleFollow,
  unFollowRequest,
  filter,
  clearSearchDataRequest,
  role
) => {
  if (role === 'Bar') {
    return null;
  }

  if (isFollow === false) {
    return (
      <Button
        dark
        title="Follow"
        style={styles.button}
        onPress={() => {
          clearSearchDataRequest();
          handleFollow(id, undefined, filter);
        }}
      >
        <Text style={styles.buttonText} uppercase={false}>
          Follow
        </Text>
      </Button>
    );
  }

  if (isFollow === 'pending') {
    return (
      <Button disabled title="Penging" style={styles.button}>
        <Text style={styles.buttonText} uppercase={false}>
          Sent
        </Text>
      </Button>
    );
  }

  return (
    <Button
      dark
      title="Unfollow"
      style={styles.button}
      onPress={() => {
        clearSearchDataRequest();
        unFollowRequest(id, undefined, filter);
      }}
    >
      <Text style={styles.buttonText} uppercase={false}>
        Unfollow
      </Text>
    </Button>
  );
};

const renderInviteButton = (
  following,
  invite,
  inviteToFollowRequest,
  id,
  filter,
  clearSearchDataRequest,
  role
) => {
  if (role === 'Bar') {
    return null;
  }
  if (invite === 'pending') {
    return (
      <Button
        title="Invite"
        disabled
        onPress={() => console.log('folow', following, invite)}
        style={[styles.button, styles.disabledButton]}
      >
        <Text style={styles.buttonText} uppercase={false}>
          Invite
        </Text>
      </Button>
    );
  }
  if (invite === 'accepted' || following) {
    return (
      <Button
        title="Invite"
        disabled
        onPress={() => console.log('folow', following, invite)}
        style={[styles.button, styles.disabledButton]}
      >
        <Text style={styles.buttonText} uppercase={false}>
          Following
        </Text>
      </Button>
    );
  }

  return (
    <Button
      title="Invite"
      dark
      onPress={() => {
        clearSearchDataRequest();
        inviteToFollowRequest(id, filter);
      }}
      style={styles.button}
    >
      <Text style={styles.buttonText} uppercase={false}>
        Invite
      </Text>
    </Button>
  );
};

const Listitem = ({
  user,
  navigation,
  handleFollow,
  unFollowRequest,
  inviteToFollowRequest,
  role,
  filter,
  clearSearchDataRequest,
  myId,
}) => (
  <ListItem
    onPress={() => {
      if (!user.follow || user.follow === 'pending') {
        Alert.alert('Follow request must be approved to access profile!');
      } else {
        navigation.navigate('UserProfileScreen', { itemId: user.id });
      }
    }}
    style={styles.listItemContainer}
  >
    <View>
      <Image style={styles.avatar} source={{ uri: `${url + user.avatar}` }} />
    </View>
    <View style={styles.nameContainer}>
      <Text style={styles.name}>
        {user.role === 'Bar' ? user.firstname : `${user.firstname} ${user.lastname}`}
      </Text>
      <Text style={styles.username}>{user.username}</Text>
    </View>
    {myId !== user.id && (
      <View style={styles.buttonContainer}>
        {role === 'Barkeep'
          ? renderInviteButton(
              user.following,
              user.invite,
              inviteToFollowRequest,
              user.id,
              filter,
              clearSearchDataRequest,
              user.role
            )
          : renderFollowButton(
              user.follow,
              user.id,
              handleFollow,
              unFollowRequest,
              filter,
              clearSearchDataRequest,
              role
            )}
      </View>
    )}
  </ListItem>
);

Listitem.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  filter: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  role: PropTypes.string,
  myId: PropTypes.number,
  handleFollow: PropTypes.func,
  inviteToFollowRequest: PropTypes.func,
  unFollowRequest: PropTypes.func,
  clearSearchDataRequest: PropTypes.func,
};
Listitem.defaultProps = {
  user: {},
  filter: {},
  role: '',
  myId: 0,
  handleFollow: () => {},
  unFollowRequest: () => {},
  inviteToFollowRequest: () => {},
  clearSearchDataRequest: () => {},
  navigation: {},
};

export default Listitem;
