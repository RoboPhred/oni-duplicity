import { Action } from "redux";

import { I18NState, defaultI18NState } from "../state";

import {
  ACTION_SET_LANGUAGE,
  SetLanguageAction
} from "../actions/set-language";

import i18n from "../i18n";

export default function setLanguageReducer(
  state: I18NState = defaultI18NState,
  action: Action
): I18NState {
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
