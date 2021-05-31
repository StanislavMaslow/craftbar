import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';

import UserApi from '../api/user';
import NavigationService from '../services/navigation';
import { getUserPostsReq, clearUserPostsState } from './post';

const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

const API_MY_USER_DATA_REQUEST = 'API_MY_USER_DATA_REQUEST';
const API_MY_USER_DATA_SUCCESS = 'API_MY_USER_DATA_SUCCESS';
const API_MY_USER_DATA_ERROR = 'API_MY_USER_DATA_ERROR';

const API_USER_DATA_REQUEST = 'API_USER_DATA_REQUEST';
const API_USER_DATA_SUCCESS = 'API_USER_DATA_SUCCESS';
const API_USER_DATA_ERROR = 'API_USER_DATA_ERROR';

const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const GET_AVAILABILITY_REQUEST = 'GET_AVAILABILITY_REQUEST';
const GET_AVAILABILITY_SUCCESS = 'GET_AVAILABILITY_SUCCESS';
const GET_AVAILABILITY_ERROR = 'GET_AVAILABILITY_ERROR';

const ADD_AVAILABILITY_REQUEST = 'ADD_AVAILABILITY_REQUEST';
const ADD_AVAILABILITY_SUCCESS = 'ADD_AVAILABILITY_SUCCESS';
const ADD_AVAILABILITY_ERROR = 'ADD_AVAILABILITY_ERROR';

const EDIT_AVAILABILITY_REQUEST = 'EDIT_AVAILABILITY_REQUEST';
const EDIT_AVAILABILITY_SUCCESS = 'EDIT_AVAILABILITY_SUCCESS';
const EDIT_AVAILABILITY_ERROR = 'EDIT_AVAILABILITY_ERROR';

const DELETE_AVAILABILITY_REQUEST = 'DELETE_AVAILABILITY_REQUEST';
const DELETE_AVAILABILITY_SUCCESS = 'DELETE_AVAILABILITY_SUCCESS';
const DELETE_AVAILABILITY_ERROR = 'DELETE_AVAILABILITY_ERROR';

const ADD_RATING_REQUEST = 'ADD_RATING_REQUEST';
const ADD_RATING_SUCCESS = 'ADD_RATING_SUCCESS';
const ADD_RATING_ERROR = 'ADD_RATING_ERROR';

const EDIT_RATING_REQUEST = 'EDIT_RATING_REQUEST';
const EDIT_RATING_SUCCESS = 'EDIT_RATING_SUCCESS';
const EDIT_RATING_ERROR = 'EDIT_RATING_ERROR';

const SIGN_UP_FACEBOOK_REQUEST = 'SIGN_UP_FACEBOOK_REQUEST';
const SIGN_UP_FACEBOOK_SUCCESS = 'SIGN_UP_FACEBOOK_SUCCESS';
const SIGN_UP_FACEBOOK_ERROR = 'SIGN_UP_FACEBOOK_ERROR';

const POST_REPORT_REQUEST = 'POST_REPORT_REQUEST';
const POST_REPORT_SUCCESS = 'POST_REPORT_SUCCESS';
const POST_REPORT_ERROR = 'POST_REPORT_ERROR';

const GET_TERMS_OF_USE_REQUEST = 'GET_TERMS_OF_USE_REQUEST';
const GET_TERMS_OF_USE_SUCCESS = 'GET_TERMS_OF_USE_SUCCESS';
const GET_TERMS_OF_USE_ERROR = 'GET_TERMS_OF_USE_ERROR';

const GET_PRIVACY_POLICY_REQUEST = 'GET_PRIVACY_POLICY_REQUEST';
const GET_PRIVACY_POLICY_SUCCESS = 'GET_PRIVACY_POLICY_SUCCESS';
const GET_PRIVACY_POLICY_ERROR = 'GET_PRIVACY_POLICY_ERROR';

const GET_NOTIFICATIONS_TOKEN = 'GET_NOTIFICATIONS_TOKEN';

const GET_FACEBOOK_AUTHORIZATION_REQUEST = 'GET_FACEBOOK_AUTHORIZATION_REQUEST';

const REPORT_USER_REQUEST = 'REPORT_USER_REQUEST';
const REPORT_USER_SUCCESS = 'REPORT_USER_SUCCESS';
const REPORT_USER_ERROR = 'REPORT_USER_ERROR';
// actions
export const getMyUserDataReq = payload => ({
  type: API_MY_USER_DATA_REQUEST,
  payload,
});

