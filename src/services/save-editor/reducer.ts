
import { AnyAction } from "redux";


import { SaveEditorState, defaultSaveEditorState } from "./state";

import {
    SaveEditorActions,
    ACTION_SAVEFILE_LOAD,
    ACTION_SAVEFILE_RECEIVED
} from "./actions";


export default function saveEditorReducer(state: SaveEditorState = defaultSaveEditorState, action: SaveEditorActions): SaveEditorState {
    switch(action.type) {
        case ACTION_SAVEFILE_LOAD: {
            const {
                file
            } = action.payload;

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