import { I18NState, defaultI18NState } from "@/services/i18n/state";
import { OniSaveState, defaultOniSaveState } from "@/services/oni-save/state";

export interface AppState {
  services: {
    i18n: I18NState;
    oniSave: OniSaveState;
  };
}

export const defaultAppState: Readonly<AppState> = {
  services: {
    i18n: defaultI18NState,
    oniSave: defaultOniSaveState
  }
};
Object.freeze(defaultAppState);
