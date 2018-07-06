import { SaveGame } from "oni-save-parser";
import { EditMode } from "@/services/save-structure";

export type LoadingState = "idle" | "loading" | "saving" | "ready";

export interface AppState {
  loadingState: LoadingState;
  error: Error | null;
  oniSave: SaveGame | null;
  selectedPath: string[];
  editMode: EditMode;
}
export const defaultAppState: Readonly<AppState> = {
  loadingState: "idle" as "idle",
  error: null,
  oniSave: null,
  selectedPath: [],
  editMode: "normal"
};
Object.freeze(defaultAppState);
