import { MinionResumeBehavior } from "oni-save-parser";

import { setCurrentObjectBehaviorValue } from "@/actions/behaviors/set-currentobject-behavior-value";

const mapDispatchToProps = {
  setExperience(index: number, experience: number) {
    return setCurrentObjectBehaviorValue(
      MinionResumeBehavior,
      ["templateData", "ExperienceByRoleID", `${index}`, "1"],
      experience
    );
  },

  setMastery(index: number, mastery: boolean) {
    return setCurrentObjectBehaviorValue(
      MinionResumeBehavior,
      ["templateData", "MasteryByRoleID", `${index}`, "1"],
      mastery
    );
  }
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