const getMyUserDataSuccess = payload => ({
  type: API_MY_USER_DATA_SUCCESS,
  payload,
});

const getMyUserDataError = error => ({
  type: API_MY_USER_DATA_ERROR,
  error,
});

export const getUserDataReq = data => ({
  type: API_USER_DATA_REQUEST,
  data,
});

const getUserDataSuccess = payload => ({
  type: API_USER_DATA_SUCCESS,
  payload,
});

const getUserDataError = error => ({
  type: API_USER_DATA_ERROR,
  error,
});

export const logOutReq = () => ({
  type: LOG_OUT_REQUEST,
});

const logOutSuccess = payload => ({
  type: LOG_OUT_SUCCESS,
  payload,
});

export const signUpReq = data => ({
  type: SIGN_UP_REQUEST,
  data,
});

const signUpSuccess = payload => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

const signUpError = error => ({
  type: SIGN_UP_ERROR,
  error,
});

export const updateUserReq = data => ({
  type: UPDATE_USER_REQUEST,
  data,
});

const updateUserSuccess = payload => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

const updateUserError = error => ({
  type: UPDATE_USER_ERROR,
  error,
});

export const getAvailabilityReq = () => ({
  type: GET_AVAILABILITY_REQUEST,
});

const getAvailabilitySuccess = payload => ({
  type: GET_AVAILABILITY_SUCCESS,
  payload,
});

const getAvailabilityError = error => ({
  type: GET_AVAILABILITY_ERROR,
  error,
});

export const addAvailabilityReq = data => ({
  type: ADD_AVAILABILITY_REQUEST,
  data,
});

const addAvailabilitySuccess = payload => ({
  type: ADD_AVAILABILITY_SUCCESS,
  payload,
});

const addAvailabilityError = error => ({
  type: ADD_AVAILABILITY_ERROR,
  error,
});

export const editAvailabilityReq = data => ({
  type: EDIT_AVAILABILITY_REQUEST,
  data,
});

const editAvailabilitySuccess = payload => ({
  type: EDIT_AVAILABILITY_SUCCESS,
  payload,
});

const editAvailabilityError = error => ({
  type: EDIT_AVAILABILITY_ERROR,
  error,
});

export const deleteAvailabilityReq = id => ({
  type: DELETE_AVAILABILITY_REQUEST,
  id,
});

const deleteAvailabilitySuccess = payload => ({
  type: DELETE_AVAILABILITY_SUCCESS,
  payload,
});

const deleteAvailabilityError = error => ({
  type: DELETE_AVAILABILITY_ERROR,
  error,
});

export const addRatingReq = data => ({
  type: ADD_RATING_REQUEST,
  data,
});

const addRatingSuccess = payload => ({
  type: ADD_RATING_SUCCESS,
  payload,
});

const addRatingError = error => ({
  type: ADD_RATING_ERROR,
  error,
});

export const editRatingReq = data => ({
  type: EDIT_RATING_REQUEST,
  data,
});

const editRatingSuccess = payload => ({
  type: EDIT_RATING_SUCCESS,
  payload,
});

const editRatingError = error => ({
  type: EDIT_RATING_ERROR,
  error,
});

export const signUpFacebookReq = (data, userInfo) => ({
  type: SIGN_UP_FACEBOOK_REQUEST,
  data,
  userInfo,
});

const signUpFacebookSuccess = payload => ({
  type: SIGN_UP_FACEBOOK_SUCCESS,
  payload,
});

const signUpFacebookError = error => ({
  type: SIGN_UP_FACEBOOK_ERROR,
  error,
});

export const postReportRequest = data => ({
  type: POST_REPORT_REQUEST,
  data,
});

const postReportSuccess = payload => ({
  type: POST_REPORT_SUCCESS,
  payload,
});

const postReportError = error => ({
  type: POST_REPORT_ERROR,
  error,
});

export const getTermsOfUseRequest = () => ({
  type: GET_TERMS_OF_USE_REQUEST,
});

const getTermsOfUseSuccess = payload => ({
  type: GET_TERMS_OF_USE_SUCCESS,
  payload,
});

const getTermsOfUseError = error => ({
  type: GET_TERMS_OF_USE_ERROR,
  error,
});

export const getPrivacyPolicyReq = () => ({
  type: GET_PRIVACY_POLICY_REQUEST,
});

const getPrivacyPolicySuccess = payload => ({
  type: GET_PRIVACY_POLICY_SUCCESS,
  payload,
});

const getPrivacyPolicyError = error => ({
  type: GET_PRIVACY_POLICY_ERROR,
  error,
});

