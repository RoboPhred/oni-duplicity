
import { createSelector } from "reselect";

import { makeGetGameObjectsByType, makeGetBehaviorByName } from "../selectors";

const saveGameObject = createSelector(
    makeGetGameObjectsByType("SaveGame"),
    objects => objects[0]
);

// TODO: Move GameClock and its interface to oni-save-parser
const gameClockBehavior = makeGetBehaviorByName(saveGameObject, "GameClock");
export const cycles = createSelector(
    gameClockBehavior,
    behavior => behavior ? behavior.parsedData.cycle : 0
);

// TODO: Move Immigration and its interface to oni-save-parser
const immigrationBehavior = makeGetBehaviorByName(saveGameObject, "Immigration");
export const nextSpawn = createSelector(
    immigrationBehavior,
    behavior => behavior ? behavior.parsedData.timeBeforeSpawn : 0
);
export const isSpawnReady = createSelector(
    immigrationBehavior,
    behavior => behavior ? behavior.parsedData.bImmigrantAvailable : false
);
