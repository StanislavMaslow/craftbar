import { AsyncStorage } from 'react-native';
import ApiUtils from './api-utils';
import navigation from '../services/navigation';

const PaymentApi = {
  async addCard(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/add-card`;
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
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on add card', parsed);
        return null;
      });
  },

  async confirmTip(data) {
    const { id, ...rest } = data;
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/tip/user/${id}/continue`;

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
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on confirm tip', parsed);
        return null;
      });
  },

  async getIdentity() {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/identity`;

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
      .catch(err => {
        if (err.message.indexOf('stored before identity information') > 0) {
          navigation.navigate('AddIdentityScreen');
        }
        // return null;
      });
  },

  async addIdentity(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/identity/store`;

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
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on add card', parsed);
        return null;
      });
  },

  async editIdentity(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/identity/edit`;

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
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on edit identity', parsed);
        return null;
      });
  },
  async removeIdentity() {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/identity/destroy`;

    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        _method: 'delete',
      }),
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
        console.log('Error on edit identity', parsed);
        return null;
      });
  },

  async getTips(page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/tips?page=${page}`;
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
        console.log('Error on getTips', parsed);
        return null;
      });
  },
  async getTip(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/tips/${id}`;
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
        console.log('Error on getTip', parsed);
        return null;
      });
  },

  async withdrawFunds(data) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/payout`;
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
        console.log('Success on withdraw funds', parsed);
        return parsed;
      })
      .catch(async err => {
        let parsed = null;
        parsed = await err.json();
        console.log('Error on withdraw funds', parsed);
        return null;
      });
  },

  async getCards() {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/cards`;

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
        console.log('Error on add card', parsed);
        return null;
      });
  },

  async deleteCard(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/card/${id}/destroy`;

    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        _method: 'delete',
      }),
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
        console.log('Error on add card', parsed);
        return null;
      });
  },

  async selectCard(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/card/${id}/select`;

    const options = {
      method: 'POST',
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
        console.log('Error on add card', parsed);
        return null;
      });
  },

  async getBallence() {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/settings/payment/balance`;
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
        console.log('Error on add card', parsed);
        return null;
      });
  },
  async getPayouts(page = 1) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/payout?page=${page}`;

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
        console.log('Error on get payout', parsed);
        return null;
      });
  },
  async getPayout(id) {
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/payout/${id}`;

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
        console.log('Error on get payout', parsed);
        return null;
      });
  },
};

export default PaymentApi;
