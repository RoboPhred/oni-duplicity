import { SaveGame } from "oni-save-parser";

export enum LoadingStatus {
  Idle = "idle",
  Loading = "loading",
  Saving = "saving",
  Ready = "ready"
}

export interface OniSaveState {
  loadingStatus: LoadingStatus;
  loadingProgressMessage: string | null;
  loadError: Error | null;
  saveGame: SaveGame | null;
  isModified: boolean;
}

export const defaultOniSaveState: Readonly<OniSaveState> = {
  loadingStatus: LoadingStatus.Idle,
  loadingProgressMessage: null,
  loadError: null,
  saveGame: null,
  isModified: false
};
Object.freeze(defaultOniSaveState);
