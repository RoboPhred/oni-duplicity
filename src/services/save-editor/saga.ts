
import { fork } from "redux-saga/effects";

import saveFileSaga from "./savefile/saga";

export default function* () {
    yield fork(saveFileSaga);
}