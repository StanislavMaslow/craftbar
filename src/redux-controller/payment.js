import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import PaymentApi from '../api/payment';
import navigation from '../services/navigation';

const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
const ADD_CARD_ERROR = 'ADD_CARD_ERROR';

const GET_CARDS_REQUEST = 'GET_CARDS_REQUEST';
const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
const GET_CARDS_ERROR = 'GET_CARDS_ERROR';

const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR';

const CONFIRM_TIP_REQUEST = 'CONFIRM_TIP_REQUEST';
const CONFIRM_TIP_SUCCESS = 'CONFIRM_TIP_SUCCESS';
const CONFIRM_TIP_ERROR = 'CONFIRM_TIP_ERROR';

const ADD_IDENTITY_REQUEST = 'ADD_IDENTITY_REQUEST';
const ADD_IDENTITY_SUCCESS = 'ADD_IDENTITY_SUCCESS';
const ADD_IDENTITY_ERROR = 'ADD_IDENTITY_ERROR';

const GET_TIPS_REQUEST = 'GET_TIPS_REQUEST';
const GET_TIPS_SUCCESS = 'GET_TIPS_SUCCESS';
const GET_TIPS_ERROR = 'GET_TIPS_ERROR';

const GET_TIP_REQUEST = 'GET_TIP_REQUEST';
const GET_TIP_SUCCESS = 'GET_TIP_SUCCESS';
const GET_TIP_ERROR = 'GET_TIP_ERROR';

// const WITHDRAW_TIP_REQUEST = 'WITHDRAW_TIP_REQUEST';
// const WITHDRAW_TIP_SUCCESS = 'WITHDRAW_TIP_SUCCESS';
// const WITHDRAW_TIP_ERROR = 'WITHDRAW_TIP_ERROR';

const WITHDRAW_FUNDS_REQUEST = 'WITHDRAW_FUNDS_REQUEST';
const WITHDRAW_FUNDS_SUCCESS = 'WITHDRAW_FUNDS_SUCCESS';
const WITHDRAW_FUNDS_ERROR = 'WITHDRAW_FUNDS_ERROR';

const GET_IDENTITY_REQUEST = 'GET_IDENTITY_REQUEST';
const GET_IDENTITY_SUCCESS = 'GET_IDENTITY_SUCCESS';
const GET_IDENTITY_ERROR = 'GET_IDENTITY_ERROR';

const EDIT_IDENTITY_REQUEST = 'EDIT_IDENTITY_REQUEST';
const EDIT_IDENTITY_SUCCESS = 'EDIT_IDENTITY_SUCCESS';
const EDIT_IDENTITY_ERROR = 'EDIT_IDENTITY_ERROR';

const REMOVE_IDENTITY_REQUEST = 'REMOVE_IDENTITY_REQUEST';
const REMOVE_IDENTITY_SUCCESS = 'REMOVE_IDENTITY_SUCCESS';
const REMOVE_IDENTITY_ERROR = 'REMOVE_IDENTITY_ERROR';

const POST_SELECT_CARD_REQUEST = 'POST_SELECT_CARD_REQUEST';
const POST_SELECT_CARD_SUCCESS = 'POST_SELECT_CARD_SUCCESS';
const POST_SELECT_CARD_ERROR = 'POST_SELECT_CARD_ERROR';

const GET_BALANCE_REQUEST = 'GET_BALANCE_REQUEST';
const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
const GET_BALANCE_ERROR = 'GET_BALANCE_ERROR';

const GET_PAYOUT_REQUEST = 'GET_PAYOUT_REQUEST';
const GET_PAYOUT_SUCCESS = 'GET_PAYOUT_SUCCESS';
const GET_PAYOUT_ERROR = 'GET_PAYOUT_ERROR';

const GET_PAYOUTS_REQUEST = 'GET_PAYOUTS_REQUEST';
const GET_PAYOUTS_SUCCESS = 'GET_PAYOUTS_SUCCESS';
const GET_PAYOUTS_ERROR = 'GET_PAYOUTS_ERROR';

