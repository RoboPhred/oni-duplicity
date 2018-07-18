export const ACTION_MINION_MODIFIER_SET_VALUE =
  "oni-save/behaviors/minion-modifier/set-value";
export const setModifierValue = (amountType: string, value: number) => ({
  type: ACTION_MINION_MODIFIER_SET_VALUE as typeof ACTION_MINION_MODIFIER_SET_VALUE,
  payload: { amountType, value }
});
export type SetMinionModifierValueAction = ReturnType<typeof setModifierValue>;
