import React from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { Button, ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import IconMa from 'react-native-vector-icons/MaterialIcons';

import ApiUtils from '../../api/api-utils';
import styles from './contentStyles';
import Available from './Available';
import navigation from '../../services/navigation';

const baseUrl = `${ApiUtils.getImageUrl()}`;

const ava = require('../../../assets/images/default.png');

const BUTTONS = [
  'Pretending to Be Someone',
  'Fake Account',
  'Fake Name',
  'Posting Inappropiate Things',
  'I Can`t Access My Account',
  'Cancel',
];
const CANCEL_INDEX = 5;

const renderButton = (isFollow, handleFollow, handleUnFollow, myRole) => {
  if (myRole === 'Bar') {
    return null;
  }

  if (!isFollow) {
    return (
      <Button dark style={styles.followButton} onPress={handleFollow}>
        <Text style={styles.followButtonText}>Follow</Text>
      </Button>
    );
  }

  if (isFollow === 'pending') {
    return (
      <Button disabled style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </Button>
    );
  }

  return (
    <Button dark style={styles.followButton} onPress={handleUnFollow}>
      <Text style={styles.followButtonText}>Unfollow</Text>
    </Button>
  );
};

const renderInviteButton = (isAvailability, handleInvite, invite, following, userRole) => {
  if (userRole === 'Bar') {
    return null;
  }

  if (invite === 'pending') {
    return (
      <Button title="Pending" disabled style={styles.followButton}>
        <Text style={styles.followButtonText} uppercase={false}>
          Invite
        </Text>
      </Button>
    );
  }

  if (invite === 'accepted' || following) {
    return (
      <Button title="Invited" disabled dark style={styles.followButton}>
        <Text style={styles.followButtonText} uppercase={false}>
          Following
        </Text>
      </Button>
    );
  }

  return (
    <Button title="Invite" dark onPress={handleInvite} style={styles.followButton}>
      <Text style={styles.followButtonText} uppercase={false}>
        Invite
      </Text>
    </Button>
  );
};

const returnRatingButton = (userData, myUserData) => {
  const { follow, role } = userData;

  if (
    userData.role === 'Patron' ||
    (userData.role === 'Bar' && myUserData.role === 'Barkeep') ||
    (userData.role === 'Patron' && myUserData.role === 'Patron') ||
    myUserData.role === 'Bar'
  ) {
    return null;
  }
  return (
    <Button
      onPress={() => {
        if (role === 'Barkeep' && follow !== true) {
          Alert.alert('You should be patron for this barkeeper to be able to rate');
          return null;
        }
        return navigation.navigate('RateScreen', { userData });
      }}
      style={
        userData.role === 'Bar' || userData.role === 'Patron'
          ? styles.button
          : [styles.button, { marginLeft: 10 }]
      }
    >
      <Text>Rate</Text>
    </Button>
  );
};

const renderTipButton = (id, userData) => {
  if (userData.role === 'Bar' || userData.role === 'Patron') {
    return null;
  }

  return (
    <Button
      onPress={() => navigation.navigate('PaymentAddTipScreen', { id })}
      style={styles.button}
    >
      <Text>Tip</Text>
    </Button>
  );
};

const renderBioInfomation = (bioInformation, availability) => {
  if (availability === undefined && bioInformation === null) {
    return (
      <View style={[styles.textContainer, { marginTop: 125, marginBottom: 0 }]}>
        <Text style={styles.text}>
          Bio information: - {bioInformation === null ? `-` : bioInformation}
        </Text>
      </View>
    );
  }

  if (availability === undefined) {
    return (
      <View style={[styles.textContainer, { marginTop: 145 }]}>
        <Text style={styles.text}>
          Bio information: {bioInformation === null ? `-` : bioInformation}
        </Text>
      </View>
    );
  }
  return (
    <View
      style={
        bioInformation !== null ? styles.textContainer : [styles.textContainer, { marginTop: 10 }]
      }
    >
      <Text style={styles.text}>
        Bio information: {bioInformation === null ? `-` : bioInformation}
      </Text>
    </View>
  );
};

const Content = ({
  userData,
  handleFollow,
  handleUnFollow,
  handleInvite,
  myUserData,
  openReportPopUp,
}) => {
  const isAvailability = userData.availability && !!userData.availability.length;

  return (
    <View>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Image
            style={styles.avatar}
            source={userData.avatar ? { uri: `${baseUrl}${userData.avatar}` } : ava}
          />
        </View>
        <View style={styles.rightContent}>
          <View style={styles.reportIconContainer}>
            <TouchableOpacity
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: 'Report this user because of:',
                  },
                  buttonIndex => {
                    openReportPopUp(BUTTONS[buttonIndex], userData.id);
                  }
                )
              }
            >
              <IconMa size={28} active name="report" style={styles.reportIcon} />
            </TouchableOpacity>
          </View>
          <Available availability={userData.availability} role={userData.role} isCurrent={false} />
        </View>
      </View>

      {renderBioInfomation(userData.bio_information, userData.availability)}
      {myUserData.role !== 'Bar' && myUserData.id !== userData.id && (
        <View
          style={
            userData.availability === undefined
              ? [styles.containerButtons, { marginTop: 10 }]
              : styles.containerButtons
          }
        >
          {myUserData.role === 'Barkeep'
            ? renderInviteButton(
                isAvailability,
                handleInvite,
                userData.invite,
                userData.following,
                userData.role
              )
            : renderButton(userData.follow, handleFollow, handleUnFollow, isAvailability)}

          {renderTipButton(userData.id, userData)}
          {returnRatingButton(userData, myUserData)}
        </View>
      )}
    </View>
  );
};

Content.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  myUserData: PropTypes.objectOf(PropTypes.any),
  handleFollow: PropTypes.func,
  handleUnFollow: PropTypes.func,
  handleInvite: PropTypes.func,
  openReportPopUp: PropTypes.func,
};

Content.defaultProps = {
  userData: {},
  myUserData: {},
  handleFollow: () => {},
  handleUnFollow: () => {},
  handleInvite: () => {},
  openReportPopUp: () => {},
};

export default Content;
