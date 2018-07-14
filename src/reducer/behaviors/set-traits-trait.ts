import { AITraitsBehavior } from "oni-save-parser";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_TRAITS_SET,
  SetTraitAction
} from "@/actions/behaviors/set-traits-trait";

import { produceFromBehavior } from "./utils";

export default function setTraitReducer(
  state: AppState = defaultAppState,
  action: SetTraitAction
): AppState {
  if (action.type !== ACTION_TRAITS_SET) {
    return state;
  }

  return produceFromBehavior(state, AITraitsBehavior, behavior => {
    const { traitId, isSet } = action.payload;
    const { TraitIds } = behavior.templateData;
    const index = TraitIds.findIndex(x => x === traitId);
    if (index !== -1) {
      if (!isSet) {
        TraitIds.splice(index, 1);
      }
    } else {
      if (isSet) {
        TraitIds.push(traitId);
      }
    }
  });
}
