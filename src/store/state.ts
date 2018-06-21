import {
  SaveEditorPageState,
  defaultSaveEditorPageState
} from "@/pages/SaveEditor/state";

export interface AppState {
  pages: {
    saveEditor: SaveEditorPageState;
  };
}
export const defaultAppState: AppState = Object.freeze({
  pages: {
    saveEditor: defaultSaveEditorPageState
  }
});
