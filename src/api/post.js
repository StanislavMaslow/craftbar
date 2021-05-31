import { AsyncStorage } from 'react-native';
import ApiUtils from './api-utils';

const PostApi = {
  async getUserPosts(userID, page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/${userID}/posts?page=${page}`;

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
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on getPost', parsed);
        return null;
      });
  },

  async getFeed(page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/feed?page=${page}`;
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
        console.log('Error on getPost', parsed);
        return null;
      });
  },

  async addPost(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/posts/store`;

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
      body: data,
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options, url))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        console.log('----------response on add image file', parsed);
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on addPost', parsed);
        return null;
      });
  },

  async checkIn(query) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/bar/search/${query}`;

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
        console.log('Error on checkIn.', parsed);

        return null;
      });
  },

  async toggleLikePost(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/post/${id}/toggle-like`;
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
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on toggleLikePost', parsed);
        return null;
      });
  },

  async getPost(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/posts/${id}/show`;
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
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on getPost', parsed);
        return null;
      });
  },

  async deletePost(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/posts/${id}/destroy`;
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
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on getPost', parsed);
        return null;
      });
  },

  async editPost(data) {
    const { id, ...rest } = data;
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/posts/${id}/update`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
      body: rest.data,
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
        console.log('Error on editPost', parsed);
        return null;
      });
  },

  async sharePost(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/share/post/${id}`;
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
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on getPost', parsed);
        return null;
      });
  },

  async searchPeople(name) {
    const str = name === '' ? `${name}a` : `${name}`;
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/users/search/${str}`;

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
        console.log('Error on searchPeople', parsed);
        return null;
      });
  },

  async reportPost(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/post/report/${data.id}`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
      body: data.type,
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options, url))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        console.log('----------response on report post', parsed);
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on report post', parsed);
        return null;
      });
  },
};

export default PostApi;
