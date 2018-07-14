import { AIAttributeLevelsBehavior } from "oni-save-parser";

import { setCurrentObjectBehaviorValue } from "@/actions/behaviors/set-currentobject-behavior-value";

const mapDispatchToProps = {
  setSkillLevel(index: number, level: number) {
    return setCurrentObjectBehaviorValue(
      AIAttributeLevelsBehavior,
      ["templateData", "saveLoadLevels", `${index}`, "level"],
      level
    );
  },
  setSkillExperience(index: number, experience: number) {
    return setCurrentObjectBehaviorValue(
      AIAttributeLevelsBehavior,
      ["templateData", "saveLoadLevels", `${index}`, "experience"],
      experience
    );
  }
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
