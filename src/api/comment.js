import { AsyncStorage } from 'react-native';
import ApiUtils from './api-utils';

const CommentApi = {
  async getComments(id, page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/post/${id}/comments/all?page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options, url))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(() => null);
  },

  async addComment(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/post/${data.id}/comment`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        comment: data.comment,
      }),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(() => null);
  },

  async editComment(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/comments/${data.id}/update`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        comment: data.comment,
      }),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(() => null);
  },

  async deleteComment(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/comments/${id}/destroy`;
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
      .catch(() => null);
  },
};

export default CommentApi;
