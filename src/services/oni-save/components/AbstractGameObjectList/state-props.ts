import { createStructuredSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { find } from "lodash-es";
import { getBehavior, KPrefabIDBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { gameObjectGroupsSelector } from "../../selectors/save-game";

import { AbstractGameObjectListProps } from "./props";

const gameObjectTypeSelector = (_: any, props: AbstractGameObjectListProps) =>
  props.gameObjectType;

const gameObjectIdsSelector = createCachedSelector(
  gameObjectTypeSelector,
  gameObjectGroupsSelector,
  (type, gameObjects) => {
    if (!gameObjects) {
      return [];
    }
    const typedObjects = find(gameObjects, x => x.name === type);
    if (!typedObjects) {
      return [];
    }
    return typedObjects.gameObjects
      .map(x => getBehavior(x, KPrefabIDBehavior))
      .filter(isNotNull)
      .map(x => x.templateData.InstanceID);
  }
)(gameObjectTypeSelector);

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
