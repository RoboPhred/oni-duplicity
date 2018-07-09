import { isObject } from "lodash-es";
import { GameObjectBehavior, GameObjectGroup } from "oni-save-parser";

export function gameObjectIs(type: string): (obj: GameObjectGroup) => boolean {
  return obj => isObject(obj) && obj.name === type;
}

export function behaviorIs(type: string): (obj: GameObjectBehavior) => boolean {
  return obj => isObject(obj) && obj.name === type;
}
