import { fork } from "redux-saga/effects";

import initializeSaga from "./initialize";
import setOfflineEnabledSaga from "./set-offline-enabled";

export default function* offlineModeSaga() {
  yield fork(initializeSaga);
  yield fork(setOfflineEnabledSaga);
}
