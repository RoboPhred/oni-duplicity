import { MinionGender } from "oni-save-parser";

export const ACTION_MINION_IDENTITY_SET_GENDER =
  "oni-save/behaviors/minion-identity/set-gender";
export const setIdentityGender = (gender: MinionGender) => ({
  type: ACTION_MINION_IDENTITY_SET_GENDER as typeof ACTION_MINION_IDENTITY_SET_GENDER,
  payload: gender
});
export type SetMinionIdentityGenderAction = ReturnType<
  typeof setIdentityGender
>;
