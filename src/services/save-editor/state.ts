import { SaveGame } from "oni-save-parser";

export interface SaveEditorService {
  editorState: "idle" | "loading" | "ready" | "saving";
  saveGame: SaveGame | null;
}
