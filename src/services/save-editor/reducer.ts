
import { AnyAction } from "redux";
import uuidV4 from "uuid/v4";

import { getBehavior, MinionIdentityBehavior } from "./utils";

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

            const minions = saveGame.body.gameObjects.Minion || [];

            // Generate guids to index our minions by, to ease lookup.
            const duplicantKeyIndexer = minions.map(x => uuidV4());
            
            return {
                ...state,
                isLoading: false,
                saveGame: action.payload.saveGame,
                duplicantKeyIndexer
            };
        }
        default:
            return state;
    }
}