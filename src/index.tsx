
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import { HashRouter } from "react-router-dom";

import "./css";
import App from "./app";
import { createStores } from "./store";

const rootEl = document.getElementById("root");

ReactDOM.render(
    <Provider {...createStores()}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    rootEl
);
