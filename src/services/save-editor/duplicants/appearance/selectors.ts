import { ParametricSelector, createSelector } from "reselect";

import { AppState } from "../../../../state";
import { AccessorizerBehavior } from "../../behaviors";

import { makeGetBehaviorByName } from "../../selectors";
import { DuplicantByIDSelector, makeGetDuplicantByID } from "../selectors";

import { getAccessoryOfType } from "./utils";


export const makeGetDuplicantEyes = makeGetDuplicantAppearanceMaker("eyes");
export const makeGetDuplicantHair = makeGetDuplicantAppearanceMaker("hair");
export const makeGetDuplicantHead = makeGetDuplicantAppearanceMaker("headshape");
export const makeGetDuplicantMouth = makeGetDuplicantAppearanceMaker("mouth");
export const makeGetDuplicantBody = makeGetDuplicantAppearanceMaker("body");

function makeGetDuplicantAppearanceMaker(type: string) {
    return function<Props>(source: (keyof Props) | DuplicantByIDSelector<Props>): ParametricSelector<AppState, Props, string | null> {
        let selector: DuplicantByIDSelector<Props>;
        if (typeof source === "function") {
            selector = source;
        }
        else {
            selector = makeGetDuplicantByID<Props>(source);
        }
    
        return createSelector(
            makeGetBehaviorByName(selector, AccessorizerBehavior),
            accessorizerBehavior => {
                if(!accessorizerBehavior) return null;
                const accessory = getAccessoryOfType(accessorizerBehavior.parsedData.accessories, type);
                if (!accessory) return null;
                return accessory.guid.Guid;
            }
        );
    }
}