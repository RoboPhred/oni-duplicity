import { MinionModifiersBehavior } from "oni-save-parser";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_MINION_MODIFIER_SET_VALUE,
  SetMinionModifierValueAction
} from "@/actions/behaviors/set-modifier-amount";

import { produceFromBehavior } from "./utils";

export default function setModifierAmountReducer(
  state: AppState = defaultAppState,
  action: SetMinionModifierValueAction
): AppState {
  if (action.type !== ACTION_MINION_MODIFIER_SET_VALUE) {
    return state;
  }

  return produceFromBehavior(state, MinionModifiersBehavior, behavior => {
    const { amountType, value } = action.payload;
    if (!behavior.extraData) {
      return;
    }
    const amount = behavior.extraData.amounts.find(x => x.name === amountType);
    if (!amount) {
      return;
    }
    amount.value.value = value;
  });
}
