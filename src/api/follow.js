import { AsyncStorage, Alert } from 'react-native';
import ApiUtils from './api-utils';

const FollowApi = {
  async follow(userId) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/profile/${userId}/follow`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('Follow request was sent!');
        return parsed;
      })
      .catch(() => null);
  },

  async unFollow(userId) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/profile/${userId}/unfollow`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('You are no longer following this user!');
        return parsed;
      })
      .catch(() => null);
  },

  async getUserFollowers(userId, search = '', page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const allurl = `${ApiUtils.getBaseUrl()}/profile/${userId}/followers?page=${page}`;
    const searchurl = `${ApiUtils.getBaseUrl()}/profile/${userId}/followers/search?s=${search}`;
    const url = search ? searchurl : allurl;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on getFollowers', parsed);
        return null;
      });
  },

  async getUserFollowings(userId, search = '', page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const allurl = `${ApiUtils.getBaseUrl()}/profile/${userId}/followings?page=${page}`;
    const searchurl = `${ApiUtils.getBaseUrl()}/profile/${userId}/followings/search?s=${search}`;
    const url = search ? searchurl : allurl;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on getFollowings', parsed);
        return null;
      });
  },

  async removeFollower(userId) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/profile/followers/${userId}/destroy`;
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('User removed!');
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on remove', parsed);
        return null;
      });
  },

  async inviteToFollow(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/profile/${id}/invite`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('Invite send successful!');
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on invite', parsed);
        return null;
      });
  },
};

export default FollowApi;
