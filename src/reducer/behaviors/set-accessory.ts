import {
  AccessorizerBehavior,
  Accessory,
  getIndexOfAccessoryType
} from "oni-save-parser";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_SET_ACCESSORY,
  SetAccessoryAction
} from "@/actions/behaviors/set-accessory";
import { produceFromBehavior } from "@/reducer/behaviors/utils";

export default function setAccessoryReducer(
  state: AppState = defaultAppState,
  action: SetAccessoryAction
): AppState {
  if (action.type !== ACTION_SET_ACCESSORY) {
    return state;
  }

  return produceFromBehavior(state, AccessorizerBehavior, behavior => {
    const { accessoryName, accessoryType } = action.payload;
    const { accessories } = behavior.templateData;

    const accessoryIndex = getIndexOfAccessoryType(accessories, accessoryType);

    if (accessoryName === null) {
      // Remove
      accessories.splice(accessoryIndex, 1);
      return;
    }

    const newAccessory = Accessory(accessoryName);

    if (accessoryIndex === -1) {
      // Add
      accessories.push(newAccessory);
    } else {
      // Replace
      accessories[accessoryIndex] = newAccessory;
    }
  });
}
