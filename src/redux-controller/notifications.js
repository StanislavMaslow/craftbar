import { call, put, takeLatest } from 'redux-saga/effects';
import NotificationsApi from '../api/notifications';

const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
const GET_NOTIFICATIONS_ERROR = 'GET_NOTIFICATIONS_ERROR';

const CLEAR_STATE_NOTIFICATIONS = 'CLEAR_STATE_NOTIFICATIONS';

const POST_ACCEPT_FOLLOW_REQUEST = 'POST_ACCEPT_FOLLOW_REQUEST';
const POST_ACCEPT_FOLLOW_SUCCESS = 'POST_ACCEPT_FOLLOW_SUCCESS';
const POST_ACCEPT_FOLLOW_ERROR = 'POST_ACCEPT_FOLLOW_ERROR';

const POST_IGNORE_FOLLOW_REQUEST = 'POST_IGNORE_FOLLOW_REQUEST';
const POST_IGNORE_FOLLOW_SUCCESS = 'POST_IGNORE_FOLLOW_SUCCESS';
const POST_IGNORE_FOLLOW_ERROR = 'POST_IGNORE_FOLLOW_ERROR';

const DELETE_NOTIFICATION_REQUEST = 'DELETE_NOTIFICATION_REQUEST';
const DELETE_NOTIFICATION_SUCCESS = 'DELETE_NOTIFICATION_SUCCESS';
const DELETE_NOTIFICATION_ERROR = 'DELETE_NOTIFICATION_REQUEST';

const GET_UN_READ_NOTIFICATION_REQUEST = 'GET_UN_READ_NOTIFICATION_REQUEST';
const GET_UN_READ_NOTIFICATION_SUCCESS = 'GET_UN_READ_NOTIFICATION_SUCCESS';
const GET_UN_READ_NOTIFICATION_ERROR = 'GET_UN_READ_NOTIFICATION_ERRROR';

const MARK_AS_READ_NOTIFICATIONS_REQUEST = 'MARK_AS_READ_NOTIFICATIONS_REQUEST';
const MARK_AS_READ_NOTIFICATIONS_SUCCESS = 'MARK_AS_READ_NOTIFICATIONS_SUCCESS';
const MARK_AS_READ_NOTIFICATIONS_ERROR = 'MARK_AS_READ_NOTIFICATIONS_ERROR';

const SEND_PUSH_NOTIFICATION_REQUEST = 'SEND_PUSH_NOTIFICATION_REQUEST';
const SEND_PUSH_NOTIFICATION_SUCCESS = 'SEND_PUSH_NOTIFICATION_SUCCESS';
const SEND_PUSH_NOTIFICATION_ERROR = 'SEND_PUSH_NOTIFICATION_ERROR';
// actions

export const getNotificationsReq = page => ({
  type: GET_NOTIFICATIONS_REQUEST,
  payload: page,
});

const getNotificationsSuccess = payload => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload,
});

const getNotificationsError = error => ({
  type: GET_NOTIFICATIONS_ERROR,
  error,
});

export const clearStateNotifications = () => ({
  type: CLEAR_STATE_NOTIFICATIONS,
});

export const postAcceptFollowReq = link => ({
  type: POST_ACCEPT_FOLLOW_REQUEST,
  link,
});

const postAcceptFollowSuccess = payload => ({
  type: POST_ACCEPT_FOLLOW_SUCCESS,
  payload,
});

const postAcceptFollowError = error => ({
  type: POST_ACCEPT_FOLLOW_ERROR,
  error,
});

export const postIgnoreFollowReq = link => ({
  type: POST_IGNORE_FOLLOW_REQUEST,
  link,
});

const postIgnoreFollowSuccess = payload => ({
  type: POST_IGNORE_FOLLOW_SUCCESS,
  payload,
});

const postIgnoreFollowError = error => ({
  type: POST_IGNORE_FOLLOW_ERROR,
  error,
});

export const deleteNotificationReq = id => ({
  type: DELETE_NOTIFICATION_REQUEST,
  payload: id,
});

const deleteNotificationSuccess = payload => ({
  type: DELETE_NOTIFICATION_SUCCESS,
  payload,
});

const deleteNotificationError = error => ({
  type: DELETE_NOTIFICATION_ERROR,
  error,
});

export const getUnReadNotificationReq = tokenNotification => ({
  type: GET_UN_READ_NOTIFICATION_REQUEST,
  tokenNotification,
});

const getUnReadNotificationSuccess = payload => ({
  type: GET_UN_READ_NOTIFICATION_SUCCESS,
  payload,
});

const getUnReadNotificationError = error => ({
  type: DELETE_NOTIFICATION_ERROR,
  error,
});

export const markAsReadNotificationsReq = () => ({
  type: MARK_AS_READ_NOTIFICATIONS_REQUEST,
});

const markAsReadNotificationsSuccess = payload => ({
  type: MARK_AS_READ_NOTIFICATIONS_SUCCESS,
  payload,
});

