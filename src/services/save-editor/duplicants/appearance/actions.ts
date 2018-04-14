
import { createAction } from "../../../../action-utils";


export const ACTION_DUPLICANT_APPEARANCE_EYES_SET = "@save-editor/duplicants/appearance/eyes/set";
export const setDuplicantEyes = createAction(ACTION_DUPLICANT_APPEARANCE_EYES_SET, (x: {duplicantID: number, accessoryID: string}) => x);
export type SetDuplicantEyesAction = ReturnType<typeof setDuplicantEyes>;

export const ACTION_DUPLICANT_APPEARANCE_HAIR_SET = "@save-editor/duplicants/appearance/hair/set";
export const setDuplicantHair = createAction(ACTION_DUPLICANT_APPEARANCE_HAIR_SET, (x: {duplicantID: number, accessoryID: string}) => x);
export type SetDuplicantHairAction = ReturnType<typeof setDuplicantHair>;

export const ACTION_DUPLICANT_APPEARANCE_HEAD_SET = "@save-editor/duplicants/appearance/head/set";
export const setDuplicantHead = createAction(ACTION_DUPLICANT_APPEARANCE_HEAD_SET, (x: {duplicantID: number, accessoryID: string}) => x);
export type SetDuplicantHeadAction = ReturnType<typeof setDuplicantHead>;

export const ACTION_DUPLICANT_APPEARANCE_MOUTH_SET = "@save-editor/duplicants/appearance/mouth/set";
export const setDuplicantMouth = createAction(ACTION_DUPLICANT_APPEARANCE_MOUTH_SET, (x: {duplicantID: number, accessoryID: string}) => x);
export type SetDuplicantMouthAction = ReturnType<typeof setDuplicantMouth>;

export const ACTION_DUPLICANT_APPEARANCE_BODY_SET = "@save-editor/duplicants/appearance/body/set";
export const setDuplicantBody = createAction(ACTION_DUPLICANT_APPEARANCE_BODY_SET, (x: {duplicantID: number, accessoryID: string}) => x);
export type SetDuplicantBodyAction = ReturnType<typeof setDuplicantBody>;


export type DuplicantAppearanceActions =
    SetDuplicantEyesAction
    | SetDuplicantHairAction
    | SetDuplicantHeadAction
    | SetDuplicantMouthAction
    | SetDuplicantBodyAction;
