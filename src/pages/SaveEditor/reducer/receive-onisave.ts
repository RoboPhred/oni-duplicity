import { AppState, defaultAppState } from "@/store";

import {
  ReceiveOniSaveAction,
  ACTION_RECEIVE_ONISAVE_BEGIN,
  ACTION_RECEIVE_ONISAVE_ERROR,
  ACTION_RECEIVE_ONISAVE_SUCCESS
} from "../actions/receive-onisave";

export default function receiveOniSaveReducer(
  state: AppState = defaultAppState,
  action: ReceiveOniSaveAction
): AppState {
  let saveEditorState = state.pages.saveEditor;
  switch (action.type) {
    case ACTION_RECEIVE_ONISAVE_BEGIN:
      saveEditorState = {
        ...saveEditorState,
        error: null,
        loadingState: action.payload.operation,
        oniSave: action.payload.clearExisting ? null : saveEditorState.oniSave
      };
      break;
    case ACTION_RECEIVE_ONISAVE_ERROR:
      saveEditorState = {
        ...saveEditorState,
        loadingState: "idle",
        error: action.payload
      };
      break;
    case ACTION_RECEIVE_ONISAVE_SUCCESS:
      saveEditorState = {
        ...saveEditorState,
        loadingState: "ready",
        error: null,
        oniSave: action.payload
      };
  }

  if (saveEditorState === state.pages.saveEditor) {
    return state;
  }

  return {
    ...state,
    pages: {
      ...state.pages,
      saveEditor: saveEditorState
    }
  };
}
