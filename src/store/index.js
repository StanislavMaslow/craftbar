import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const middlewaresWithDevTools = applyMiddleware(...middleware);

const store = createStore(rootReducer, middlewaresWithDevTools);

sagaMiddleware.run(rootSaga);

export default store;
