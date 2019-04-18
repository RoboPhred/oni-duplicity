import { AppState } from "@/state";

export const currentLanguageSelector = (state: AppState) =>
  state.services.i18n.language;
