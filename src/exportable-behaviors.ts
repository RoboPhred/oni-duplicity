import {
  AccessorizerBehavior,
  AIAttributeLevelsBehavior,
  AITraitsBehavior,
  MinionResumeBehavior,
  BehaviorName
} from "oni-save-parser";

export interface ExportableBehavior {
  name: string;
  behavior: BehaviorName<any>;
}

export const MinionExportableBehaviors: ExportableBehavior[] = [
  {
    name: "Appearance",
    behavior: AccessorizerBehavior
  },
  {
    name: "Attributes",
    behavior: AIAttributeLevelsBehavior
  },
  {
    name: "Traits",
    behavior: AITraitsBehavior
  },
  {
    name: "Skills",
    behavior: MinionResumeBehavior
  }
];
