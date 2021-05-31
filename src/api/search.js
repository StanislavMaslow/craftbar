import { AsyncStorage } from 'react-native';
import qs from 'qs';
import ApiUtils from './api-utils';

const SearchApi = {
  async getSearchData(data) {
    const { role, filter, search: s, page } = data;
    const params = qs.stringify({ s, filter, page });
    const token = await AsyncStorage.getItem('tokenTCBK');
    const url = `${ApiUtils.getBaseUrl()}/search/profile/${role}?${params}`;
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
        let parced = null;
        parced = await response.json();
        return parced;
      })
      .then(response => response)

      .catch(async err => err.response);
  },
};

export default SearchApi;
