import { BehaviorName, GameObjectBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { produceFromGameObject } from "@/reducer/game-object/utils";

export function produceFromBehavior<TBehav extends GameObjectBehavior>(
  state: AppState,
  behaviorName: BehaviorName<TBehav>,
  producer: (behavior: TBehav) => void
): AppState {
  return produceFromGameObject(state, gameObject => {
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      return;
    }

    return producer(behavior);
  });
}
