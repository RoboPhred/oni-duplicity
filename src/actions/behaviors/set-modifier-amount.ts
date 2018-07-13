export const ACTION_MINION_MODIFIER_SET_AMOUNT =
  "behaviors/minion-modifier/set-amount";
export const setModifierAmount = (amountType: string, value: number) => ({
  type: ACTION_MINION_MODIFIER_SET_AMOUNT as typeof ACTION_MINION_MODIFIER_SET_AMOUNT,
  payload: { amountType, value }
});
export type SetMinionModifierAmountAction = ReturnType<
  typeof setModifierAmount
>;
