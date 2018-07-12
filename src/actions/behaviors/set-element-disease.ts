import { HashedString } from "oni-save-parser";

export const ACTION_PRIMARY_ELEMENT_SET_DISEASE =
  "behaviors/primary-element/set-disease";
export const setPrimaryElementDisease = (
  diseaseId: HashedString,
  diseaseCount: number
) => ({
  type: ACTION_PRIMARY_ELEMENT_SET_DISEASE as typeof ACTION_PRIMARY_ELEMENT_SET_DISEASE,
  payload: { diseaseId, diseaseCount }
});
export type SetPrimaryElementDiseaseAction = ReturnType<
  typeof setPrimaryElementDisease
>;
