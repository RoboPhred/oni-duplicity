
import { SaveGame } from "oni-save-parser";

import { createAction } from "../../../action-utils";

export const ACTION_SAVEFILE_LOAD = "@save-editor/savefile/load";
export const loadSavefile = createAction(ACTION_SAVEFILE_LOAD, (x: {file: File}) => x);
export type LoadSavefileAction = ReturnType<typeof loadSavefile>;

export const ACTION_SAVEFILE_SAVE = "@save-editor/savefile/save";
export const saveSavefile = createAction(ACTION_SAVEFILE_SAVE, (x: {fileName?: string}) => x);
export type SaveSavefileAction = ReturnType<typeof saveSavefile>;

export const ACTION_SAVEFILE_SAVE_START = "@save-editor/savefile/save/start";
export const saveSavefileStarted = createAction(ACTION_SAVEFILE_SAVE_START, () => {});
export type SaveSavefileStartedAction = ReturnType<typeof saveSavefileStarted>;

export const ACTION_SAVEFILE_SAVE_END = "@save-editor/savefile/save/end";
export const saveSavefileEnded = createAction(ACTION_SAVEFILE_SAVE_END, () => {});
export type SaveSavefileEndedAction = ReturnType<typeof saveSavefileEnded>;


export const ACTION_SAVEFILE_RECEIVED = "@save-editor/savefile/received";
export const savefileReceived = createAction(ACTION_SAVEFILE_RECEIVED, (x: {saveGame: SaveGame}) => x);
export type SavefileReceivedAction = ReturnType<typeof savefileReceived>;

export type SavefileActions = LoadSavefileAction | SaveSavefileAction | SaveSavefileStartedAction | SaveSavefileEndedAction | SavefileReceivedAction;
