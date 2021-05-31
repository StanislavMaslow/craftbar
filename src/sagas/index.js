import { fork, all } from 'redux-saga/effects';

import {
  watchGetMyUserData,
  watchGetUserData,
  watchLogOut,
  watchSignUp,
  watchUpdateUser,
  watchGetAvailability,
  watchAddAvailability,
  watchEditAvailability,
  watchDeleteAvailability,
  watchAddRating,
  watchEditRating,
  watchSignUpFacebook,
  watchPostReport,
  watchGetTermsOfUse,
  watchWatchPrivacyPolicy,
  watchReportUser,
} from '../redux-controller/user';
import {
  watchGetNotifications,
  watchPostAcceptFollow,
  watchPostIgnoreFollow,
  watchDeleteNotification,
  watchUnReadNotification,
  watchMarkAsReadNotifications,
  watchPushNotification,
} from '../redux-controller/notifications';
import { watchSearchUsersData } from '../redux-controller/search';
import {
  watchAddPost,
  watchGetUserPosts,
  watchGetFeed,
  watchGetCheckIn,
  watchToggleLikePost,
  watchGetPost,
  watchDeletePost,
  watchEditPost,
  watchSharePost,
  watchSearchPeople,
  watchReportPost,
} from '../redux-controller/post';

import {
  watchFollow,
  watchGetUserFollowers,
  watchRemoveFollower,
  watchUnFollow,
  watchGetUserFollowings,
  watchInviteToFollowRequest,
} from '../redux-controller/follow';

import {
  watchGetComments,
  watchAddComment,
  watchEditComment,
  watchDeleteComment,
} from '../redux-controller/comment';

import {
  watchAddCard,
  watchConfirmTip,
  watchAddIdentity,
  watchGetTips,
  watchGetTip,
  // watchdithdrawTip,
  watchWithdrawFunds,
  watchGetCards,
  watchGetIdentity,
  watchEditIdentity,
  watchRemoveIdentity,
  watchDeleteCard,
  watchSelectCard,
  watchGetBalance,
  watchGetPayouts,
  watchGetPayout,
} from '../redux-controller/payment';

/*eslint-disable */
export default function* rootSaga() {
  /* eslint-enable */
  yield all([
    fork(watchGetMyUserData),
    fork(watchGetUserData),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchGetUserPosts),
    fork(watchEditPost),
    fork(watchGetFeed),
    fork(watchGetCheckIn),
    fork(watchGetNotifications),
    fork(watchDeleteNotification),
    fork(watchUnReadNotification),
    fork(watchMarkAsReadNotifications),
    fork(watchSearchUsersData),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchGetUserFollowers),
    fork(watchPostAcceptFollow),
    fork(watchPostIgnoreFollow),
    fork(watchToggleLikePost),
    fork(watchGetUserFollowings),
    fork(watchRemoveFollower),
    fork(watchGetPost),
    fork(watchGetComments),
    fork(watchAddComment),
    fork(watchUpdateUser),
    fork(watchAddCard),
    fork(watchConfirmTip),
    fork(watchGetCards),
    fork(watchAddIdentity),
    fork(watchEditRating),
    fork(watchGetTips),
    fork(watchGetTip),
    // fork(watchdithdrawTip),
    fork(watchWithdrawFunds),
    fork(watchGetIdentity),
    fork(watchEditIdentity),
    fork(watchRemoveIdentity),
    fork(watchDeleteCard),
    fork(watchSelectCard),
    fork(watchGetAvailability),
    fork(watchAddAvailability),
    fork(watchEditAvailability),
    fork(watchDeleteAvailability),
    fork(watchInviteToFollowRequest),
    fork(watchGetBalance),
    fork(watchGetPayouts),
    fork(watchGetPayout),
    fork(watchAddRating),
    fork(watchEditComment),
    fork(watchDeleteComment),
    fork(watchSignUpFacebook),
    fork(watchSharePost),
    fork(watchSearchPeople),
    fork(watchPostReport),
    fork(watchGetTermsOfUse),
    fork(watchWatchPrivacyPolicy),
    fork(watchPushNotification),
    fork(watchReportPost),
    fork(watchReportUser),
  ]);
}