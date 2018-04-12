
import { take, fork, call, put, select } from "redux-saga/effects";
import { saveAs } from "file-saver";
import { SaveGame } from "oni-save-parser";


import {
    ACTION_SAVEFILE_LOAD,
    ACTION_SAVEFILE_SAVE,
    LoadSavefileAction,
    SaveSavefileAction,
    savefileReceived,
    saveSavefileStarted,
    saveSavefileEnded
} from "./actions";

import SaveLoadWorker from "worker-loader!./save-loader.worker";
import { LoadCommandData, SaveCommandData } from "./save-loader.worker";
import { Action } from "redux";
import { AppState } from "../../../state";
import { error } from "../../../logging";


const worker = new SaveLoadWorker();

function* loadSaveFile(action: LoadSavefileAction) {
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
        const saveGame: SaveGame = yield call(() => loadGamePromise);
        yield put(savefileReceived({ saveGame }));
    }
    catch (err) {
        // TODO: either send with savefileReceived error key, or make a new action for this.
        console.log(err);
    }
}

function* saveSavefile(action: SaveSavefileAction) {
    const {
        fileName
    } = action.payload;

    const state: AppState = yield select();

    const saveGame = state.saveEditor.saveGame;
    if (!saveGame) {
        return;
    }

    yield put(saveSavefileStarted({}));

    try {
        const saveDataPromise = new Promise<ArrayBuffer>((accept, reject) => {
            worker.onerror = (e: ErrorEvent) => { reject(e.error) };
            worker.onmessage = (e: MessageEvent) => {
                const {
                    buffer,
                    error
                } = e.data;
                if (error) reject(error);
                else accept(buffer);
            };

            const cmd: SaveCommandData = {
                command: "save",
                save: saveGame
            };
            worker.postMessage(cmd);
        });

        const saveData: ArrayBuffer = yield call(() => saveDataPromise);
        const blob = new Blob([saveData]);

        saveAs(blob, fileName || state.saveEditor.fileName || "my-file.sav");
    }
    catch (e) {
        error("Failed to save file: " + e.message);
    }

    yield put(saveSavefileEnded({}));
}

function* handleSaveOrLoad() {
    // Take a save or load, then block until we complete.
    //  This will effectively ignore save/load calls happening while we are working.
    while (true) {
        const action: LoadSavefileAction | SaveSavefileAction = yield take([ACTION_SAVEFILE_LOAD, ACTION_SAVEFILE_SAVE]);
        switch (action.type) {
            case ACTION_SAVEFILE_LOAD:
                yield call<LoadSavefileAction>(loadSaveFile, action);
                continue;
            case ACTION_SAVEFILE_SAVE:
                yield call<SaveSavefileAction>(saveSavefile, action);
                continue;
        }
    }
}


export default function* () {
    yield fork(handleSaveOrLoad);
}
