import * as React from "react";
import * as ReactDOM from "react-dom";

import Modal from "react-modal";

import "./style.css";

import Root from "./root";

const rootEl = document.getElementById("root");
if (rootEl) {
  Modal.setAppElement(rootEl);
  ReactDOM.render(<Root />, rootEl);
}
