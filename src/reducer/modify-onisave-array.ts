import produce from "immer";

import { get } from "lodash-es";

import { AppState } from "@/state";

import {
  ACTION_ONISAVE_MODIFY_ARRAY,
  ModifyOniSaveArrayAction
} from "../actions/modify-onisave-array";

export default function modifyOniSaveArrayReducer(
  state: AppState,
  action: ModifyOniSaveArrayAction
): AppState {
  if (action.type !== ACTION_ONISAVE_MODIFY_ARRAY) {
    return state;
  }

  const { loadingState, oniSave } = state;
  if (loadingState !== "ready" || !oniSave) {
    return state;
  }

  const { path, mode, value, index } = action.payload;

  return produce(state, draft => {
    const array = get(draft.oniSave!, path, value) as any[];
    if (!array) {
      return;
    }
    switch (mode) {
      case "set":
        if (
          index != null ? array[index] === value : array.indexOf(value) !== -1
        ) {
          break;
        }
      // Allow flow-through
      case "insert": {
        index != null ? array.splice(index, 0, value) : array.push(value);
        break;
      }
      case "remove": {
        let targetIndex = index;
        if (targetIndex == null) {
          targetIndex = array.indexOf(value);
        }
        if (targetIndex !== -1) {
          array.splice(targetIndex, 1);
        }
      }
    }
  });
}
