
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

export type DuplicantActions =
    RenameDuplicantAction
    | SetDuplicantSkillLevelAction
    | SetDuplicantSkillExperienceAction
    | SetDuplicantTraitsAction;
