
import { GameObject } from "oni-save-parser";
import { createSelector, ParametricSelector } from "reselect";

import { AppState } from "../../../state";

import { makeGetGameObjectsByType, makeGetBehaviorByName } from "../selectors";

import {
    getBehavior,
    KPrefabIDBehavior,
    AIAttributeLevelsBehavior,
    AttributeLevel,
    AITraitsBehavior
} from "../behaviors";


export const duplicants = makeGetGameObjectsByType("Minion");
export const duplicantsIDs = createSelector(
    duplicants,
    duplicants => {
        const ids: number[] = [];
        for (let duplicant of duplicants) {
            const idBehavior = getBehavior(duplicant, KPrefabIDBehavior);
            if (idBehavior && idBehavior.parsedData) {
                ids.push(idBehavior.parsedData.InstanceID);
            }
        }
        return ids;
    }
);

export const duplicantsMap = createSelector(
    duplicants,
    duplicants => {
        const dups: {[key: number]: GameObject} = {};
        for (let duplicant of duplicants) {
            const idBehavior = getBehavior(duplicant, KPrefabIDBehavior);
            if (idBehavior && idBehavior.parsedData) {
                dups[idBehavior.parsedData.InstanceID] = duplicant;
            }
        }
        return dups;
    }
)

export function makeGetDuplicantByID<Props>(propKey: keyof Props): ParametricSelector<AppState, Props, GameObject | null> {
    return createSelector(
        duplicantsMap,
        // We know the type of Props, but we need to have TS validate it as a string somehow...
        (_: AppState, props: any) => props[propKey],
        (duplicantsMap, id) => {
            if (!Object.prototype.hasOwnProperty.call(duplicantsMap, id)) {
                return null;
            }
            return duplicantsMap[id];
        }
    );
};

export function makeGetDuplicantSkillsByID<Props>(propKey: keyof Props): ParametricSelector<AppState, Props, AttributeLevel[]> {
    return createSelector(
        makeGetBehaviorByName(makeGetDuplicantByID(propKey), AIAttributeLevelsBehavior),
        levelBehavior => levelBehavior ? levelBehavior.parsedData.saveLoadLevels : []
    );
}

export function makeGetDuplicantTraitsByID<Props>(propKey: keyof Props): ParametricSelector<AppState, Props, string[]> {
    return createSelector(
        makeGetBehaviorByName(makeGetDuplicantByID(propKey), AITraitsBehavior),
        traitsBehavior => traitsBehavior ? traitsBehavior.parsedData.TraitIds : []
    );
}