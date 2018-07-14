import { eventChannel, END } from "redux-saga";
import { put, select, takeEvery, take } from "redux-saga/effects";

import { SaveGame } from "oni-save-parser";

import { saveAs } from "file-saver";

import { ACTION_ONISAVE_SAVE, SaveOniSaveAction } from "@/actions/save-onisave";

import {
  receiveOniSaveBegin,
  receiveOniSaveError,
  receiveOniSaveSuccess
} from "@/actions/receive-onisave";

import { parseProgress } from "@/actions/onisave-parse-progress";

import { writeSave } from "@/services/save-serializer";

import oniSaveSelector from "@/selectors/oni-save";

export default function* saveEditorSaga() {
  yield takeEvery(ACTION_ONISAVE_SAVE, handleOniSaveWrite);
}

function* handleOniSaveWrite(action: SaveOniSaveAction) {
  const saveName = action.payload;

  const saveGame: SaveGame | null = yield select(oniSaveSelector);
  if (!saveGame) {
    return;
  }

  yield put(receiveOniSaveBegin("saving"));

  const saveChannel = createSaveChannel(saveGame);

  while (true) {
    const msg = yield take(saveChannel);
    if (msg.type === "progress") {
      yield put(parseProgress(msg.message));
      continue;
    } else if (msg.type === "success") {
      saveAs(msg.blob, saveName);
      yield put(receiveOniSaveSuccess(saveGame));
      return;
    } else if (msg.type === "error") {
      yield put(receiveOniSaveError(msg.error));
      return;
    }
  }
}

function createSaveChannel(saveGame: SaveGame) {
  return eventChannel(emitter => {
    function onProgress(message: string) {
      emitter({
        type: "progress",
        message
      });
    }

    writeSave(saveGame, onProgress)
      .then(data => {
        const blob = new Blob([data]);
        emitter({
          type: "success",
          blob
        });
        emitter(END);
      })
      .catch(error => {
        emitter({
          type: "error",
          error
        });
        emitter(END);
      });

    //This is the cancellation func.
    // TODO: We can support cancellation in oni-save-parser rather easily.
    return () => {};
  });
}
