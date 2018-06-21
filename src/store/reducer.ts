import { Action } from "redux";

import { AppState, defaultAppState } from "@/store/state";

import saveEditorReducer from "@/pages/SaveEditor/reducer";

export default function reducer(
  state: AppState = defaultAppState,
  action: Action
) {
  // Just one reducer right now.
  //  Should use reduce-reducers when more are needed.
  return saveEditorReducer(state, action as any);
}
