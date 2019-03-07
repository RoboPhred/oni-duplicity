import { fork } from "redux-saga/effects";

import exportBehaviorsSaga from "./export-behaviors";
import importBehaviorsSaga from "./import-behaviors";
import loadOniSaveSaga from "./load-onisave";
import saveOniSaveSaga from "./save-onisave";

export default function* saga() {
  yield fork(exportBehaviorsSaga);
  yield fork(importBehaviorsSaga);
  yield fork(loadOniSaveSaga);
  yield fork(saveOniSaveSaga);
}
