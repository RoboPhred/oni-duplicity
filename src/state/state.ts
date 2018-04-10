
import { SaveEditorState, defaultSaveEditorState, saveEditorStateKey } from "../services/save-editor/state";

export interface AppState {
    [saveEditorStateKey]: SaveEditorState;
}

export const defaultState: AppState = {
    [saveEditorStateKey]: defaultSaveEditorState
};
