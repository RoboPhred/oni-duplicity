import {
  compose,
  createStore as createReduxStore,
  applyMiddleware
} from "redux";

import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import saga from "./saga";

import { actionSanitizer, stateSanitizer } from "./devtool-sanitizer";

function createStore() {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer
      })) ||
    compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createReduxStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(saga);
  return store;
}

const store = createStore();
export default store;
