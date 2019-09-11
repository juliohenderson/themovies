import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [sagaMiddleware];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: true })
    : compose;
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./redux/reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
