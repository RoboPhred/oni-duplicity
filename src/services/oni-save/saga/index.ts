import { fork } from "redux-saga/effects";

import loadOniSaveSaga from "./load-onisave";
import saveOniSaveSaga from "./save-onisave";

export default function* saga() {
  yield fork(loadOniSaveSaga);
  yield fork(saveOniSaveSaga);
}
