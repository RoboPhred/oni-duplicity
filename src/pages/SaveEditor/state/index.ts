import { SaveGame } from "oni-save-parser";

export interface SaveEditorPageState {
  loadingState: "idle" | "loading" | "saving" | "ready";
  error: Error | null;
  oniSave: SaveGame | null;
}
export const defaultSaveEditorPageState: Readonly<SaveEditorPageState> = {
  loadingState: "idle" as "idle",
  error: null,
  oniSave: null
};
Object.freeze(defaultSaveEditorPageState);
