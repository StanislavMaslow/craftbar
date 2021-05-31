import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserDataReq, getMyUserDataReq } from './user';
import FollowApi from '../api/follow';
import { deleteNotificationReq, getNotificationsReq } from './notifications';

import { getSearchDataReq } from './search';

const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
const FOLLOW_ERROR = 'FOLLOW_ERROR';

const UN_FOLLOW_REQUEST = 'UN_FOLLOW_REQUEST';
const UN_FOLLOW_SUCCESS = 'UN_FOLLOW_SUCCESS';
const UN_FOLLOW_ERROR = 'UN_FOLLOW_ERROR';

const GET_USER_FOLLOWERS_REQUEST = 'GET_USER_FOLLOWERS_REQUEST';
const GET_USER_FOLLOWERS_SUCCESS = 'GET_USER_FOLLOWERS_SUCCESS';
const GET_USER_FOLLOWERS_ERROR = 'GET_USER_FOLLOWERS_ERROR';

const GET_USER_FOLLOWINGS_REQUEST = 'GET_USER_FOLLOWINGS_REQUEST';
const GET_USER_FOLLOWINGS_SUCCESS = 'GET_USER_FOLLOWINGS_SUCCESS';
const GET_USER_FOLLOWINGS_ERROR = 'GET_USER_FOLLOWINGS_ERROR';

const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
const REMOVE_FOLLOWER_ERROR = 'REMOVE_FOLLOWER_ERROR';

const INVITE_TO_FOLLOW_REQUEST = 'INVITE_TO_FOLLOW_REQUEST';
const INVITE_TO_FOLLOW_SUCCESS = 'INVITE_TO_FOLLOW_SUCCESS';
const INVITE_TO_FOLLOW_ERROR = 'INVITE_TO_FOLLOW_ERROR';

// actions

export const followReq = (id, notificationId, filter) => ({
  type: FOLLOW_REQUEST,
  payload: { id, notificationId, filter },
});

const followSuccess = payload => ({
  type: FOLLOW_SUCCESS,
  payload,
});

const followError = error => ({
  type: FOLLOW_ERROR,
  error,
});

export const unFollowReq = (userId, loggedUserId, filter) => ({
  type: UN_FOLLOW_REQUEST,
  payload: { userId, loggedUserId, filter },
});

const unFollowSuccess = payload => ({
  type: UN_FOLLOW_SUCCESS,
  payload,
});

const unFollowError = error => ({
  type: UN_FOLLOW_ERROR,
  error,
});

export const getUserFollowersReq = (id, search, page) => ({
  type: GET_USER_FOLLOWERS_REQUEST,
  payload: { id, search, page },
});

const getUserFollowersSuccess = payload => ({
  type: GET_USER_FOLLOWERS_SUCCESS,
  payload,
});

const getUserFollowersError = error => ({
  type: GET_USER_FOLLOWERS_ERROR,
  error,
});

export const getUserFollowingsReq = (id, search, page) => ({
  type: GET_USER_FOLLOWINGS_REQUEST,
  payload: { id, search, page },
});

const getUserFollowingsSuccess = payload => ({
  type: GET_USER_FOLLOWINGS_SUCCESS,
  payload,
});

const getUserFollowingsError = error => ({
  type: GET_USER_FOLLOWINGS_ERROR,
  error,
});

export const removeFollowerReq = (userId, loggedUserId) => ({
  type: REMOVE_FOLLOWER_REQUEST,
  userId,
  loggedUserId,
});

const removeFollowerSuccess = payload => ({
  type: REMOVE_FOLLOWER_SUCCESS,
  payload,
});

const removeFollowerError = error => ({
  type: REMOVE_FOLLOWER_ERROR,
  error,
});

export const inviteToFollowReq = (id, filter) => ({
  type: INVITE_TO_FOLLOW_REQUEST,
  payload: { id, filter },
});

const inviteToFollowSuccess = () => ({
  type: INVITE_TO_FOLLOW_SUCCESS,
});

