
import { AnyAction } from "redux";
import { SaveEditorState, defaultSaveEditorState } from "./state";

import saveFileReducer from "./savefile/reducer";
import generalReducer from "./general/reducer";
import duplicantsReducer from "./duplicants/reducer";

/**
 * Flat list of reducers to run against SaveEditorState
 * Reducers run in-order.
 * 
 * We do not split into sub-states using combineReducers, since
 * these need access to all of the state at this level.
 * 
 * These should be broken into sub-states when we are more normalized.
 */
const reducers = [
    saveFileReducer,
    generalReducer,
    duplicantsReducer
];

export default function saveEditorReducer(state: SaveEditorState = defaultSaveEditorState, action: AnyAction): SaveEditorState {
    for (let reducer of reducers) {
        state = reducer(state, action);
    }
    return state;
}
