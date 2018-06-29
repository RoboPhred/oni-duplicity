import { call, put, select, takeEvery } from "redux-saga/effects";

import { SaveGame } from "oni-save-parser";

import { writeSaveGame } from "@/services/save-serializer/sagas";

import { saveAs } from "file-saver";

import {
  ACTION_ONISAVE_SAVE,
  SaveOniSaveAction
} from "../actions/save-onisave";

import {
  receiveOniSaveBegin,
  receiveOniSaveError,
  receiveOniSaveSuccess
} from "../actions/receive-onisave";

import oniSaveSelector from "../selectors/oni-save-selector";

export default function* saveEditorSaga() {
  yield takeEvery(ACTION_ONISAVE_SAVE, handleOniSaveLoad);
}

function* handleOniSaveLoad(action: SaveOniSaveAction) {
  const saveName = action.payload;

  const save: SaveGame | null = yield select(oniSaveSelector);
  if (!save) {
    return;
  }

  yield put(receiveOniSaveBegin("saving"));
  let blob: Blob;
  try {
    blob = yield call(writeSaveGame, save);
  } catch (error) {
    yield put(receiveOniSaveError(error));
    return;
  }

  saveAs(blob, saveName);

  yield put(receiveOniSaveSuccess(save));
}
