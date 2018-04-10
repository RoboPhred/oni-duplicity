
import { combineReducers } from "redux";

import saveEditorReducer from "../services/save-editor/reducer";
import { saveEditorStateKey } from "../services/save-editor/state";

const reducer = combineReducers({
    // TODO: Find a way to satisfy typings with discriminated union actions and combineReducers
    [saveEditorStateKey]: saveEditorReducer as any
});

export default reducer;