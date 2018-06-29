import { SaveGame } from "oni-save-parser";

export interface AppState {
  loadingState: "idle" | "loading" | "saving" | "ready";
  error: Error | null;
  oniSave: SaveGame | null;
  selectedPath: string[];
}
export const defaultAppState: Readonly<AppState> = {
  loadingState: "idle" as "idle",
  error: null,
  oniSave: null,
  selectedPath: []
};
Object.freeze(defaultAppState);
