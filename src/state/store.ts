
import { applyMiddleware, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import reducer from "./reducer";
import { AppState, defaultState } from "./state";

const store = createStore(reducer, defaultState, devToolsEnhancer({}));
export default store;
