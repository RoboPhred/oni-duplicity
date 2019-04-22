import { createStructuredSelector } from "@/state";

import { I18NState } from "./state";
import i18n from "./i18n";
import { currentLanguageSelector } from "./selectors/language";

export const persistState = createStructuredSelector({
  language: currentLanguageSelector
});

type PersistedState = ReturnType<typeof persistState>;

export function loadState(
  state: I18NState,
  persisted: PersistedState
): I18NState {
  i18n.changeLanguage(persisted.language);

  return {
    ...state,
    ...persisted
  };
}
