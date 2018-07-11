import produce from "immer";

import { get } from "lodash-es";

import {
  GameObject,
  AccessorizerBehavior,
  getIndexOfAccessoryType,
  getBehavior,
  AccessoryType,
  Accessory
} from "oni-save-parser";

// TODO: update oni-save-parser to use names, not ordinals
function makeAccessory(type: AccessoryType, name: string): Accessory {
  return Accessory(`Root.Accessories.${type}_${name}`);
}

import { AppState } from "@/state";

import {
  ACTION_SET_ACCESSORY,
  SetAccessoryAction
} from "../actions/set-accessory";

export default function setAccessoryReducer(
  state: AppState,
  action: SetAccessoryAction
): AppState {
  if (action.type !== ACTION_SET_ACCESSORY) {
    return state;
  }

  return produce(state, state => {
    const { loadingState, oniSave } = state;
    if (loadingState !== "ready" || !oniSave) {
      return;
    }

    const { gameObjectPath, type, name } = action.payload;

    const gameObject: GameObject = get(oniSave, gameObjectPath);
    if (!gameObject) {
      return;
    }

    const behavior = getBehavior(gameObject, AccessorizerBehavior);
    if (!behavior) {
      return;
    }
    const { accessories } = behavior.templateData;

    const accessoryIndex = getIndexOfAccessoryType(accessories, type);

    const newAccessory = makeAccessory(type, name);

    if (accessoryIndex === -1) {
      // Add
      accessories.push(newAccessory);
    } else {
      // Replace
      accessories[accessoryIndex] = newAccessory;
    }
  });
}
