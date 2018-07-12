import { MinionIdentityBehavior } from "oni-save-parser";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_MINION_IDENTITY_SET_GENDER,
  SetMinionIdentityGenderAction
} from "@/actions/behaviors/set-identity-gender";

import { produceFromBehavior } from "./utils";

export default function setIdentityGenderReducer(
  state: AppState = defaultAppState,
  action: SetMinionIdentityGenderAction
): AppState {
  if (action.type !== ACTION_MINION_IDENTITY_SET_GENDER) {
    return state;
  }

  return produceFromBehavior(state, MinionIdentityBehavior, behavior => {
    behavior.templateData.gender = action.payload;
    behavior.templateData.genderStringKey = action.payload;
  });
}
