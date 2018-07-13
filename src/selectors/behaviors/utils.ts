import { createSelector, Selector } from "reselect";

import { memoize, get } from "lodash-es";

import { BehaviorName, GameObjectBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import getSelectedGameObject from "@/selectors/game-object";

function createCurrentGameObjectBehaviorSelector<T extends GameObjectBehavior>(
  behaviorName: BehaviorName<T>
): Selector<AppState, T | null> {
  return createSelector(getSelectedGameObject, gameObject => {
    if (!gameObject) {
      return null;
    }

    return getBehavior(gameObject, behaviorName) || null;
  });
}

// Using an inline function breaks the inference of the behavior.
export const getCurrentGameObjectBehaviorSelector = memoize(
  createCurrentGameObjectBehaviorSelector
) as typeof createCurrentGameObjectBehaviorSelector;

export function createCurrentGameObjectBehaviorPropertySelector<
  T extends GameObjectBehavior,
  TResult
>(
  behaviorName: BehaviorName<T>,
  valueSelector: string[] | Selector<T, TResult>
): Selector<AppState, TResult | null> {
  let valueSelectFunc: Selector<T, TResult>;
  if (Array.isArray(valueSelector)) {
    valueSelectFunc = behavior => get(behavior, valueSelector);
  } else {
    valueSelectFunc = valueSelector;
  }

  const behaviorSelector = getCurrentGameObjectBehaviorSelector(behaviorName);
  return createSelector(behaviorSelector, behavior => {
    if (!behavior) {
      return null;
    }
    return valueSelectFunc(behavior);
  });
}

type getCGOBByPath = <T extends GameObjectBehavior, TResult>(
  behaviorName: BehaviorName<T>,
  valuePath: string[]
) => TResult;

export const getCurrentGameObjectBehaviorPropertySelector = memoize(
  createCurrentGameObjectBehaviorPropertySelector,
  (behaviorName: string, behaviorPath: string[]) =>
    [behaviorName, behaviorPath.join(".")].join("::")
) as getCGOBByPath;
