import { ParametricSelector, createSelector } from "reselect";
import { MinionResumeBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { makeGetBehaviorByName } from "../../selectors";
import { DuplicantByIDSelector, makeGetDuplicantByID } from "../selectors";

export interface JobStatus {
    name: string;
    mastery: boolean;
    experience: number;
}

export function makeGetDuplicantCurrentRole<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, string | null> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }

    return createSelector(
        makeGetBehaviorByName(selector, MinionResumeBehavior),
        resumeBehavior => resumeBehavior ? resumeBehavior.parsedData.currentRole : null
    );
}

export function makeGetDuplicantTargetRole<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, string | null> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }

    return createSelector(
        makeGetBehaviorByName(selector, MinionResumeBehavior),
        resumeBehavior => resumeBehavior ? resumeBehavior.parsedData.targetRole : null
    );
}

export function makeGetDuplicantRoleDetails<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, JobStatus[]> {
    let selector: DuplicantByIDSelector<Props>;
    if (typeof source === "function") {
        selector = source;
    }
    else {
        selector = makeGetDuplicantByID<Props>(source);
    }

    return createSelector(
        makeGetBehaviorByName(selector, MinionResumeBehavior),
        resumeBehavior => {
            if (!resumeBehavior) return [];
            const {
                ExperienceByRoleID,
                MasteryByRoleID
            } = resumeBehavior.parsedData;
            const statusByKey: {[key: string]: JobStatus} = {};
            for (let [key, value] of ExperienceByRoleID.entries()) {
                statusByKey[key] = {
                    name: key,
                    experience: value,
                    mastery: false
                };
            }
            for (let [key, value] of MasteryByRoleID.entries()) {
                statusByKey[key] = {
                    name: key,
                    experience: 0,
                    ...(statusByKey[key] || {}),
                    mastery: value
                };
            }
            return Object.keys(statusByKey).map(x => statusByKey[x]);
        }
    );
}