const CLEAR_ARRAY_TIPS_REQ = 'CLEAR_ARRAY_TIPS_REQ';
const CLEAR_ARRAY_PAYOUTS_REQ = 'CLEAR_ARRAY_PAYOUTS_REQ';

// actions
export const addCardReq = data => ({
  type: ADD_CARD_REQUEST,
  data,
});

const addCardSuccess = payload => ({
  type: ADD_CARD_SUCCESS,
  payload,
});

const addCardError = error => ({
  type: ADD_CARD_ERROR,
  error,
});

export const confirmTipReq = data => ({
  type: CONFIRM_TIP_REQUEST,
  data,
});

const confirmTipSuccess = payload => ({
  type: CONFIRM_TIP_SUCCESS,
  payload,
});

const confirmTipError = error => ({
  type: CONFIRM_TIP_ERROR,
  error,
});

export const getCardsReq = () => ({
  type: GET_CARDS_REQUEST,
});

const getCardsSuccess = payload => ({
  type: GET_CARDS_SUCCESS,
  payload,
});

const getCardsError = error => ({
  type: GET_CARDS_ERROR,
  payload: error,
});

export const getIdentityReq = () => ({
  type: GET_IDENTITY_REQUEST,
});

const getIdentitySuccess = payload => ({
  type: GET_IDENTITY_SUCCESS,
  payload,
});

const getIdentityError = error => ({
  type: GET_IDENTITY_ERROR,
  error,
});

export const addIdentityReq = data => ({
  type: ADD_IDENTITY_REQUEST,
  data,
});

const addIdentitySuccess = payload => ({
  type: ADD_IDENTITY_SUCCESS,
  payload,
});

const addIdentityError = error => ({
  type: ADD_IDENTITY_ERROR,
  error,
});

export const editIdentityReq = data => ({
  type: EDIT_IDENTITY_REQUEST,
  data,
});

const editIdentitySuccess = payload => ({
  type: EDIT_IDENTITY_SUCCESS,
  payload,
});

const editIdentityError = error => ({
  type: EDIT_IDENTITY_ERROR,
  error,
});

export const removeIdentityReq = () => ({
  type: REMOVE_IDENTITY_REQUEST,
});

const removeIdentitySuccess = payload => ({
  type: REMOVE_IDENTITY_SUCCESS,
  payload,
});

const removeIdentityError = error => ({
  type: REMOVE_IDENTITY_ERROR,
  error,
});

export const getTipsReq = data => ({
  type: GET_TIPS_REQUEST,
  data,
});

const getTipsSuccess = payload => ({
  type: GET_TIPS_SUCCESS,
  payload,
});

const getTipsError = error => ({
  type: GET_TIPS_ERROR,
  error,
});

export const getTipReq = id => ({
  type: GET_TIP_REQUEST,
  id,
});

const getTipSuccess = payload => ({
  type: GET_TIP_SUCCESS,
  payload,
});

const getTipError = error => ({
  type: GET_TIP_ERROR,
  error,
});

export const clearArrayTipsReq = () => ({
  type: CLEAR_ARRAY_TIPS_REQ,
});

export const clearArrayPayoutsReq = () => ({
  type: CLEAR_ARRAY_PAYOUTS_REQ,
});

export const deleteCardReq = id => ({
  type: DELETE_CARD_REQUEST,
  payload: id,
});

const deleteCardSuccess = payload => ({
  type: DELETE_CARD_SUCCESS,
  payload,
});

const deleteCardError = error => ({
  type: DELETE_CARD_ERROR,
  error,
});

// export const withDrawTipReq = id => ({
//   type: WITHDRAW_TIP_REQUEST,
//   id,
// });

// const withdrawTipSuccess = payload => ({
//   type: WITHDRAW_TIP_SUCCESS,
//   payload,
// });

// const withdrawTipError = error => ({
//   type: WITHDRAW_TIP_ERROR,
//   error,
// });

