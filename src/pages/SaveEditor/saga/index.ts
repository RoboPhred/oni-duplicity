import { call, put, takeEvery } from "redux-saga/effects";

import { SaveGame } from "oni-save-parser";

import { readSaveGame } from "@/services/save-serializer/sagas";

import {
  ACTION_ONISAVE_LOAD,
  LoadOniSaveAction
} from "../actions/load-onisave";

import {
  receiveOniSaveBegin,
  receiveOniSaveError,
  receiveOniSaveSuccess
} from "../actions/receive-onisave";

export default function* saveEditorSaga() {
  yield takeEvery(ACTION_ONISAVE_LOAD, handleOniSaveLoad);
}

function* handleOniSaveLoad(action: LoadOniSaveAction) {
  const file = action.payload;

  yield put(receiveOniSaveBegin(true));
  let save: SaveGame;
  try {
    save = yield call(readSaveGame, file);
  } catch (error) {
    yield put(receiveOniSaveError(error));
    return;
  }
  yield put(receiveOniSaveSuccess(save));
}
