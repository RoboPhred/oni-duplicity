import { takeEvery, call, put } from "redux-saga/effects";

import { ACTION_INITIALIZE } from "@/actions/initialize";
import { offlineProbeCompleted } from "../actions/offline-probe-completed";

export default function* initializeSaga() {
  yield takeEvery(ACTION_INITIALIZE, handleInitialize);
}

function* handleInitialize() {
  if ("serviceWorker" in navigator) {
    const registration: ServiceWorkerRegistration | undefined = yield call(() =>
      navigator.serviceWorker.getRegistration()
    );
    yield put(offlineProbeCompleted(true, registration != null));
  } else {
    yield put(offlineProbeCompleted(false, false));
  }
}
