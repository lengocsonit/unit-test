import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { isImmutable } from 'immutable';

import { State, rootReducer } from './reducer';
import { rootSaga } from './saga';
import { JSObject } from '../types/Common';

const logger = createLogger({
  diff: true,
  duration: true,
  stateTransformer: (state: State) => {
    const newState: JSObject = {};
    for (const key in state) {
      const targetState = state[key as keyof State];
      if (isImmutable(targetState)) {
        newState[key] = targetState.toJS();
      } else {
        newState[key] = targetState;
      }
    }
    return newState;
  },
});

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export function configureStore(preloadedState?: State) {
  const middlewares = [routerMiddleware(history), sagaMiddleware, logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer(history), preloadedState, middlewareEnhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export const store = configureStore();