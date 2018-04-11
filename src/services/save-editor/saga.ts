
import { takeEvery, call, put } from "redux-saga/effects";

import {
    ACTION_SAVEFILE_LOAD,
    LoadSavefileAction,
    savefileReceived
} from "./actions";

import SaveLoadWorker from "worker-loader!./save-loader.worker";
import { LoadCommandData } from "./save-loader.worker";


const worker = new SaveLoadWorker();

export function* loadSaveFile(action: LoadSavefileAction) {
    const {
        file
    } = action.payload;

    const reader = new FileReader();
    const loadGamePromise = new Promise<File>((accept, reject) => {
        reader.onload = () => {
            accept(reader.result);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
    }).then(buffer => {
        return new Promise((accept, reject) => {
            worker.onerror = (e: ErrorEvent) => { reject(e.error) };
            worker.onmessage = (e: MessageEvent) => {
                const {
                    saveGame,
                    error
                } = e.data;
                if (error) reject(error);
                else accept(saveGame);
            };

            const cmd: LoadCommandData = {
                command: "load",
                buffer: reader.result
            };
            worker.postMessage(cmd);
        });
    });

    try {
        const save = yield call(() => loadGamePromise);
        yield put(savefileReceived(save));
    }
    catch(err) {
        // TODO: either send with savefileReceived error key, or make a new action for this.
        console.log(err);
    }
}


export default function* () {
    yield takeEvery(ACTION_SAVEFILE_LOAD, loadSaveFile);
}