const inviteToFollowError = error => ({
  type: INVITE_TO_FOLLOW_ERROR,
  error,
});

// reducers
const initialState = {
  followers: {},
  followings: {},
  followersLoading: false,
  followingLoading: false,
  error: false,
};

export function followingReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case UN_FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UN_FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case UN_FOLLOW_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_USER_FOLLOWERS_REQUEST:
      return {
        ...state,
        followersLoading: true,
        error: false,
      };
    case GET_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followersLoading: false,
        followers: action.payload,
        error: false,
      };
    case GET_USER_FOLLOWERS_ERROR:
      return {
        ...state,
        followersLoading: false,
        error: true,
      };

    case GET_USER_FOLLOWINGS_REQUEST:
      return {
        ...state,
        followingLoading: true,
        error: false,
      };
    case GET_USER_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followingLoading: false,
        followings: action.payload,
        error: false,
      };
    case GET_USER_FOLLOWINGS_ERROR:
      return {
        ...state,
        followingLoading: false,
        error: true,
      };
    case REMOVE_FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case REMOVE_FOLLOWER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case REMOVE_FOLLOWER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case INVITE_TO_FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case INVITE_TO_FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case INVITE_TO_FOLLOW_ERROR:
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

function* follow({ payload }) {
  const { id, notificationId, filter } = payload;

  try {
    yield call(FollowApi.follow, id);
    if (notificationId) {
      yield put(deleteNotificationReq(notificationId));
      yield put(getNotificationsReq());
    }
    yield put(followSuccess());
    yield put(getSearchDataReq(filter));
    yield put(getUserDataReq(id));
  } catch (error) {
    yield put(followError(error));
  }
}

function* unFollow({ payload }) {
  const { userId, loggedUserId, filter } = payload;

  try {
    yield call(FollowApi.unFollow, userId);
    yield put(unFollowSuccess());
    yield put(getSearchDataReq(filter));
    yield put(getUserDataReq(userId));
    if (loggedUserId) {
      yield put(getUserFollowingsReq(loggedUserId));
      yield put(getMyUserDataReq());
    }
  } catch (error) {
    yield put(unFollowError(error));
  }
}

function* getUserFollowers({ payload }) {
  const { id, search, page } = payload;

  try {
    const followers = yield call(FollowApi.getUserFollowers, id, search, page);
    yield put(getUserFollowersSuccess(followers));
  } catch (error) {
    yield put(getUserFollowersError(error));
  }
}

function* getUserFollowings({ payload }) {
  const { id, search, page } = payload;

  try {
    const followings = yield call(FollowApi.getUserFollowings, id, search, page);
    yield put(getUserFollowingsSuccess(followings));
  } catch (error) {
    yield put(getUserFollowingsError(error));
  }
}

function* removeFollower(data) {
  try {
    yield call(FollowApi.removeFollower, data.userId);
    yield put(removeFollowerSuccess());
    if (data.loggedUserId) {
      yield put(getUserFollowersReq(data.loggedUserId));
      yield put(getMyUserDataReq());
    }
  } catch (error) {
    yield put(removeFollowerError(error));
  }
}

function* inviteToFollow({ payload }) {
  try {
    const { id, filter } = payload;

    yield call(FollowApi.inviteToFollow, id);
    yield put(inviteToFollowSuccess());
    yield put(getSearchDataReq(filter));
    yield put(getUserDataReq(id));
  } catch (error) {
    yield put(inviteToFollowError(error));
  }
}

export function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

export function* watchUnFollow() {
  yield takeLatest(UN_FOLLOW_REQUEST, unFollow);
}

export function* watchGetUserFollowers() {
  yield takeLatest(GET_USER_FOLLOWERS_REQUEST, getUserFollowers);
}

export function* watchGetUserFollowings() {
  yield takeLatest(GET_USER_FOLLOWINGS_REQUEST, getUserFollowings);
}

export function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export function* watchInviteToFollowRequest() {
  yield takeLatest(INVITE_TO_FOLLOW_REQUEST, inviteToFollow);
}
