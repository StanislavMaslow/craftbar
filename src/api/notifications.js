import { AsyncStorage } from 'react-native';
import ApiUtils from './api-utils';

const NotificationsApi = {
  async getNotifications(page) {
    const url = `${ApiUtils.getBaseUrl()}/notifications?page=${page}`;
    const token = await AsyncStorage.getItem('tokenTCBK');

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
      .catch(err => {
        console.log('Error on getNotification', err);
        return null;
      });
  },
  async acceptFollow(link) {
    const url = `${ApiUtils.getBaseUrl()}${link}`;
    const token = await AsyncStorage.getItem('tokenTCBK');

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
        return parsed;
      })
      .catch(err => {
        console.log('Error on acceptFollow', err);
        return null;
      });
  },
  async ignoreFollow(link) {
    const url = `${ApiUtils.getBaseUrl()}${link}`;
    const token = await AsyncStorage.getItem('tokenTCBK');

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
        return parsed;
      })
      .catch(err => {
        console.log('Error on ignoreFollow', err);
        return null;
      });
  },

  async deleteNotification(id) {
    const url = `${ApiUtils.getBaseUrl()}/notifications/${id}/destroy`;
    const token = await AsyncStorage.getItem('tokenTCBK');

    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        _method: 'delete',
      }),
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
      .catch(err => {
        console.log('Error on deleteNotification', err);
        return null;
      });
  },

  async getUnRead() {
    const url = `${ApiUtils.getBaseUrl()}/notifications/unread`;
    const token = await AsyncStorage.getItem('tokenTCBK');

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
      .catch(err => {
        console.log('Error on getUnRead', err);
        return null;
      });
  },

  async markAsReadNotifications() {
    const url = `${ApiUtils.getBaseUrl()}/notifications/mark-as-read`;
    const token = await AsyncStorage.getItem('tokenTCBK');

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
        return parsed;
      })
      .catch(err => {
        console.log('Error on markAsReadNotifications', err);
        return null;
      });
  },

  async pushNotification(data) {
    const url = 'https://exp.host/--/api/v2/push/send';

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify({
        ...data,
      }),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(err => {
        console.log('Error on pushNotofications', err);
        return null;
      });
  },
};

export default NotificationsApi;
