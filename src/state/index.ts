import { RouterState } from "connected-react-router";

import { I18NState, defaultI18NState } from "@/services/i18n/state";
import { OniSaveState, defaultOniSaveState } from "@/services/oni-save/state";
import {
  OfflineModeState,
  defaultOfflineModeState
} from "@/services/offline-mode/state";

export * from "./utils";

export interface AppState {
  router: RouterState;
  services: {
    i18n: I18NState;
    oniSave: OniSaveState;
    offlineMode: OfflineModeState;
  };
}

export const defaultAppState: Readonly<AppState> = {
  router: undefined as any,
  services: {
    i18n: defaultI18NState,
    oniSave: defaultOniSaveState,
    offlineMode: defaultOfflineModeState
  }
};
Object.freeze(defaultAppState);
