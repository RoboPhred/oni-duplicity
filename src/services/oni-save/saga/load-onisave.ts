import { eventChannel, END } from "redux-saga";
import { call, put, takeEvery, take } from "redux-saga/effects";

import {
  ACTION_ONISAVE_LOAD,
  LoadOniSaveAction
} from "../actions/load-onisave";

import {
  receiveOniSaveBegin,
  receiveOniSaveError,
  receiveOniSaveSuccess
} from "../actions/receive-onisave";

import { parseProgress } from "../actions/parse-progress";

import { parseSave } from "../worker-instance";
import { LoadingStatus } from "../state";

export default function* saveEditorSaga() {
  yield takeEvery(ACTION_ONISAVE_LOAD, handleOniSaveLoad);
}

function* handleOniSaveLoad(action: LoadOniSaveAction) {
  const file = action.payload;

  yield put(receiveOniSaveBegin(LoadingStatus.Loading, true));

  const data: ArrayBuffer = yield call(readFile, file);

  const loadChannel = createLoadChannel(data);

  while (true) {
    const msg = yield take(loadChannel);
    if (msg.type === "progress") {
      yield put(parseProgress(msg.message));
      continue;
    } else if (msg.type === "success") {
      yield put(receiveOniSaveSuccess(msg.saveGame));
      return;
    } else if (msg.type === "error") {
      yield put(receiveOniSaveError(msg.error));
      return;
    }
  }
}

function createLoadChannel(data: ArrayBuffer) {
  return eventChannel(emitter => {
    function onProgress(message: string) {
      emitter({
        type: "progress",
        message
      });
    }

    parseSave(data, onProgress)
      .then(saveGame => {
        emitter({
          type: "success",
          saveGame
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

function readFile(file: File): Promise<ArrayBuffer> {
  const reader = new FileReader();
  return new Promise<ArrayBuffer>((accept, reject) => {
    reader.onload = () => {
      accept(reader.result as ArrayBuffer);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
}
