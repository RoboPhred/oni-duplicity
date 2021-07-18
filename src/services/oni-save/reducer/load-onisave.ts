import { AnyAction } from "redux";

import { OniSaveState, defaultOniSaveState, LoadingStatus } from "../state";
import { isLoadOniSaveAction } from "../actions/load-onisave";

export default function loadExampleSaveReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isLoadOniSaveAction(action)) {
    return state;
  }

  const { file } = action.payload;

  return {
    ...state,
    loadingFile: file,
  };
}
