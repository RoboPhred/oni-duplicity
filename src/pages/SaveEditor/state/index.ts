import { SaveGame } from "oni-save-parser";

export interface SaveEditorPageState {
  loadingState: "idle" | "loading" | "saving" | "ready";
  error: Error | null;
  oniSave: SaveGame | null;
  selectedPath: string[];
}
export const defaultSaveEditorPageState: Readonly<SaveEditorPageState> = {
  loadingState: "idle" as "idle",
  error: null,
  oniSave: null,
  selectedPath: []
};
Object.freeze(defaultSaveEditorPageState);
