import { AnyAction } from "redux";

import { get } from "lodash-es";

import { AppState, defaultAppState } from "@/state";

import {
  isCurrentObjectBehaviorArrayAction,
  ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_INSERT_ITEM,
  ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_ITEM,
  ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_INDEX
} from "@/actions/behaviors/modify-currentobject-behavior-array";

import { produceFromBehavior } from "./utils";

export default function modifyCurrentObjectBehaviorArray(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isCurrentObjectBehaviorArrayAction(action)) {
    return state;
  }

  const { behaviorName, path } = action.payload;

  return produceFromBehavior(state, behaviorName, behavior => {
    const array = get(behavior, path) as any[];
    switch (action.type) {
      case ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_INSERT_ITEM: {
        const { value, index } = action.payload;
        if (index != null) {
          array.splice(index, 0, value);
        } else {
          array.push(value);
        }
        return;
      }
      case ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_ITEM: {
        const { value } = action.payload;
        const index = array.indexOf(value);
        if (index >= 0) {
          array.splice(index, 1);
        }
        return;
      }
      case ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_INDEX: {
        const { index } = action.payload;
        if (index < 0 || index >= array.length) {
          return;
        }
        array.splice(index, 1);
        return;
      }
    }
  });
}
