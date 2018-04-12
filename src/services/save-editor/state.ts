
import { SaveGame } from "oni-save-parser";

export interface SaveEditorState {
    fileName: string | null;
    isLoading: boolean;
    isSaving: boolean;
    loadError: Error | null;
    saveGame: SaveGame | null;

    // A sparse array keyed by prefab ID, specifying the type and index (in the typed game object array) of the game object.
    normalizedIDs: NormalizedID[]
}
export interface NormalizedID {
    type: string;
    index: number;
}


export const defaultSaveEditorState: SaveEditorState = {
    fileName: null,
    isLoading: false,
    isSaving: false,
    loadError: null,
    saveGame: null,

    normalizedIDs: []
};

export const saveEditorStateKey = "saveEditor";
