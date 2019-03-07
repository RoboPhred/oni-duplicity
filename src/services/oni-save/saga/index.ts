import { fork } from "redux-saga/effects";

import exportBehaviorsSaga from "./export-behaviors";
import loadOniSaveSaga from "./load-onisave";
import saveOniSaveSaga from "./save-onisave";

export default function* saga() {
  yield fork(exportBehaviorsSaga);
  yield fork(loadOniSaveSaga);
  yield fork(saveOniSaveSaga);
}
