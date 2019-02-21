import createCachedSelector from "re-reselect";
import { getBehavior, KPrefabIDBehavior } from "oni-save-parser";

import { gameObjectGroupsSelector } from "../../selectors/save-game";

import { AbstractGameObjectProps } from "./props";
import { AppState } from "@/state";

const gameObjectIdSelector = (_: any, props: AbstractGameObjectProps) =>
  props.gameObjectId;

const gameObjectTypeSelector = createCachedSelector(
  gameObjectIdSelector,
  gameObjectGroupsSelector,
  (gameObjectId, gameObjectGroups) => {
    if (!gameObjectGroups) {
      return null;
    }

    // Inefficient, but this is the cost of using the normalized kPrefabId for lookups.
    for (const group of gameObjectGroups) {
      for (const gameObject of group.gameObjects) {
        const id = getBehavior(gameObject, KPrefabIDBehavior);
        if (!id) {
          continue;
        }
        if (id.templateData.InstanceID === gameObjectId) {
          return group.name;
        }
      }
    }

    return null;
  }
)(gameObjectIdSelector);

function mapDispatchToProps(state: AppState, props: AbstractGameObjectProps) {
  return {
    gameObjectType: gameObjectTypeSelector(state, props)
  };
}
export type StateProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
