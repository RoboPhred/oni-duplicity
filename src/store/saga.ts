import { fork } from "redux-saga/effects";

import saveEditorSaga from "@/pages/SaveEditor/saga";

export default function* rootSaga() {
  yield fork(saveEditorSaga);
}
