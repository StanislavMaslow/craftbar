import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import PostApi from '../api/post';
import NavigationService from '../services/navigation';

import { getMyUserDataReq } from './user';

const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const ADD_POST_ERROR = 'ADD_POST_ERROR';

const GET_USER_POSTS_REQUEST = 'GET_USER_POSTS_REQUEST';
const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';
const GET_USER_POSTS_ERROR = 'GET_USER_POSTS_ERROR';

const CLEAR_USER_POSTS_STATE = 'CLEAR_USER_POSTS_STATE';
const CLEAR_USER_FEEDS_STATE = 'CLEAR_USER_FEEDS_STATE';

const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
const GET_FEED_SUCCESS = 'GETFEEDS_SUCCESS';
const GET_FEED_ERROR = 'GET_FEED_ERROR';

const SET_FEED_LIKE = 'SET_FEED_LIKE';

const GET_CHECK_IN_REQUEST = 'GET_CHECK_IN_REQUEST';
const GET_CHECK_IN_SUCCESS = 'GET_CHECK_IN_SUCCESS';
const GET_CHECK_IN_ERROR = 'GET_CHECK_IN_ERROR';

const POST_TOGGLE_LIKE_REQUEST = 'POST_TOGGLE_LIKE_REQUEST';
const POST_TOGGLE_LIKE_SUCCESS = 'POST_TOGGLE_LIKE_SUCCESS';
const POST_TOGGLE_LIKE_ERROR = 'POST_TOGGLE_LIKE_ERROR';

const GET_POST_DATA_REQUEST = 'GET_POST_DATA_REQUEST';
const GET_POST_DATA_SUCCESS = 'GET_POST_DATA_SUCCESS';
const GET_POST_DATA_ERROR = 'GET_POST_DATA_ERROR';

const DELETE_POST_DATA_REQUEST = 'DELETE_POST_DATA_REQUEST';
const DELETE_POST_DATA_SUCCESS = 'DELETE_POST_DATA_SUCCESS';
const DELETE_POST_DATA_ERROR = 'DELETE_POST_DATA_ERROR';

const EDIT_POST_DATA_REQUEST = 'EDIT_POST_DATA_REQUEST';
const EDIT_POST_DATA_SUCCESS = 'EDIT_POST_DATA_SUCCESS';
const EDIT_POST_DATA_ERROR = 'EDIT_POST_DATA_ERROR';

const SHARE_POST_DATA_REQUEST = 'SHARE_POST_DATA_REQUEST';
const SHARE_POST_DATA_SUCCESS = 'SHARE_POST_DATA_SUCCESS';
const SHARE_POST_DATA_ERROR = 'SHARE_POST_DATA_ERROR';

const GET_SEARCH_PEOPLE_REQUEST = 'GET_SEARCH_PEOPLE_REQUEST';
const GET_SEARCH_PEOPLE_SUCCESS = 'GET_SEARCH_PEOPLE_SUCCESS';
const GET_SEARCH_PEOPLE_ERROR = 'GET_SEARCH_PEOPLE_ERROR';

const SET_COUNT_SHARE_POST = 'SET_COUNT_SHARE_POST';

const REPORT_POST_REQUEST = 'REPORT_POST_REQUEST';
const REPORT_POST_SUCCESS = 'REPORT_POST_SUCCESS';
const REPORT_POST_ERROR = 'REPORT_POST_ERROR';

// actions

export const addPostReq = data => ({
  type: ADD_POST_REQUEST,
  data,
});

const addPostSuccess = payload => ({
  type: ADD_POST_SUCCESS,
  payload,
});

const addPostError = error => ({
  type: ADD_POST_ERROR,
  error,
});

export const getUserPostsReq = (id, page) => ({
  type: GET_USER_POSTS_REQUEST,
  payload: { id, page },
});

const getUserPostsSuccess = payload => ({
  type: GET_USER_POSTS_SUCCESS,
  payload,
});

