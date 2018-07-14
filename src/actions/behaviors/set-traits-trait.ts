export const ACTION_TRAITS_SET = "oni-save/behaviors/ai-traits/set-trait";
export const setTrait = (traitId: string, isSet: boolean) => ({
  type: ACTION_TRAITS_SET as typeof ACTION_TRAITS_SET,
  payload: { traitId, isSet }
});
export type SetTraitAction = ReturnType<typeof setTrait>;
