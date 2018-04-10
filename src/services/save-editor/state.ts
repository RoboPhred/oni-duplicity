
import { SaveGame } from "oni-save-parser";

export interface SaveEditorState {
    fileName: string | null;
    isLoading: boolean;
    loadError: Error | null;
    saveGame: SaveGame | null;
}

export const defaultSaveEditorState: SaveEditorState = {
    fileName: null,
    isLoading: false,
    loadError: null,
    saveGame: null
};

export const saveEditorStateKey = "saveEditor";