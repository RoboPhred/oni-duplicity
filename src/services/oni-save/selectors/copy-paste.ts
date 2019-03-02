import { createServiceSelector } from "./utils";

import { OniSaveState } from "../state";

export const copyPasteGameObjectType = createServiceSelector(
  (state: OniSaveState) => {
    if (!state.copyPasteData) {
      return null;
    }
    return state.copyPasteData.gameObjectType;
  }
);

export const copyPasteAvailableBehaviors = createServiceSelector(
  (state: OniSaveState) => {
    if (!state.copyPasteData) {
      return null;
    }
    return Object.keys(state.copyPasteData.behaviors);
  }
);
