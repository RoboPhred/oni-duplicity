import {
  ReceiveOniSaveAction,
  ACTION_RECEIVE_ONISAVE_BEGIN,
  ACTION_RECEIVE_ONISAVE_ERROR,
  ACTION_RECEIVE_ONISAVE_SUCCESS
} from "../actions/receive-onisave";
import { AppState, defaultAppState } from "@/state";

export default function receiveOniSaveReducer(
  state: AppState = defaultAppState,
  action: ReceiveOniSaveAction
): AppState {
  switch (action.type) {
    case ACTION_RECEIVE_ONISAVE_BEGIN:
      return {
        ...state,
        error: null,
        loadingState: action.payload.operation,
        loadingProgressMessage: null,
        oniSave: action.payload.clearExisting ? null : state.oniSave
      };
    case ACTION_RECEIVE_ONISAVE_ERROR:
      state = {
        ...state,
        loadingState: "idle",
        error: action.payload
      };
      break;
    case ACTION_RECEIVE_ONISAVE_SUCCESS:
      state = {
        ...state,
        loadingState: "ready",
        loadingProgressMessage: null,
        error: null,
        oniSave: action.payload
      };
  }

  return state;
}
