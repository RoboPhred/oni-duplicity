import { AppState, defaultAppState } from "@/state";

import {
  ACTION_ONISAVE_PARSE_PROGRESS,
  ParseProgressAction
} from "@/actions/onisave-parse-progress";

export default function parseProgressReducer(
  state: AppState = defaultAppState,
  action: ParseProgressAction
): AppState {
  if (action.type !== ACTION_ONISAVE_PARSE_PROGRESS) {
    return state;
  }

  return {
    ...state,
    loadingProgressMessage: action.payload.message
  };
}