const getUserPostsError = error => ({
  type: GET_USER_POSTS_ERROR,
  error,
});

export const clearUserPostsState = () => ({
  type: CLEAR_USER_POSTS_STATE,
});

export const clearUserFeedsState = () => ({
  type: CLEAR_USER_FEEDS_STATE,
});

export const getFeedReq = data => ({
  type: GET_FEED_REQUEST,
  data,
});

const getFeedSuccess = payload => ({
  type: GET_FEED_SUCCESS,
  payload,
});

const getFeedError = error => ({
  type: GET_FEED_ERROR,
  error,
});

const setFeedLike = payload => ({
  type: SET_FEED_LIKE,
  payload,
});

export const getCheckInReq = query => ({
  type: GET_CHECK_IN_REQUEST,
  payload: query,
});

const getCheckInSuccess = checkIn => ({
  type: GET_CHECK_IN_SUCCESS,
  payload: checkIn,
});

const getCheckInError = error => ({
  type: GET_CHECK_IN_ERROR,
  payload: error,
});

export const postToggleLikeReq = (id, post) => ({
  type: POST_TOGGLE_LIKE_REQUEST,
  payload: { id, post },
});

const postToggleLikeSuccess = like => ({
  type: POST_TOGGLE_LIKE_SUCCESS,
  payload: like,
});

const postToggleLikeError = error => ({
  type: POST_TOGGLE_LIKE_ERROR,
  payload: error,
});

export const getPostDataReq = id => ({
  type: GET_POST_DATA_REQUEST,
  payload: id,
});

const getPostDataSuccess = payload => ({
  type: GET_POST_DATA_SUCCESS,
  payload,
});

const getPostDataError = error => ({
  type: GET_POST_DATA_ERROR,
  error,
});

export const deletePostReq = id => ({
  type: DELETE_POST_DATA_REQUEST,
  payload: id,
});

const deletePostSuccess = payload => ({
  type: DELETE_POST_DATA_SUCCESS,
  payload,
});

const deletePostError = error => ({
  type: DELETE_POST_DATA_ERROR,
  error,
});

export const editPostReq = payload => ({
  type: EDIT_POST_DATA_REQUEST,
  payload,
});

const editPostSuccess = () => ({
  type: EDIT_POST_DATA_SUCCESS,
});

const editPostError = error => ({
  type: EDIT_POST_DATA_ERROR,
  error,
});

export const sharePostReq = (id, type) => ({
  type: SHARE_POST_DATA_REQUEST,
  payload: { id, type },
});

const sharePostSuccess = payload => ({
  type: SHARE_POST_DATA_SUCCESS,
  payload,
});

const sharePostError = error => ({
  type: SHARE_POST_DATA_ERROR,
  error,
});

const setCountShare = id => ({
  type: SET_COUNT_SHARE_POST,
  payload: id,
});

export const getSearchPeopleReq = name => ({
  type: GET_SEARCH_PEOPLE_REQUEST,
  payload: name,
});

const getSearchPeopleSuccess = people => ({
  type: GET_SEARCH_PEOPLE_SUCCESS,
  payload: people,
});

const getSearchPeopleError = error => ({
  type: GET_SEARCH_PEOPLE_ERROR,
  error,
});

export const reportPostReq = data => ({
  type: REPORT_POST_REQUEST,
  data,
});

const reportPostSuccess = payload => ({
  type: REPORT_POST_SUCCESS,
  payload,
});

const reportPostError = error => ({
  type: REPORT_POST_ERROR,
  error,
});

// reducers
const initialState = {
  posts: [],
  feed: [],
  post: {},
  loading: false,
  isPostLoading: false,
  error: false,
  checkIn: [],
  people: [],
  isPeopleLoading: false,
  isCheckInLoading: false,
  meta: {},
};

