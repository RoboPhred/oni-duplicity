
import {
    Action,
    createAction
} from "redux-actions";
import { SaveGame } from "oni-save-parser";

export const ACTION_SAVEFILE_LOAD = "@save-editor/savefile-load";
export interface LoadSavefilePayload {
    file: File;
}
export interface LoadSavefileAction {
    type: typeof ACTION_SAVEFILE_LOAD;
    payload: LoadSavefilePayload;
}
export const loadSavefile = createAction(ACTION_SAVEFILE_LOAD, (file: File) => ({file}));

export const ACTION_SAVEFILE_SAVE = "@save-editor/savefile-save";
export interface SaveSavefilePayload { }
export interface SaveSavefileAction {
    type: typeof ACTION_SAVEFILE_SAVE;
    payload: SaveSavefilePayload;
}
export const saveSavefile = createAction(ACTION_SAVEFILE_SAVE, (fileName: string) => ({fileName}));


export const ACTION_SAVEFILE_RECEIVED = "@save-editor/savefile-received";
export interface SavefileReceivedPayload {
    saveGame: SaveGame;
}
export interface SavefileReceivedAction {
    type: typeof ACTION_SAVEFILE_RECEIVED;
    payload: SavefileReceivedPayload;
}
export const savefileReceived = createAction(ACTION_SAVEFILE_RECEIVED, (saveGame: SaveGame) => ({saveGame}));


export type SaveEditorActions = LoadSavefileAction | SaveSavefileAction | SavefileReceivedAction;
