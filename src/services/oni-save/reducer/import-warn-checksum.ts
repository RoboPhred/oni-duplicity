import { AnyAction } from "redux";

import { OniSaveState, defaultOniSaveState } from "../state";

import {
  isImportWarnChecksumAction,
  isImportConfirmAction
} from "../actions/import-behaviors";

export default function importWarnChecksumReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (isImportWarnChecksumAction(action)) {
    return {
      ...state,
      warnInputChecksum: true
    };
  } else if (isImportConfirmAction(action)) {
    return {
      ...state,
      warnInputChecksum: false
    };
  }

  return state;
}
