import produce from "immer";

import { get } from "lodash-es";

import {
  BehaviorName,
  GameObjectBehavior,
  GameObject,
  getBehavior
} from "oni-save-parser";

import { AppState } from "@/state";

import { getSelectedGameObjectPath } from "@/selectors/game-object";

export function produceFromBehavior<TBehav extends GameObjectBehavior>(
  state: AppState,
  behaviorName: BehaviorName<TBehav>,
  producer: (behavior: TBehav) => void
): AppState {
  if (state.loadingState !== "ready") {
    return state;
  }

  const path = getSelectedGameObjectPath(state);
  if (!path) {
    return state;
  }

  return produce(state, state => {
    const gameObject: GameObject = get(state.oniSave, path);
    if (!gameObject) {
      return;
    }
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      return;
    }

    return producer(behavior);
  });
}
