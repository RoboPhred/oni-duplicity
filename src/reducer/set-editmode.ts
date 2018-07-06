import { ACTION_SET_EDITMODE, SetEditModeAction } from "@/actions/set-editmode";
import { AppState, defaultAppState } from "@/state";

export default function setEditMode(
  state: AppState = defaultAppState,
  action: SetEditModeAction
): AppState {
  if (action.type !== ACTION_SET_EDITMODE) {
    return state;
  }

  return {
    ...state,
    editMode: action.payload
  };
}
