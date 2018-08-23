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
  },
  onEmissionRateChanged(rate: number) {
    return setCurrentObjectBehaviorValue(
      GeyserBehavior,
      ["templateData", "configuration", "rateRoll"],
      rate
    );
  },
  onYearLengthRollChanged(value: number) {
    return setCurrentObjectBehaviorValue(
      GeyserBehavior,
      ["templateData", "configuration", "yearLengthRoll"],
      value
    );
  },
  onYearPercentRollChanged(value: number) {
    return setCurrentObjectBehaviorValue(
      GeyserBehavior,
      ["templateData", "configuration", "yearPercentRoll"],
      value
    );
  },
  onIterationLengthRollChanged(value: number) {
    return setCurrentObjectBehaviorValue(
      GeyserBehavior,
      ["templateData", "configuration", "iterationLengthRoll"],
      value
    );
  },
  onIterationPercentRollChanged(value: number) {
    return setCurrentObjectBehaviorValue(
      GeyserBehavior,
      ["templateData", "configuration", "iterationPercentRoll"],
      value
    );
  }
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
