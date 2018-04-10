
import { AnyAction } from "redux";


import { SaveEditorState, defaultSaveEditorState } from "./state";

import {
    SaveEditorActions,
    ACTION_SAVEFILE_LOAD,
    ACTION_SAVEFILE_RECEIVED
} from "./actions";



// TODO: move to saga.  Temporarily here for testing.
import SaveLoadWorker from "worker-loader!./save-loader.worker";
import { LoadCommandData } from "./save-loader.worker";
import store from "../../state/store";
import { savefileReceived } from "./actions";
const worker = new SaveLoadWorker();
worker.onerror = (e: ErrorEvent) => { console.log("err", e)};
worker.onmessage = (e: MessageEvent) => {
    if (e.data.saveGame) {
        store.dispatch(savefileReceived(e.data.saveGame));
    }
};


export default function saveEditorReducer(state: SaveEditorState = defaultSaveEditorState, action: SaveEditorActions): SaveEditorState {
    switch(action.type) {
        case ACTION_SAVEFILE_LOAD: {
            const {
                file
            } = action.payload;

            // TODO remove temp testing code.
            const reader = new FileReader();
            reader.onload = () => {
                const cmd: LoadCommandData = {
                    command: "load",
                    buffer: reader.result
                };
                worker.postMessage(cmd);
            }
            reader.readAsArrayBuffer(file);


            return {
                ...defaultSaveEditorState,
                fileName: file.name,
                isLoading: true
            }
        }
        case ACTION_SAVEFILE_RECEIVED: {
            const {
                saveGame
            } = action.payload;
            
            return {
                ...state,
                isLoading: false,
                saveGame: action.payload.saveGame
            };
        }
        default:
            return state;
    }
}