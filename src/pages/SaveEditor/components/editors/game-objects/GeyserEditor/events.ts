import { GeyserBehavior, GeyserType } from "oni-save-parser";

import { setCurrentObjectBehaviorValue } from "@/actions/behaviors/set-currentobject-behavior-value";

const mapDispatchToProps = {
  onGeyserTypeChanged(type: string) {
    const hash = GeyserType[type];
    if (!hash) {
      return;
    }
    return setCurrentObjectBehaviorValue(
      GeyserBehavior,
      ["templateData", "configuration", "typeId"],
      hash
    );
  }
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
