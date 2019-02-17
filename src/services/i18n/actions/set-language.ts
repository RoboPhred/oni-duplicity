export const ACTION_SET_LANGUAGE = "app/set-language";
export const setLanguage = (language: string) => ({
  type: ACTION_SET_LANGUAGE as typeof ACTION_SET_LANGUAGE,
  payload: language
});
export type SetLanguageAction = ReturnType<typeof setLanguage>;