const markAsReadNotificationsError = error => ({
  type: MARK_AS_READ_NOTIFICATIONS_ERROR,
  error,
});

export const sendPushNotificationReq = payload => ({
  type: SEND_PUSH_NOTIFICATION_REQUEST,
  payload,
});

const sendPushNotificationSuccess = payload => ({
  type: SEND_PUSH_NOTIFICATION_SUCCESS,
  payload,
});

const sendPushNotificationError = error => ({
  type: SEND_PUSH_NOTIFICATION_ERROR,
  error,
});

// reducers
const initialState = {
  notifications: [],
  meta: {},
  loading: false,
  error: false,
  unRead: [],
};

export function getNotificationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: [...state.notifications, ...action.payload.data],
        meta: action.payload.meta,
        error: false,
      };
    case GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case CLEAR_STATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        loading: false,
        error: false,
      };
    case POST_ACCEPT_FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_ACCEPT_FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case POST_ACCEPT_FOLLOW_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case POST_IGNORE_FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_IGNORE_FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case POST_IGNORE_FOLLOW_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case DELETE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_NOTIFICATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_UN_READ_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        unRead: [],
      };
    case GET_UN_READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        unRead: action.payload,
      };
    case GET_UN_READ_NOTIFICATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        unRead: [],
      };

    case MARK_AS_READ_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MARK_AS_READ_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case MARK_AS_READ_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case SEND_PUSH_NOTIFICATION_REQUEST:
      return {
        ...state,
        error: false,
      };
    case SEND_PUSH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case SEND_PUSH_NOTIFICATION_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}

// saga

function* getNotifications({ payload }) {
  try {
    const notifications = yield call(NotificationsApi.getNotifications, payload);
    yield put(getNotificationsSuccess(notifications));
  } catch (error) {
    yield put(getNotificationsError(error));
  }
}

function* postAcceptFollow(data) {
  try {
    yield call(NotificationsApi.acceptFollow, data.link);
    yield put(clearStateNotifications());
    yield put(postAcceptFollowSuccess());
    yield put(getNotificationsReq());
  } catch (error) {
    yield put(postAcceptFollowError(error));
  }
}
function* postIgnoreFollow(data) {
  try {
    yield call(NotificationsApi.ignoreFollow, data.link);
    yield put(clearStateNotifications());
    yield put(postIgnoreFollowSuccess());
    yield put(getNotificationsReq());
  } catch (error) {
    yield put(postIgnoreFollowError(error));
  }
}

function* deleteNotification({ payload }) {
  try {
    const response = yield call(NotificationsApi.deleteNotification, payload);
    yield put(clearStateNotifications());
    yield put(deleteNotificationSuccess(response));
    yield put(getNotificationsReq());
  } catch (error) {
    yield put(deleteNotificationError(error));
  }
}

function* getUnReadNotification({ tokenNotification }) {
  try {
    const response = yield call(NotificationsApi.getUnRead);

    if (tokenNotification && response.data.length) {
      yield put(
        sendPushNotificationReq({
          to: tokenNotification,
          title: 'Unread notification',
          body: 'You have unread notifications',
          channelId: 'orders',
          sound: 'default',
          priority: 'high',
        })
      );
    }
    yield put(getUnReadNotificationSuccess(response));
  } catch (error) {
    yield put(getUnReadNotificationError(error));
  }
}

function* markAsReadNotifications() {
  try {
    const response = yield call(NotificationsApi.markAsReadNotifications);
    yield put(markAsReadNotificationsSuccess(response));
    yield put(getUnReadNotificationReq(response));
  } catch (error) {
    yield put(markAsReadNotificationsError(error));
  }
}

function* pushNotification({ payload }) {
  try {
    const response = yield call(NotificationsApi.pushNotification, payload);
    yield put(sendPushNotificationSuccess(response));
  } catch (error) {
    yield put(sendPushNotificationError(error));
  }
}

export function* watchGetNotifications() {
  yield takeLatest(GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export function* watchPostAcceptFollow() {
  yield takeLatest(POST_ACCEPT_FOLLOW_REQUEST, postAcceptFollow);
}

export function* watchPostIgnoreFollow() {
  yield takeLatest(POST_IGNORE_FOLLOW_REQUEST, postIgnoreFollow);
}

export function* watchDeleteNotification() {
  yield takeLatest(DELETE_NOTIFICATION_REQUEST, deleteNotification);
}

export function* watchUnReadNotification() {
  yield takeLatest(GET_UN_READ_NOTIFICATION_REQUEST, getUnReadNotification);
}

export function* watchMarkAsReadNotifications() {
  yield takeLatest(MARK_AS_READ_NOTIFICATIONS_REQUEST, markAsReadNotifications);
}
export function* watchPushNotification() {
  yield takeLatest(SEND_PUSH_NOTIFICATION_REQUEST, pushNotification);
}
