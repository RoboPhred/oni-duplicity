
import { createAction } from "../../../action-utils";


export const ACTION_DUPLICANT_RENAME = "@save-editor/duplicants/rename";
export const renameDuplicant = createAction(ACTION_DUPLICANT_RENAME, (x: {duplicantID: number, name: string}) => x);
export type RenameDuplicantAction = ReturnType<typeof renameDuplicant>;


export const ACTION_DUPLICANT_SKILL_SET_LEVEL = "@save-editor/duplicants/skills/set-level";
export const setDuplicantSkillLevel = createAction(ACTION_DUPLICANT_SKILL_SET_LEVEL, (x: {duplicantID: number, skillId: string, level: number}) => x);
export type SetDuplicantSkillLevelAction = ReturnType<typeof setDuplicantSkillLevel>;

export const ACTION_DUPLICANT_SKILL_SET_EXPERIENCE = "@save-editor/duplicants/skills/set-experience";
export const setDuplicantSkillExperience = createAction(ACTION_DUPLICANT_SKILL_SET_EXPERIENCE, (x: {duplicantID: number, skillId: string, experience: number}) => x);
export type SetDuplicantSkillExperienceAction = ReturnType<typeof setDuplicantSkillExperience>;


export const ACTION_DUPLICANT_TRAITS_SET = "@save-editor/duplicants/traits/set";
export const setDuplicantTraits = createAction(ACTION_DUPLICANT_TRAITS_SET, (x: {duplicantID: number, traitIDs: string[]}) => x);
export type SetDuplicantTraitsAction = ReturnType<typeof setDuplicantTraits>;


export const ACTION_DUPLICANT_EFFECTS_ADD = "@save-editor/duplicants/effects/add";
export const addDuplicantEffect = createAction(ACTION_DUPLICANT_EFFECTS_ADD, (x: {duplicantID: number, effectID: string, timeRemaining: number}) => x);
export type AddDuplicantEffectAction = ReturnType<typeof addDuplicantEffect>;

export const ACTION_DUPLICANT_EFFECTS_SETTIME = "@save-editor/duplicants/effects/set-time";
export const setDuplicantEffectTime = createAction(ACTION_DUPLICANT_EFFECTS_SETTIME, (x: {duplicantID: number, effectID: string, timeRemaining: number}) => x);
export type SetDuplicantEffectTimeAction = ReturnType<typeof setDuplicantEffectTime>;

export const ACTION_DUPLICANT_EFFECTS_REMOVE = "@save-editor/duplicants/effects/remove";
export const removeDuplicantEffect = createAction(ACTION_DUPLICANT_EFFECTS_REMOVE, (x: {duplicantID: number, effectID: string}) => x);
export type RemoveDuplicantEffectAction = ReturnType<typeof removeDuplicantEffect>;


export const ACTION_DUPLICANT_HEALTH_STATE_SET = "@save-editor/duplicants/health/state/set";
export const setDuplicantHealthState = createAction(ACTION_DUPLICANT_HEALTH_STATE_SET, (x: {duplicantID: number, healthState: number}) => x);
export type SetDuplicantHealthStateAction = ReturnType<typeof setDuplicantHealthState>;


export const ACTION_DUPLICANT_SCALE_SET = "@save-editor/duplicants/scale/set";
export const setDuplicantScale = createAction(ACTION_DUPLICANT_SCALE_SET, (x: {duplicantID: number, scaleX?: number, scaleY?: number}) => x);
export type SetDuplicantScaleAction = ReturnType<typeof setDuplicantScale>;


export type DuplicantActions =
    RenameDuplicantAction
    | SetDuplicantSkillLevelAction
    | SetDuplicantSkillExperienceAction
    | SetDuplicantTraitsAction
    | AddDuplicantEffectAction
    | SetDuplicantEffectTimeAction
    | RemoveDuplicantEffectAction
    | SetDuplicantHealthStateAction
    | SetDuplicantScaleAction;
