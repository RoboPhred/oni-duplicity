import { takeEvery, put } from "redux-saga/effects";

import { ACTION_INITIALIZE } from "@/actions/initialize";
import { offlineProbeCompleted } from "../actions/offline-probe-completed";

export default function* initializeSaga() {
  yield takeEvery(ACTION_INITIALIZE, handleInitialize);
}

// The tosjkg build is a single self-contained file that is always offline,
// so the old service-worker based "offline mode" is not used anymore.
function* handleInitialize() {
  yield put(offlineProbeCompleted(false, false));
}
