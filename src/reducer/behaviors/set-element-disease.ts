import { PrimaryElementBehavior } from "oni-save-parser";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_PRIMARY_ELEMENT_SET_DISEASE,
  SetPrimaryElementDiseaseAction
} from "@/actions/behaviors/set-element-disease";

import { produceFromBehavior } from "./utils";

export default function setElementDiseaseReducer(
  state: AppState = defaultAppState,
  action: SetPrimaryElementDiseaseAction
): AppState {
  if (action.type !== ACTION_PRIMARY_ELEMENT_SET_DISEASE) {
    return state;
  }

  return produceFromBehavior(state, PrimaryElementBehavior, behavior => {
    const { diseaseId, diseaseCount } = action.payload;
    behavior.templateData.diseaseID = diseaseId;
    behavior.templateData.diseaseCount = diseaseCount;
  });
}
