
import { applyMiddleware, createStore, Middleware } from "redux";

import reducer from "./reducer";
import { AppState, defaultState } from "./state";

import sagaMiddleware from "./saga";

const middleware: Middleware[] = [
    sagaMiddleware
];

const store = createStore(reducer, /* preloadedState, */ applyMiddleware(...middleware));

export default store;
