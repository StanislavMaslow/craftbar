import { AsyncStorage, Alert } from 'react-native';
import ApiUtils from './api-utils';

const UserApi = {
  login(credentials) {
    const url = `${ApiUtils.getBaseUrl()}/login`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(response => {
        let parsed = null;
        parsed = response.json();
        return parsed;
      })
      .catch(err => {
        console.log('Error on login', err);
        return null;
      });
  },
  signUp(data) {
    const url = `${ApiUtils.getBaseUrl()}/register`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        AsyncStorage.setItem('tokenTCBK', `Bearer ${parsed.data.access_token}`);
        return parsed;
      })
      .catch(err => {
        console.log('Error on signUp', err);
        return null;
      });
  },
  signUpFacebook(data) {
    const url = `${ApiUtils.getBaseUrl()}/login/facebook`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();

        AsyncStorage.setItem('tokenTCBK', `Bearer ${parsed.data.access_token}`);
        return parsed;
      })
      .catch(err => {
        console.log('Error on facebookUp', err);
        return null;
      });
  },
  async getMyUserData() {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user`;
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
      .catch(async err => err.response);
  },

  async getUserData(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      .catch(async err => err.response);
  },

  logOutReq: async () => {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/logout`;
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
      .catch(async err => err.response);
  },
  async updateUser(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/update`;
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
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        console.log('Success on user update2', parsed);

        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on user update2', parsed);
      });
  },
  async getAvailability() {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/availability`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
        console.log('Get availability error', parsed);
      });
  },
  async addAvailability(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/availability/store`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        console.log('add availability', parsed);

        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Add availability', parsed);
      });
  },
  async editAvailability(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/availability/${data.id}/update`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        console.log('Edit availability', parsed);

        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on edit availability', parsed);
      });
  },
  async deleteAvailability(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/availability/${id}/destroy`;
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('Availability Successfully Removed!');
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        Alert.alert(parsed.errors.message);
        console.log('Delete availability error', parsed);
      });
  },
  async addRating(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/profile/${data.id}/rating`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert(parsed.data.message);
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on add rating', parsed);
      });
  },

  async editRating({ id, ...rest }) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/rating/${id}/update`;

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(rest),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('Your review has been added');
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on add rating', parsed);
      });
  },
  async postReport(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/report-a-problem`;
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
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        Alert.alert('The report has been successfully sent');
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on post report', parsed);
      });
  },

  async termsOfUse(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/terms-of-use`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
      body: data,
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
        console.log('Error on terms of use', parsed);
      });
  },

  async privacyPolicy(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/privacy-policy`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
      body: data,
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
        console.log('Error on privacy policy', parsed);
      });
  },
  ressetPasswprdApi(email) {
    const url = `${ApiUtils.getBaseUrl()}/password/create`;
    console.log('resset password');
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    };
    return fetch(url, options)
      .then(response => ApiUtils.checkStatus(response, options))
      .then(response => {
        let parsed = null;
        parsed = response.json();
        return parsed;
      })
      .catch(err => {
        console.log('Error on resset password', err);
        return null;
      });
  },
  async reportUser(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/user/report/${data.userId}`;
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
      .then(response => ApiUtils.checkStatus(response, options))
      .then(async response => {
        let parsed = null;
        parsed = await response.json();
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on post report', parsed);
      });
  },
};

export default UserApi;
