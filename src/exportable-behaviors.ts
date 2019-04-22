import {
  AccessorizerBehavior,
  AIAttributeLevelsBehavior,
  AITraitsBehavior,
  MinionResumeBehavior,
  BehaviorName
} from "oni-save-parser";

export interface ExportableBehavior {
  name: string;
  i18nKey: string;
  behavior: BehaviorName<any>;
}

export const MinionExportableBehaviors: ExportableBehavior[] = [
  {
    name: "Appearance",
    i18nKey: "duplicant_appearance.noun_titlecase",
    behavior: AccessorizerBehavior
  },
  {
    name: "Attributes",
    i18nKey: "duplicant_attribute.noun_titlecase_plural",
    behavior: AIAttributeLevelsBehavior
  },
  {
    name: "Traits",
    i18nKey: "duplicant_trait.noun_titlecase_plural",
    behavior: AITraitsBehavior
  },
  {
    name: "Skills",
    i18nKey: "duplicant_skills.noun_titlecase_plural",
    behavior: MinionResumeBehavior
  }
];