export const withdrawFundsReq = data => ({
  type: WITHDRAW_FUNDS_REQUEST,
  data,
});

const withdrawFundsSuccess = payload => ({
  type: WITHDRAW_FUNDS_SUCCESS,
  payload,
});

const withdrawFundsError = error => ({
  type: WITHDRAW_FUNDS_ERROR,
  error,
});

export const postSelectCardReq = id => ({
  type: POST_SELECT_CARD_REQUEST,
  payload: id,
});

const postSelectCardSuccess = payload => ({
  type: POST_SELECT_CARD_SUCCESS,
  payload,
});

const postSelectCardError = error => ({
  type: POST_SELECT_CARD_ERROR,
  error,
});
export const getBalanceReq = () => ({
  type: GET_BALANCE_REQUEST,
});

const getBalanceSuccess = payload => ({
  type: GET_BALANCE_SUCCESS,
  payload,
});

const getBalanceError = error => ({
  type: GET_BALANCE_ERROR,
  error,
});

export const getPayoutsReq = page => ({
  type: GET_PAYOUTS_REQUEST,
  page,
});

const getPayoutsSuccess = payload => ({
  type: GET_PAYOUTS_SUCCESS,
  payload,
});

const getPayoutsError = error => ({
  type: GET_PAYOUTS_ERROR,
  error,
});

export const getPayoutReq = () => ({
  type: GET_PAYOUT_REQUEST,
});

const getPayoutSuccess = payload => ({
  type: GET_PAYOUT_SUCCESS,
  payload,
});

const getPayoutError = error => ({
  type: GET_PAYOUT_ERROR,
  error,
});

// reducers
const initialState = {
  tips: [],
  metaTips: {},
  tip: {},
  identity: {},
  balance: {},
  payouts: [],
  metaPayouts: {},
  payout: {},
  loading: false,
  error: false,
  isCheckInLoading: false,
  isConfirmTipLoading: false,
  isCardsLoading: false,
  isSelectCardLoader: false,
  cards: [],
  isBalanceloading: false,
  withdrawLoading: false,
};

