import { AIEffectsBehavior, EffectInstance } from "oni-save-parser";

import {
  insertCurrentObjectBehaviorArrayValue,
  removeCurrentObjectBehaviorArrayIndex
} from "@/actions/behaviors/modify-currentobject-behavior-array";

import { setCurrentObjectBehaviorValue } from "@/actions/behaviors/set-currentobject-behavior-value";

const EffectsPath = ["templateData", "saveLoadEffects"];

const mapDispatchToProps = {
  onSetEffectData(
    effectId: string,
    effectIndex: number,
    timeRemaining: number | null
  ) {
    if (timeRemaining != null && timeRemaining > 0) {
      if (effectIndex === -1) {
        // New Effect
        const effect: EffectInstance = {
          id: effectId,
          timeRemaining
        };
        return insertCurrentObjectBehaviorArrayValue(
          AIEffectsBehavior,
          EffectsPath,
          effect
        );
      } else {
        // Changing effect time remaining
        return setCurrentObjectBehaviorValue(
          AIEffectsBehavior,
          [...EffectsPath, `${effectIndex}`, "timeRemaining"],
          timeRemaining
        );
      }
    } else if (effectIndex > -1) {
      // Removing effect.
      return removeCurrentObjectBehaviorArrayIndex(
        AIEffectsBehavior,
        EffectsPath,
        effectIndex
      );
    }
  },
  onRemoveEffect(effectIndex: number) {}
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