export function addPostReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_USER_POSTS_REQUEST:
      return {
        ...state,
        isPostLoading: true,
        meta: {},
        error: false,
      };

    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        posts: [...state.posts, ...action.payload.data],
        meta: action.payload.meta,
        error: false,
      };

    case GET_USER_POSTS_ERROR:
      return {
        ...state,
        isPostLoading: false,
        posts: [],
        meta: {},
        error: true,
      };

    case CLEAR_USER_POSTS_STATE:
      return {
        ...state,
        posts: [],
        isPostLoading: true,
        error: true,
      };

    case CLEAR_USER_FEEDS_STATE:
      return {
        ...state,
        feed: [],
        isPostLoading: true,
        error: true,
      };

    case GET_FEED_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        feed: [...state.feed, ...action.payload.data],
        meta: action.payload.meta,
        error: false,
      };
    case GET_FEED_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_POST_DATA_REQUEST:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case GET_POST_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        post: action.payload,
        error: false,
      };
    case GET_POST_DATA_ERROR:
      return {
        ...state,
        isPostLoading: false,
        error: true,
      };

    case DELETE_POST_DATA_REQUEST:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case DELETE_POST_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        posts: state.posts.filter(post => action.payload !== post.id),
        error: false,
      };
    case DELETE_POST_DATA_ERROR:
      return {
        ...state,
        isPostLoading: false,
        error: true,
      };

    case SET_FEED_LIKE:
      return {
        ...state,
        loading: false,
        feed: state.feed.map(feed => {
          if (feed.id === action.payload.id) {
            return {
              ...feed,
              likes: feed.likes + action.payload.like,
            };
          }
          return feed;
        }),

        error: false,
      };

    case GET_CHECK_IN_REQUEST:
      return {
        ...state,
        isCheckInLoading: true,
        error: false,
      };

    case GET_CHECK_IN_SUCCESS:
      return {
        ...state,
        checkIn: action.payload,
        isCheckInLoading: false,
        error: false,
      };
    case GET_CHECK_IN_ERROR:
      return {
        ...state,
        isCheckInLoading: false,
        error: false,
      };

    case POST_TOGGLE_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case POST_TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              likes: post.likes + action.payload.like,
            };
          }
          return post;
        }),

        loading: false,
        error: false,
      };
    case POST_TOGGLE_LIKE_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case EDIT_POST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case EDIT_POST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case EDIT_POST_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_SEARCH_PEOPLE_REQUEST:
      return {
        ...state,
        isPeopleLoading: true,
        people: [],
        error: false,
      };

    case GET_SEARCH_PEOPLE_SUCCESS:
      return {
        ...state,
        isPeopleLoading: false,
        people: action.payload,
        error: false,
      };

    case GET_SEARCH_PEOPLE_ERROR:
      return {
        ...state,
        isPeopleLoading: false,
        people: [],
        error: true,
      };

    case SHARE_POST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case SHARE_POST_DATA_SUCCESS:
      return {
        ...state,
        feed: state.feed.map(f => {
          if (f.id === action.payload) {
            return { ...f, shares: f.shares + 1 };
          }
          return f;
        }),
        loading: false,
        error: false,
      };

    case SET_COUNT_SHARE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload) {
            return { ...post, shares: post.shares + 1 };
          }
          return post;
        }),
        loading: false,
        error: false,
      };

    case SHARE_POST_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case REPORT_POST_REQUEST:
      return {
        ...state,

        loading: true,
        error: false,
      };
    case REPORT_POST_SUCCESS:
      return {
        ...state,

        loading: false,
        error: false,
      };
    case REPORT_POST_ERROR:
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

function* addPost(data) {
  try {
    yield call(PostApi.addPost, data.data);
    yield put(addPostSuccess());
    yield put(getMyUserDataReq());
    Alert.alert('Your post has been added!');
    yield call(NavigationService.navigate, 'MyProfileScreen');
  } catch (error) {
    yield put(addPostError(error));
  }
}

function* searchCheckIn({ payload }) {
  try {
    const response = yield call(PostApi.checkIn, payload);
    yield put(getCheckInSuccess(response.data));
  } catch (error) {
    yield put(getCheckInError(error));
  }
}

