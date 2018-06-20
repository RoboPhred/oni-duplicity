import { createStore as createReduxStore } from "redux";

import reducer from "./reducer";

export function createStore() {
  const store = createReduxStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
