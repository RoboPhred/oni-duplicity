import createCachedSelector, { ParametricSelector } from "re-reselect";
import { has } from "lodash";
import { getBehavior, GameObjectBehavior, BehaviorName } from "oni-save-parser";

import { AppState } from "@/state";

import { gameObjectsByIdSelector } from "./game-objects";

export interface BehaviorSelectorProps {
  gameObjectId: number;
}
const gameObjectIdSelector = (_: any, props: BehaviorSelectorProps) =>
  props.gameObjectId;
const behaviorSelectorCache: Record<
  string,
  ParametricSelector<AppState, BehaviorSelectorProps, any>
> = {};
export function getBehaviorSelector<T extends GameObjectBehavior>(
  behaviorName: BehaviorName<T>
): ParametricSelector<AppState, BehaviorSelectorProps, T | null> {
  if (!has(behaviorSelectorCache, behaviorName)) {
    behaviorSelectorCache[behaviorName] = createCachedSelector(
      gameObjectsByIdSelector,
      gameObjectIdSelector,
      (gameObjectsById, gameObjectId) => {
        const gameObject = gameObjectsById[gameObjectId];
        if (!gameObject) {
          return null;
        }

        return getBehavior(gameObject, behaviorName);
      }
    )(gameObjectIdSelector);
  }

  return behaviorSelectorCache[behaviorName];
}
