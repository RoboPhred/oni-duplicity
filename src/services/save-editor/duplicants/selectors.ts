
import { GameObject } from "oni-save-parser";
import { createSelector, ParametricSelector } from "reselect";
import { Vector3 } from "oni-save-parser/dts/interfaces";

import { AppState } from "../../../state";

import { makeGetGameObjectsByType, makeGetBehaviorByName } from "../selectors";

import {
    getBehavior,
    KPrefabIDBehavior,
    MinionIdentityBehavior,
    AIAttributeLevelsBehavior,
    AttributeLevel,
    AITraitsBehavior,
    AIEffectsBehavior,
    EffectInstance,
    HealthBehavior,
    AccessorizerBehavior,
    Accessory
} from "../behaviors";
import { Gender } from "./interfaces";


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
export type DuplicantByIDSelector<Props> = ParametricSelector<AppState, Props, GameObject | null>;

export function makeGetDuplicantSkills<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, AttributeLevel[]> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        makeGetBehaviorByName(selector, AIAttributeLevelsBehavior),
        levelBehavior => levelBehavior ? levelBehavior.parsedData.saveLoadLevels : []
    );
}

export function makeGetDuplicantTraits<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, string[]> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        makeGetBehaviorByName(selector, AITraitsBehavior),
        traitsBehavior => traitsBehavior ? traitsBehavior.parsedData.TraitIds : []
    );
}

export function makeGetDuplicantEffects<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, EffectInstance[]> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        makeGetBehaviorByName(selector, AIEffectsBehavior),
        effectsBehavior => effectsBehavior ? effectsBehavior.parsedData.saveLoadEffects : []
    );
}

export function makeGetDuplicantHealthState<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, number | null> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        makeGetBehaviorByName(selector, HealthBehavior),
        healthBehavior => healthBehavior ? healthBehavior.parsedData.State : null
    );
}

export function makeGetDuplicantScale<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, Vector3 | null> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        selector,
        gameObject => gameObject ? gameObject.scale : null
    );
}

export function makeGetDuplicantGender<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, Gender | null> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        makeGetBehaviorByName(selector, MinionIdentityBehavior),
        identityBehavior => identityBehavior ? identityBehavior.parsedData.gender : null
    );
}
export function makeGetDuplicantVoice<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, number | null> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }
    return createSelector(
        makeGetBehaviorByName(selector, MinionIdentityBehavior),
        identityBehavior => identityBehavior ? identityBehavior.parsedData.voiceIdx : null
    );
}