export const getNotificationToken = token => ({
  type: GET_NOTIFICATIONS_TOKEN,
  payload: token,
});

export const getFacebookAuthorizationData = payload => ({
  type: GET_FACEBOOK_AUTHORIZATION_REQUEST,
  payload,
});

export const reportUserReq = data => ({
  type: REPORT_USER_REQUEST,
  data,
});

const reportUserSuccess = payload => ({
  type: REPORT_USER_SUCCESS,
  payload,
});

const reportUserError = error => ({
  type: REPORT_USER_ERROR,
  error,
});

// reducers
const initialState = {
  myUserData: {},
  userData: {},
  termsOfUse: {},
  availability: {},
  privacyPolicy: {},
  loading: false,
  error: false,
  tokenNotification: '',
  facebookAuthorization: {},
};

export function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SIGN_UP_FACEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SIGN_UP_FACEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case SIGN_UP_FACEBOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case API_MY_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case API_MY_USER_DATA_SUCCESS:
      return {
        ...state,
        myUserData: action.payload,
        loading: false,
        error: false,
      };
    case API_MY_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case API_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case API_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: false,
      };
    case API_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        myUserData: {},
        loading: true,
        error: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        myUserData: {},
        loading: false,
        error: false,
      };
    case LOG_OUT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        availability: action.payload,
        error: false,
      };
    case GET_AVAILABILITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case ADD_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_AVAILABILITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case EDIT_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case EDIT_AVAILABILITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DELETE_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_AVAILABILITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ADD_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_RATING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case EDIT_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case EDIT_RATING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case POST_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case POST_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_TERMS_OF_USE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_TERMS_OF_USE_SUCCESS:
      return {
        ...state,
        loading: false,
        termsOfUse: action.payload,
        error: false,
      };
    case GET_TERMS_OF_USE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_PRIVACY_POLICY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_PRIVACY_POLICY_SUCCESS:
      return {
        ...state,
        loading: false,
        privacyPolicy: action.payload,
        error: false,
      };
    case GET_PRIVACY_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_NOTIFICATIONS_TOKEN:
      return {
        ...state,
        tokenNotification: action.payload,
        error: true,
      };
    case GET_FACEBOOK_AUTHORIZATION_REQUEST:
      return {
        ...state,
        facebookAuthorization: action.payload,
        error: true,
      };
    case REPORT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case REPORT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case REPORT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

// saga

function* getMyUserData({ payload }) {
  try {
    const myUserData = yield call(UserApi.getMyUserData);

    yield put(getMyUserDataSuccess(myUserData));
    if (!payload) {
      yield put(clearUserPostsState());
      yield put(getUserPostsReq(myUserData.data.id, 1));
    }
  } catch (error) {
    yield put(getMyUserDataError(error));
  }
}

function* getUserData(action) {
  try {
    const userData = yield call(UserApi.getUserData, action.data);
    yield put(getUserDataSuccess(userData));
  } catch (error) {
    yield put(getUserDataError(error));
  }
}

function* signUp(data) {
  try {
    const response = yield call(UserApi.signUp, data.data);
    if (response === null) {
      throw new Error('message');
    }

    yield put(signUpSuccess());
    NavigationService.navigate('MyProfileScreen', { from: 'signUp' });
  } catch (error) {
    yield put(signUpError(error));
  }
}

function* logOut() {
  try {
    yield call(UserApi.logOutReq);
    yield put(logOutSuccess());

    AsyncStorage.removeItem('tokenTCBK', () => {
      NavigationService.navigate('LoginScreen');
    });
  } catch (error) {
    AsyncStorage.removeItem('tokenTCBK', () => {
      NavigationService.navigate('LoginScreen');
    });
  }
}

function* updateUser(data) {
  try {
    yield call(UserApi.updateUser, data.data);
    yield put(updateUserSuccess());
    yield put(getMyUserDataReq());
    NavigationService.navigate('MyProfileScreen');
  } catch (error) {
    yield put(updateUserError(error));
  }
}

function* getAvailability() {
  try {
    const availability = yield call(UserApi.getAvailability);
    yield put(getAvailabilitySuccess(availability));
  } catch (error) {
    yield put(getAvailabilityError(error));
  }
}

function* addAvailability(data) {
  try {
    yield call(UserApi.addAvailability, data.data);
    yield put(addAvailabilitySuccess());
    yield put(getAvailabilityReq());
  } catch (error) {
    yield put(addAvailabilityError(error));
  }
}

