import { useSelector } from "react-redux";
import { GameObject, getBehavior, KPrefabIDBehavior } from "oni-save-parser";
import { gameObjectGroupsSelector } from "../selectors/game-objects";
import { maybeArray, isNotNull } from "@/utils";

export default function useGameObjects(gameObjectType: string | string[]) {
  const gameObjectsGroups = useSelector(gameObjectGroupsSelector);
  if (!gameObjectsGroups) {
    return [];
  }

  const types = maybeArray(gameObjectType);

  const gameObjects: GameObject[] = [];
  for (const group of gameObjectsGroups) {
    if (types.indexOf(group.name) !== -1) {
      gameObjects.push(...group.gameObjects);
    }
  }

  return gameObjects
    .map(x => getBehavior(x, KPrefabIDBehavior))
    .filter(isNotNull)
    .map(x => x.templateData.InstanceID)
    .sort();
}
