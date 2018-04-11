
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import "./css";


import App from "./app";

import store from "./state/store";

import { runSaga } from "./state/saga";
runSaga();


const rootEl = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    rootEl
);
