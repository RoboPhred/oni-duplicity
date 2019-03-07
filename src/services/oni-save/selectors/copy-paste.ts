import { createServiceSelector } from "./utils";

import { OniSaveState } from "../state";

export const copyPasteDataSelector = createServiceSelector(
  (state: OniSaveState) => state.copyPasteData
);

export const copyPasteGameObjectTypeSelect = createServiceSelector(
  (state: OniSaveState) => {
    if (!state.copyPasteData) {
      return null;
    }
    return state.copyPasteData.gameObjectType;
  }
);

export const copyPasteAvailableBehaviorsSelector = createServiceSelector(
  (state: OniSaveState) => {
    if (!state.copyPasteData) {
      return null;
    }
    return Object.keys(state.copyPasteData.behaviors);
  }
);
