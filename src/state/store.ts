
import { applyMiddleware, compose, createStore } from "redux";

import reducer from "./reducer";
import { AppState, defaultState } from "./state";

import sagaMiddleware from "./saga";

const middleware = [
    sagaMiddleware
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;