export function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_CARD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case CONFIRM_TIP_REQUEST:
      return {
        ...state,
        isConfirmTipLoading: true,
        error: false,
      };
    case CONFIRM_TIP_SUCCESS:
      return {
        ...state,
        isConfirmTipLoading: false,
        error: false,
      };
    case CONFIRM_TIP_ERROR:
      return {
        ...state,
        isConfirmTipLoading: false,
        error: true,
      };

    case GET_CARDS_REQUEST:
      return {
        ...state,
        isCardsLoading: true,
        error: false,
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
        isCardsLoading: false,
        error: false,
      };
    case GET_CARDS_ERROR:
      return {
        ...state,
        isCardsLoading: false,
        error: true,
      };

    case DELETE_CARD_REQUEST:
      return {
        ...state,
        isCardsLoading: true,
        error: false,
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        isCardsLoading: false,
        error: false,
      };
    case DELETE_CARD_ERROR:
      return {
        ...state,
        isCardsLoading: false,
        error: true,
      };

    case GET_TIPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_TIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        tips: [...state.tips, ...action.payload.data],
        metaTips: action.payload.meta,
        error: false,
      };
    case GET_TIPS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case CLEAR_ARRAY_TIPS_REQ:
      return {
        ...state,
        tips: [],
      };

    case CLEAR_ARRAY_PAYOUTS_REQ:
      return {
        ...state,
        payouts: [],
      };

    case GET_TIP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_TIP_SUCCESS:
      return {
        ...state,
        loading: false,
        tip: action.payload,
        error: false,
      };
    case GET_TIP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    // case WITHDRAW_TIP_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //   };
    // case WITHDRAW_TIP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: false,
    //   };
    // case WITHDRAW_TIP_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: true,
    //   };

    case WITHDRAW_FUNDS_REQUEST:
      return {
        ...state,
        withdrawLoading: true,
        error: false,
      };
    case WITHDRAW_FUNDS_SUCCESS:
      return {
        ...state,
        withdrawLoading: false,
        error: false,
      };
    case WITHDRAW_FUNDS_ERROR:
      return {
        ...state,
        withdrawLoading: false,
        error: true,
      };

    case GET_IDENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_IDENTITY_SUCCESS:
      return {
        ...state,
        identity: action.payload,
        loading: false,
        error: false,
      };
    case GET_IDENTITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case ADD_IDENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_IDENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_IDENTITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case EDIT_IDENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_IDENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case EDIT_IDENTITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case REMOVE_IDENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case REMOVE_IDENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case REMOVE_IDENTITY_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case POST_SELECT_CARD_REQUEST:
      return {
        ...state,
        isSelectCardLoader: true,
        error: false,
      };
    case POST_SELECT_CARD_SUCCESS:
      return {
        ...state,
        isSelectCardLoader: false,
        error: false,
      };
    case POST_SELECT_CARD_ERROR:
      return {
        ...state,
        isSelectCardLoader: false,
        error: true,
      };

    case GET_BALANCE_REQUEST:
      return {
        ...state,
        isBalanceloading: true,
        error: false,
      };
    case GET_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload,
        isBalanceloading: false,
        error: false,
      };
    case GET_BALANCE_ERROR:
      return {
        ...state,
        isBalanceloading: false,
        error: true,
      };

    case GET_PAYOUTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_PAYOUTS_SUCCESS:
      return {
        ...state,
        payouts: [...state.payouts, ...action.payload.data],
        metaPayouts: action.payload.meta,
        loading: false,
        error: false,
      };
    case GET_PAYOUTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case GET_PAYOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_PAYOUT_SUCCESS:
      return {
        ...state,
        payout: action.payload,
        loading: false,
        error: false,
      };
    case GET_PAYOUT_ERROR:
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

function* addCard(data) {
  try {
    yield call(PaymentApi.addCard, data.data);
    yield put(addCardSuccess());
    yield put(getCardsReq());
    navigation.navigate('CardsScreen');
  } catch (error) {
    yield put(addCardError(error));
  }
}

function* confirmTip({ data }) {
  try {
    const response = yield call(PaymentApi.confirmTip, data);
    yield put(confirmTipSuccess(response));
    const { message } = response.data;
    navigation.navigate('CongratulationsScreen', { message });
  } catch (error) {
    yield put(confirmTipError(error));
  }
}

function* getCards() {
  try {
    const response = yield call(PaymentApi.getCards);
    yield put(getCardsSuccess(response.data));
  } catch (error) {
    yield put(getCardsError(error));
  }
}

function* getIdentity() {
  try {
    const response = yield call(PaymentApi.getIdentity);
    yield put(getIdentitySuccess(response));
  } catch (error) {
    yield put(getIdentityError(error));
  }
}

function* deleteCard({ payload }) {
  try {
    yield call(PaymentApi.deleteCard, payload);
    yield put(deleteCardSuccess());
    yield put(getCardsReq());
  } catch (error) {
    yield put(deleteCardError(error));
  }
}

function* selectCard({ payload }) {
  try {
    yield call(PaymentApi.selectCard, payload);

    yield put(postSelectCardSuccess());
    yield put(getCardsReq());
  } catch (error) {
    yield put(postSelectCardError(error));
  }
}

function* addIdentity({ data }) {
  try {
    const response = yield call(PaymentApi.addIdentity, data);
    yield put(addIdentitySuccess(response));
    navigation.navigate('PaymentsScreen');
  } catch (error) {
    yield put(addIdentityError(error));
  }
}
function* editIdentity({ data }) {
  try {
    const response = yield call(PaymentApi.editIdentity, data);
    yield put(editIdentitySuccess(response));
    navigation.navigate('PaymentsScreen');
  } catch (error) {
    yield put(editIdentityError(error));
  }
}

