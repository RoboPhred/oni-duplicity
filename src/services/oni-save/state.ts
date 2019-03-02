import { SaveGame, GameObjectBehavior } from "oni-save-parser";

export enum LoadingStatus {
  Idle = "idle",
  Loading = "loading",
  Saving = "saving",
  Ready = "ready"
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
  loadingStatus: LoadingStatus;
  loadingProgressMessage: string | null;
  loadError: Error | null;
  saveGame: SaveGame | null;
  isModified: boolean;
  copyPasteData: CopyPasteData | null;
}

export const defaultOniSaveState: Readonly<OniSaveState> = {
  loadingStatus: LoadingStatus.Idle,
  loadingProgressMessage: null,
  loadError: null,
  saveGame: null,
  isModified: false,
  copyPasteData: null
};
Object.freeze(defaultOniSaveState);
