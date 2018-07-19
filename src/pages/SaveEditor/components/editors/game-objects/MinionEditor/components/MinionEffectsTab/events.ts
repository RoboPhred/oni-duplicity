import { AIEffectsBehavior, EffectInstance } from "oni-save-parser";

import {
  insertCurrentObjectBehaviorArrayValue,
  removeCurrentObjectBehaviorArrayIndex
} from "@/actions/behaviors/modify-currentobject-behavior-array";

import { setCurrentObjectBehaviorValue } from "@/actions/behaviors/set-currentobject-behavior-value";

const EffectsPath = ["templateData", "saveLoadEffects"];

const mapDispatchToProps = {
  onAddEffect(effectId: string, timeRemaining: number) {
    const effect: EffectInstance = {
      id: effectId,
      timeRemaining
    };
    return insertCurrentObjectBehaviorArrayValue(
      AIEffectsBehavior,
      EffectsPath,
      effect
    );
  },
  onSetEffectTimeRemaining(effectIndex: number, timeRemaining: number) {
    return setCurrentObjectBehaviorValue(
      AIEffectsBehavior,
      [...EffectsPath, `${effectIndex}`, "timeRemaining"],
      timeRemaining
    );
  },
  onRemoveEffect(effectIndex: number) {
    return removeCurrentObjectBehaviorArrayIndex(
      AIEffectsBehavior,
      EffectsPath,
      effectIndex
    );
  }
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
