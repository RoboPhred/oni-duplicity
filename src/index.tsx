
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./css";


import App from "./app";

import store from "./state/store";


const rootEl = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    rootEl
);
