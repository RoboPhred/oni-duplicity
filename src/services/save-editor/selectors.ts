
import { Selector, createSelector, ParametricSelector } from "reselect";
import { GameObject } from "oni-save-parser";

import { AppState } from "../../state";

export const isSaveChosen = (state: AppState) => Boolean(state.saveEditor.fileName != null);
export const saveFileName = (state: AppState) => state.saveEditor.fileName;
export const isSaveLoaded = (state: AppState) => Boolean(state.saveEditor.fileName != null && !state.saveEditor.isLoading);
export const isSaveLoading = (state: AppState) => state.saveEditor.isLoading;
export const isSaveEnabled = (state: AppState) => Boolean(state.saveEditor.fileName && state.saveEditor.isLoading == false);
export const loadError = (state: AppState) => state.saveEditor.loadError;
export const saveGame = (state: AppState) => state.saveEditor.saveGame;
export const duplicantKeys = (state: AppState) => state.saveEditor.duplicantKeyIndexer;


export const gameObjects = createSelector(
    saveGame,
    game => game ? game.body.gameObjects : null
);

export const duplicants = createSelector(
    gameObjects,
    gameObjects => gameObjects ? gameObjects["Minion"] : []
);

export function makeGetDuplicantByKey<Props>(propKey: keyof Props): ParametricSelector<AppState, Props, GameObject | null> {
    return createSelector(
        duplicants,
        duplicantKeys,
        // We know the type of Props, but we need to have TS validate it as a string somehow...
        (_: AppState, props: any) => props[propKey],
        (duplicants, keys, key) => {
            const index = keys.indexOf(key);
            if (index === -1) return null;
            return duplicants[index];
        }
    );
};
