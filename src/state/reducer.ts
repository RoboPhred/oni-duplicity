
import { combineReducers } from "redux";

import saveEditorReducer from "../services/save-editor/reducer";
import { saveEditorStateKey } from "../services/save-editor/state";

const reducer = combineReducers({
    [saveEditorStateKey]: saveEditorReducer
});

export default reducer;
