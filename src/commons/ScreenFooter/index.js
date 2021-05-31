import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Text, View, Spinner } from 'native-base';
import IconFt from 'react-native-vector-icons/Feather';
import styles from './styles';

const resetActionSearchScreen = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'SearchScreen' })],
});
const resetActionPostsScreen = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'LatestPostsScreen' })],
});
const resetActionMyProfileScreen = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MyProfileScreen' })],
});

const renderPostButton = (
  addPostScreen,
  isEditPostScreen,
  addPost,
  editPost,
  navigation,
  isLoading
) => {
  if (addPostScreen) {
    return (
      <Button disabled={isLoading} style={styles.plusButton} onPress={() => addPost()}>
        {isLoading ? (
          <Spinner color="#C0C0C0" />
        ) : (
          <View>
            <IconFt style={styles.arrowIcon} size={26} color="#fff" name="arrow-up" />
            <Text style={styles.plusButtonText}>Post</Text>
          </View>
        )}
      </Button>
    );
  }

  if (isEditPostScreen) {
    return (
      <Button disabled={isLoading} style={styles.plusButton} onPress={() => editPost()}>
        {isLoading ? (
          <Spinner color="#C0C0C0" />
        ) : (
          <View>
            <IconFt style={styles.arrowIcon} size={26} color="#fff" name="arrow-up" />
            <Text style={styles.plusButtonText}>Post</Text>
          </View>
        )}
      </Button>
    );
  }

  return (
    <Button style={styles.plusButton} onPress={() => navigation.navigate('AddPostScreen')}>
      <IconFt style={styles.plusIcon} size={26} color="#fff" name="plus" />
    </Button>
  );
};

const ScreenFooter = ({
  navigation,
  addPostScreen,
  addPost,
  unRead,
  isEditPostScreen,
  editPost,
  isLoading,
}) => (
  <Footer style={styles.footer}>
    <FooterTab style={styles.footerTab}>
      <Button
        style={styles.footerButton}
        onPress={() => {
          navigation.dispatch(resetActionPostsScreen);
          // navigation.navigate('LatestPostsScreen');
        }}
      >
        {navigation.state.routeName === 'LatestPostsScreen' && (
          <View style={styles.activeIndicator} />
        )}
        <IconFt size={20} name="layers" />
      </Button>
      <Button
        style={styles.footerButton}
        onPress={() => {
          navigation.dispatch(resetActionMyProfileScreen);
          // navigation.navigate('MyProfileScreen');
        }}
      >
        {navigation.state.routeName === 'MyProfileScreen' && (
          <View style={styles.activeIndicator} />
        )}
        <IconFt size={20} name="user" />
      </Button>
      {renderPostButton(addPostScreen, isEditPostScreen, addPost, editPost, navigation, isLoading)}

      <Button
        style={styles.footerButton}
        onPress={() => {
          navigation.dispatch(resetActionSearchScreen);
          // navigation.navigate('SearchScreen');
        }}
      >
        {navigation.state.routeName === 'SearchScreen' && <View style={styles.activeIndicator} />}
        <IconFt size={20} name="search" />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('NotificationsScreen');
        }}
        style={styles.footerButton}
      >
        {navigation.state.routeName === 'NotificationsScreen' && (
          <View style={styles.activeIndicator} />
        )}

        {unRead.length > 0 && <View style={styles.unRead} />}
        <IconFt size={20} name="bell" />
      </Button>
    </FooterTab>
  </Footer>
);

ScreenFooter.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  addPostScreen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isEditPostScreen: PropTypes.bool,
  addPost: PropTypes.func,
  editPost: PropTypes.func,
  unRead: PropTypes.arrayOf(PropTypes.any),
};
ScreenFooter.defaultProps = {
  navigation: {},
  addPostScreen: false,
  isEditPostScreen: false,
  isLoading: false,
  addPost: () => {},
  editPost: () => {},
  unRead: [],
};

export default ScreenFooter;
