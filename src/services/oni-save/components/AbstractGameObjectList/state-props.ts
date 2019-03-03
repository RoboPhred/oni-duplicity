import { createStructuredSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { getBehavior, KPrefabIDBehavior, GameObject } from "oni-save-parser";

import { AppState } from "@/state";

import { gameObjectGroupsSelector } from "../../selectors/save-game";

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
      .map(x => x.templateData.InstanceID);
  }
)((_: any, props: AbstractGameObjectListProps) =>
  maybeArray(props.gameObjectType).join(",")
);

export interface StateProps {
  gameObjectIds: number[];
}

const mapStateToProps = createStructuredSelector<
  AppState,
  AbstractGameObjectListProps,
  StateProps
>({
  gameObjectIds: gameObjectIdsSelector
});

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
