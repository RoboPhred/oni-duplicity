import { AnyAction } from "redux";

import { LoadingStatus, OniSaveState, defaultOniSaveState } from "../state";

import {
  ACTION_RECEIVE_ONISAVE_BEGIN,
  ACTION_RECEIVE_ONISAVE_ERROR,
  ACTION_RECEIVE_ONISAVE_SUCCESS,
  isReceiveOniSaveAction,
} from "../actions/receive-onisave";

export default function receiveOniSaveReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isReceiveOniSaveAction(action)) {
    return state;
  }

  switch (action.type) {
    case ACTION_RECEIVE_ONISAVE_BEGIN:
      return {
        ...state,
        loadError: null,
        loadingStatus: action.meta.operation,
        loadingProgressMessage: null,
        saveGame: action.payload.clearExisting ? null : state.saveGame,
        isMock: false,
      };
    case ACTION_RECEIVE_ONISAVE_ERROR:
      state = {
        ...state,
        loadingStatus: LoadingStatus.Error,
        loadError: action.payload,
      };
      break;
    case ACTION_RECEIVE_ONISAVE_SUCCESS:
      state = {
        ...state,
        loadingStatus: LoadingStatus.Ready,
        loadingFile: null,
        loadingProgressMessage: null,
        loadError: null,
        saveGame: action.payload,
        isModified:
          action.meta.operation === LoadingStatus.Saving
            ? false
            : state.isModified,
      };
  }

  return state;
}