function* removeIdentity() {
  try {
    const response = yield call(PaymentApi.removeIdentity);
    yield put(removeIdentitySuccess(response));
    navigation.navigate('PaymentsScreen');
  } catch (error) {
    yield put(removeIdentityError(error));
  }
}

function* getTips({ data: page }) {
  try {
    const response = yield call(PaymentApi.getTips, page);
    yield put(getTipsSuccess(response));
  } catch (error) {
    yield put(getTipsError(error));
  }
}
function* getTip(data) {
  try {
    const tip = yield call(PaymentApi.getTip, data.id);
    yield put(getTipSuccess(tip));
  } catch (error) {
    yield put(getTipError(error));
  }
}
// function* withdrawTip(data) {
//   try {
//     const tip = yield call(PaymentApi.withdrawTip, data.id);
//     yield put(withdrawTipSuccess());
//     Alert.alert('Success', tip.data.message);
//     navigation.navigate('PaymentsScreen');
//   } catch (error) {
//     yield put(withdrawTipError(error));
//   }
// }

function* withdrawFunds(data) {
  try {
    const message = yield call(PaymentApi.withdrawFunds, data.data);
    yield put(withdrawFundsSuccess());
    Alert.alert('Success', message.data.message);
    navigation.navigate('PaymentsScreen');
  } catch (error) {
    yield put(withdrawFundsError(error));
  }
}

function* getBalance() {
  try {
    const balance = yield call(PaymentApi.getBallence);
    yield put(getBalanceSuccess(balance));
  } catch (error) {
    yield put(getBalanceError(error));
  }
}
function* getPayouts({ page }) {
  try {
    const payouts = yield call(PaymentApi.getPayouts, page);
    yield put(getPayoutsSuccess(payouts));
  } catch (error) {
    yield put(getPayoutsError(error));
  }
}
function* getPayout() {
  try {
    const payout = yield call(PaymentApi.getPayout);
    yield put(getPayoutSuccess(payout));
  } catch (error) {
    yield put(getPayoutError(error));
  }
}

export function* watchAddCard() {
  yield takeLatest(ADD_CARD_REQUEST, addCard);
}

export function* watchConfirmTip() {
  yield takeLatest(CONFIRM_TIP_REQUEST, confirmTip);
}

export function* watchGetCards() {
  yield takeLatest(GET_CARDS_REQUEST, getCards);
}

export function* watchDeleteCard() {
  yield takeLatest(DELETE_CARD_REQUEST, deleteCard);
}

export function* watchSelectCard() {
  yield takeLatest(POST_SELECT_CARD_REQUEST, selectCard);
}

export function* watchAddIdentity() {
  yield takeLatest(ADD_IDENTITY_REQUEST, addIdentity);
}

export function* watchGetTips() {
  yield takeLatest(GET_TIPS_REQUEST, getTips);
}

export function* watchGetTip() {
  yield takeLatest(GET_TIP_REQUEST, getTip);
}

// export function* watchdithdrawTip() {
//   yield takeLatest(WITHDRAW_TIP_REQUEST, withdrawTip);
// }

export function* watchWithdrawFunds() {
  yield takeLatest(WITHDRAW_FUNDS_REQUEST, withdrawFunds);
}

export function* watchGetIdentity() {
  yield takeLatest(GET_IDENTITY_REQUEST, getIdentity);
}

export function* watchEditIdentity() {
  yield takeLatest(EDIT_IDENTITY_REQUEST, editIdentity);
}

export function* watchRemoveIdentity() {
  yield takeLatest(REMOVE_IDENTITY_REQUEST, removeIdentity);
}

export function* watchGetBalance() {
  yield takeLatest(GET_BALANCE_REQUEST, getBalance);
}

export function* watchGetPayouts() {
  yield takeLatest(GET_PAYOUTS_REQUEST, getPayouts);
}
export function* watchGetPayout() {
  yield takeLatest(GET_PAYOUT_REQUEST, getPayout);
}
