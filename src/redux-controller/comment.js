import { call, put, takeLatest } from 'redux-saga/effects';
import CommentApi from '../api/comment';

const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR';

const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

// actions
export const getCommentsReq = (id, page) => ({
  type: GET_COMMENTS_REQUEST,
  id,
  page,
});

const getCommentsSuccess = payload => ({
  type: GET_COMMENTS_SUCCESS,
  payload,
});

const getCommentsError = error => ({
  type: GET_COMMENTS_ERROR,
  error,
});

export const addCommentReq = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const addCommentSuccess = payload => ({
  type: ADD_COMMENT_SUCCESS,
  payload,
});

const addCommentError = error => ({
  type: ADD_COMMENT_ERROR,
  error,
});

export const editCommentReq = data => ({
  type: EDIT_COMMENT_REQUEST,
  data,
});

const editCommentSuccess = payload => ({
  type: EDIT_COMMENT_SUCCESS,
  payload,
});

const editCommentError = error => ({
  type: EDIT_COMMENT_ERROR,
  error,
});

export const deleteCommentReq = data => ({
  type: DELETE_COMMENT_REQUEST,
  data,
});

const deleteCommentSuccess = payload => ({
  type: DELETE_COMMENT_SUCCESS,
  payload,
});

const deleteCommentError = error => ({
  type: DELETE_COMMENT_ERROR,
  error,
});

// reducers
const initialState = {
  comments: {},
  loading: false,
  error: false,
  isCheckInLoading: false,
};

export function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: false,
      };
    case GET_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case EDIT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case EDIT_COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_COMMENT_ERROR:
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

function* getComments(data) {
  try {
    const comments = yield call(CommentApi.getComments, data.id, data.page);

    yield put(getCommentsSuccess(comments));
  } catch (error) {
    yield put(getCommentsError(error));
  }
}
function* addComment(data) {
  try {
    yield call(CommentApi.addComment, data.data);
    yield put(addCommentSuccess());
    yield put(getCommentsReq(data.data.id, data.data.page));
  } catch (error) {
    yield put(addCommentError(error));
  }
}

function* editComment(data) {
  try {
    yield call(CommentApi.editComment, data.data);
    yield put(editCommentSuccess());
    yield put(getCommentsReq(data.data.postId, data.data.page));
  } catch (error) {
    yield put(editCommentError(error));
  }
}

function* deleteComment(action) {
  try {
    yield call(CommentApi.deleteComment, action.data.commentID);
    yield put(deleteCommentSuccess());
    yield put(getCommentsReq(action.data.postId, action.data.page));
  } catch (error) {
    yield put(deleteCommentError(error));
  }
}

export function* watchGetComments() {
  yield takeLatest(GET_COMMENTS_REQUEST, getComments);
}

export function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}

export function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}
