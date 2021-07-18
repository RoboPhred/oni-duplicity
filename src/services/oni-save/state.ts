import { SaveGame } from "oni-save-parser";

export enum LoadingStatus {
  Idle = "idle",
  Loading = "loading",
  Saving = "saving",
  Ready = "ready",
  Error = "error",
}

export interface CopyPasteData {
  gameObjectType: string;
  behaviors: Record<string, BehaviorCopyData>;
}
export interface BehaviorCopyData {
  templateData?: any;
  extraData?: any;
}

export interface OniSaveState {
  // Its generally a bad idea to store buffer objects like this on redux.
  // However, we need to keep this around in case the save fails to load due to a version mismatch
  // and the user wants to force a load.
  loadingFile: File | null;
  loadingStatus: LoadingStatus;
  loadingProgressMessage: string | null;
  loadError: Error | null;
  saveGame: SaveGame | null;
  isMock: boolean;
  isModified: boolean;
  copyPasteData: CopyPasteData | null;
  warnInputChecksum: boolean;
}

export const defaultOniSaveState: Readonly<OniSaveState> = {
  loadingFile: null,
  loadingStatus: LoadingStatus.Idle,
  loadingProgressMessage: null,
  loadError: null,
  saveGame: null,
  isMock: false,
  isModified: false,
  copyPasteData: null,
  warnInputChecksum: false,
};
Object.freeze(defaultOniSaveState);
