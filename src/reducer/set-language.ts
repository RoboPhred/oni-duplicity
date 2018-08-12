import { Action } from "redux";

import { AppState, defaultAppState } from "@/state";
import { ACTION_SET_LANGUAGE, SetLanguageAction } from "@/actions/set-language";
import i18n from "@/i18n";

export default function setLanguageReducer(
  state: AppState = defaultAppState,
  action: Action
): AppState {
  if (action.type !== ACTION_SET_LANGUAGE) {
    return state;
  }

  const lang = (action as SetLanguageAction).payload;

  i18n.changeLanguage(lang);

  return {
    ...state,
    language: lang
  };
}