function* getUserPosts({ payload }) {
  try {
    const posts = yield call(PostApi.getUserPosts, payload.id, payload.page);
    yield put(getUserPostsSuccess(posts));
  } catch (error) {
    yield put(getUserPostsError(error));
  }
}

function* getFeed({ data }) {
  try {
    const feed = yield call(PostApi.getFeed, data);
    yield put(getFeedSuccess(feed));
  } catch (error) {
    yield put(getFeedError(error));
  }
}

function* toggleLikePost({ payload }) {
  try {
    const response = yield call(PostApi.toggleLikePost, payload.id);

    if (response.data.message === 'You disliked this post.') {
      yield put(postToggleLikeSuccess({ like: -1, id: payload.id }));
      yield put(setFeedLike({ like: -1, id: payload.id }));
    } else {
      yield put(postToggleLikeSuccess({ like: 1, id: payload.id }));
      yield put(setFeedLike({ like: 1, id: payload.id }));
    }
    if (payload.post) {
      yield put(getPostDataReq(payload.id));
    }
  } catch (error) {
    yield put(postToggleLikeError(error));
  }
}

function* getPost({ payload }) {
  try {
    const posts = yield call(PostApi.getPost, payload);
    yield put(getPostDataSuccess(posts));
  } catch (error) {
    yield put(getPostDataError(error));
  }
}

function* deletePost({ payload }) {
  try {
    yield call(PostApi.deletePost, payload);

    yield put(deletePostSuccess(payload));
  } catch (error) {
    yield put(deletePostError(error));
  }
}

function* editPost({ payload }) {
  try {
    yield call(PostApi.editPost, payload);

    yield put(editPostSuccess());
    yield put(getMyUserDataReq());
    yield call(NavigationService.navigate, 'MyProfileScreen');
  } catch (error) {
    yield put(editPostError(error));
  }
}

function* sharePost({ payload }) {
  const { id, type } = payload;
  try {
    yield call(PostApi.sharePost, id);
    if (type && type === 'posts') {
      yield put(setCountShare(id));
      yield put(getPostDataReq(id));
    } else {
      yield put(sharePostSuccess(id));
    }
    Alert.alert('Post was shared on your page!');
  } catch (error) {
    yield put(sharePostError(error));
  }
}

function* searchPeople({ payload }) {
  try {
    const response = yield call(PostApi.searchPeople, payload);

    yield put(getSearchPeopleSuccess(response.data));
  } catch (error) {
    yield put(getSearchPeopleError(error));
  }
}

function* reportPost(data) {
  try {
    yield call(PostApi.reportPost, data.data);
    yield put(reportPostSuccess());
    Alert.alert('Your report has been sent!');
  } catch (error) {
    yield put(reportPostError(error));
  }
}

export function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export function* watchGetUserPosts() {
  yield takeLatest(GET_USER_POSTS_REQUEST, getUserPosts);
}

export function* watchGetFeed() {
  yield takeLatest(GET_FEED_REQUEST, getFeed);
}

export function* watchGetCheckIn() {
  yield takeLatest(GET_CHECK_IN_REQUEST, searchCheckIn);
}

export function* watchToggleLikePost() {
  yield takeLatest(POST_TOGGLE_LIKE_REQUEST, toggleLikePost);
}

export function* watchGetPost() {
  yield takeLatest(GET_POST_DATA_REQUEST, getPost);
}

export function* watchDeletePost() {
  yield takeLatest(DELETE_POST_DATA_REQUEST, deletePost);
}

export function* watchEditPost() {
  yield takeLatest(EDIT_POST_DATA_REQUEST, editPost);
}

export function* watchSharePost() {
  yield takeLatest(SHARE_POST_DATA_REQUEST, sharePost);
}

export function* watchSearchPeople() {
  yield takeLatest(GET_SEARCH_PEOPLE_REQUEST, searchPeople);
}

export function* watchReportPost() {
  yield takeLatest(REPORT_POST_REQUEST, reportPost);
}