function* editAvailability(data) {
  try {
    yield call(UserApi.editAvailability, data.data);
    yield put(editAvailabilitySuccess());
    yield put(getAvailabilityReq());
  } catch (error) {
    yield put(editAvailabilityError(error));
  }
}

function* deleteAvailability(data) {
  try {
    yield call(UserApi.deleteAvailability, data.id);
    yield put(deleteAvailabilitySuccess());
    yield put(getAvailabilityReq());
    NavigationService.navigate('AvailabilityListScreen');
  } catch (error) {
    yield put(deleteAvailabilityError(error));
  }
}

function* addRating(data) {
  try {
    yield call(UserApi.addRating, data.data);
    yield put(addRatingSuccess());
    NavigationService.navigate('MyProfileScreen');
  } catch (error) {
    yield put(addRatingError(error));
  }
}

function* editRating(data) {
  try {
    yield call(UserApi.editRating, data.data);
    yield put(editRatingSuccess());
    NavigationService.navigate('MyProfileScreen');
  } catch (error) {
    yield put(editRatingError(error));
  }
}

function* signUpFacebook({ data, userInfo }) {
  try {
    const response = yield call(UserApi.signUpFacebook, data);
    if (response === null) {
      throw new Error('message');
    }
    yield put(signUpFacebookSuccess());

    if (userInfo) {
      const appendData = new FormData();
      appendData.append('avatar', {
        uri: userInfo.typeFile,
        name: 'avatar',
        type: `image/${undefined}`,
      });
      appendData.append('username', data.username);
      appendData.append('email', data.email);
      appendData.append('firstname', userInfo.firstName);
      appendData.append('bio_information', '');
      appendData.append('visibility', 'Public');

      yield put(updateUserReq(appendData));
    }

    NavigationService.navigate('MyProfileScreen', { from: 'signUpFacebook' });
  } catch (error) {
    console.log('error during facebook login', error);
    yield put(signUpFacebookError(error));
  }
}

function* postReport(data) {
  try {
    yield call(UserApi.postReport, data.data);
    yield put(postReportSuccess());
    NavigationService.navigate('MyProfileScreen');
  } catch (error) {
    yield put(postReportError(error));
  }
}

function* getTermsOfUse() {
  try {
    const response = yield call(UserApi.termsOfUse);
    yield put(getTermsOfUseSuccess(response.data));
  } catch (error) {
    yield put(getTermsOfUseError(error));
  }
}

function* getPrivacyPolicy() {
  try {
    const response = yield call(UserApi.privacyPolicy);
    yield put(getPrivacyPolicySuccess(response.data));
  } catch (error) {
    yield put(getPrivacyPolicyError(error));
  }
}

function* postUserReport(data) {
  try {
    yield call(UserApi.reportUser, data.data);
    yield put(reportUserSuccess());
    Alert.alert('Your report has been sent!');
  } catch (error) {
    yield put(reportUserError(error));
  }
}

export function* watchGetMyUserData() {
  yield takeLatest(API_MY_USER_DATA_REQUEST, getMyUserData);
}
export function* watchGetUserData() {
  yield takeLatest(API_USER_DATA_REQUEST, getUserData);
}
export function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);
}

export function* watchGetAvailability() {
  yield takeLatest(GET_AVAILABILITY_REQUEST, getAvailability);
}

export function* watchAddAvailability() {
  yield takeLatest(ADD_AVAILABILITY_REQUEST, addAvailability);
}

export function* watchEditAvailability() {
  yield takeLatest(EDIT_AVAILABILITY_REQUEST, editAvailability);
}

export function* watchDeleteAvailability() {
  yield takeLatest(DELETE_AVAILABILITY_REQUEST, deleteAvailability);
}

export function* watchAddRating() {
  yield takeLatest(ADD_RATING_REQUEST, addRating);
}

export function* watchEditRating() {
  yield takeLatest(EDIT_RATING_REQUEST, editRating);
}

export function* watchSignUpFacebook() {
  yield takeLatest(SIGN_UP_FACEBOOK_REQUEST, signUpFacebook);
}

export function* watchPostReport() {
  yield takeLatest(POST_REPORT_REQUEST, postReport);
}

export function* watchGetTermsOfUse() {
  yield takeLatest(GET_TERMS_OF_USE_REQUEST, getTermsOfUse);
}

export function* watchWatchPrivacyPolicy() {
  yield takeLatest(GET_PRIVACY_POLICY_REQUEST, getPrivacyPolicy);
}

export function* watchReportUser() {
  yield takeLatest(REPORT_USER_REQUEST, postUserReport);
}
