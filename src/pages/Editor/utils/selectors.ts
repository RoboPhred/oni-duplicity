
import { createSelector } from "reselect";

import { saveGame } from "../../../services/save-editor/selectors";

export const gameObjects = createSelector(
    saveGame,
    game => game ? game.body.gameObjects : null
);

export const minions = createSelector(
    gameObjects,
    gameObjects => gameObjects ? gameObjects["Minion"] : []
);