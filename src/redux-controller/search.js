import { call, put, takeLatest } from 'redux-saga/effects';
import SearchApi from '../api/search';

const GET_SEARCH_DATA_REQUEST = 'GET_SEARCH_DATA_REQUEST';
const GET_SEARCH_DATA_SUCCESS = 'GET_SEARCH_DATA_SUCCESS';
const GET_SEARCH_DATA_ERROR = 'GET_SEARCH_DATA_ERROR';

const CLEAR_SEARCH_DATA = 'CLEAR_SEARCH_DATA';

// actions
export const getSearchDataReq = data => ({
  type: GET_SEARCH_DATA_REQUEST,
  data,
});

const getSearchDataSuccess = payload => ({
  type: GET_SEARCH_DATA_SUCCESS,
  payload,
});

const getSearchDataError = error => ({
  type: GET_SEARCH_DATA_ERROR,
  error,
});

export const clearSearchData = () => ({
  type: CLEAR_SEARCH_DATA,
});

// reducers
const initialState = {
  search: [],
  loading: false,
  error: false,
  meta: {},
};

export function searhDataReducer(state = initialState, action) {
  const data = action.payload ? action.payload.data : [];
  const meta = action.payload ? action.payload.meta : {};
  switch (action.type) {
    case GET_SEARCH_DATA_REQUEST:
      return {
        ...state,
        meta: {},
        loading: true,
        error: false,
      };
    case GET_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        search: [...state.search, ...data],
        meta,
        loading: false,
        error: false,
      };

    case GET_SEARCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        meta: {},
        error: true,
      };
    case CLEAR_SEARCH_DATA:
      return {
        ...state,
        search: [],
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}

// saga

function* getUsersData(action) {
  try {
    const searchData = yield call(SearchApi.getSearchData, action.data);
    yield put(getSearchDataSuccess(searchData));
  } catch (error) {
    yield put(getSearchDataError(error));
  }
}

export function* watchSearchUsersData() {
  yield takeLatest(GET_SEARCH_DATA_REQUEST, getUsersData);
}
