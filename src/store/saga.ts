import { fork } from "redux-saga/effects";

import oniSaveSaga from "@/services/oni-save/saga";
import offlineModeSaga from "@/services/offline-mode/saga";

export default function* rootSaga() {
  yield fork(oniSaveSaga);
  yield fork(offlineModeSaga);
}
