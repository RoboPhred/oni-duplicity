import { takeEvery, call, put } from "redux-saga/effects";

import {
  ACTION_SET_OFFLINE_ENABLED,
  SetOfflineEnabledAction,
} from "../actions/set-offline-enabled";
import { offlineSwitchCompleted } from "../actions/offline-switch-completed";

export default function* setOfflineEnabledSaga() {
  yield takeEvery(ACTION_SET_OFFLINE_ENABLED, handleSetOfflineEnabled);
}

function* handleSetOfflineEnabled(action: SetOfflineEnabledAction) {
  const { enabled } = action.payload;
  try {
    if (enabled) {
      yield call(enableOfflineMode);
    } else {
      yield call(disableOfflineMode);
    }
    yield put(offlineSwitchCompleted(enabled));
  } catch (e: any) {
    yield put(offlineSwitchCompleted(false));
    return;
  }
}

async function enableOfflineMode() {
  validateServiceWorkerSupported();
  await disableOfflineMode();
  await navigator.serviceWorker.register("./service-worker.js");
}

async function disableOfflineMode() {
  validateServiceWorkerSupported();
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.unregister();
  }
}

function validateServiceWorkerSupported() {
  if ("serviceWorker" in navigator) {
    return;
  }

  throw new Error("ServiceWorker is not supported in your browser.");
}
