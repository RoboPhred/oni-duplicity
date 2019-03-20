import createCachedSelector from "re-reselect";
import { getBehavior, KPrefabIDBehavior, GameObject } from "oni-save-parser";

import { AppState } from "@/state";

import { gameObjectGroupsSelector } from "../../selectors/save-game";

import { createStructuredSelector } from "../utils";

import { AbstractGameObjectListProps } from "./props";

const gameObjectTypeSelector = (_: any, props: AbstractGameObjectListProps) =>
  props.gameObjectType;

const gameObjectIdsSelector = createCachedSelector(
  gameObjectTypeSelector,
  gameObjectGroupsSelector,
  (typeProp, gameObjectsGroups) => {
    if (!gameObjectsGroups) {
      return [];
    }

    const types = maybeArray(typeProp);

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
)((_: any, props: AbstractGameObjectListProps) =>
  maybeArray(props.gameObjectType).join(",")
);

const mapStateToProps = createStructuredSelector({
  gameObjectIds: gameObjectIdsSelector
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;

function isNotNull<T>(x: T | null | undefined): x is T {
  return x != null;
}

function maybeArray(x: string | string[]): string[] {
  if (Array.isArray(x)) {
    return x;
  }
  return [x];
}
