
import { SaveGame } from "oni-save-parser";

export interface SaveEditorState {
    fileName: string | null;
    isLoading: boolean;
    loadError: Error | null;
    saveGame: SaveGame | null;

    /**
     * Guid keys in minion order, to ease referencing minions uniquely.
     */
    duplicantKeyIndexer: string[];
}

export const defaultSaveEditorState: SaveEditorState = {
    fileName: null,
    isLoading: false,
    loadError: null,
    saveGame: null,
    duplicantKeyIndexer: []
};

export const saveEditorStateKey = "saveEditor";
