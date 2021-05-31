import { combineReducers } from 'redux';
import { userDataReducer } from '../redux-controller/user';
import { addPostReducer } from '../redux-controller/post';
import { getNotificationsReducer } from '../redux-controller/notifications';
import { searhDataReducer } from '../redux-controller/search';
import { followingReducer } from '../redux-controller/follow';
import { commentReducer } from '../redux-controller/comment';
import { paymentReducer } from '../redux-controller/payment';

const rootReducer = combineReducers({
  user: userDataReducer,
  search: searhDataReducer,
  posts: addPostReducer,
  notifications: getNotificationsReducer,
  follow: followingReducer,
  comments: commentReducer,
  payment: paymentReducer,
});

export default rootReducer;
