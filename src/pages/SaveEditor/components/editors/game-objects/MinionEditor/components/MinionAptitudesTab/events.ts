import { MinionResumeBehavior } from "oni-save-parser";
import { setCurrentObjectBehaviorValue } from "@/actions/behaviors/set-currentobject-behavior-value";

const mapDispatchToProps = {
  setAptitude(index: number, aptitude: number) {
    return setCurrentObjectBehaviorValue(
      MinionResumeBehavior,
      ["templateData", "AptitudeByRoleGroup", `${index}`, "1"],
      aptitude
    );
  }
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
