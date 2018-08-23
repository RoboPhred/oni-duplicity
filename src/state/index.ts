import { SaveGame } from "oni-save-parser";
import { EditMode } from "@/services/save-structure";

export type LoadingState = "idle" | "loading" | "saving" | "ready";

export interface AppState {
  language: string;
  loadingState: LoadingState;
  loadingProgressMessage: string | null;
  error: Error | null;
  oniSave: SaveGame | null;
  selectedPath: string[];
  editMode: EditMode;
}
export const defaultAppState: Readonly<AppState> = {
  language: "en",
  loadingState: "idle" as "idle",
  loadingProgressMessage: null,
  error: null,
  oniSave: null,
  selectedPath: [],
  editMode: "normal"
};
Object.freeze(defaultAppState);
