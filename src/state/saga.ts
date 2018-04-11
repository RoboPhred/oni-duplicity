
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects"

import saveEditorSaga from "../services/save-editor/saga";

const sagaMiddleware = createSagaMiddleware();
export default sagaMiddleware;

export function runSaga() {
    sagaMiddleware.run(function*() {
        yield fork(saveEditorSaga);
    });
}