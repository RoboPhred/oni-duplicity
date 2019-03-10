import createCachedSelector from "re-reselect";
import { getBehavior, GeyserBehavior, GeyserType } from "oni-save-parser";

import { AbstractGeyserEditorProps } from "./props";
import { gameObjectsByIdSelector } from "../../selectors/save-game";
import { AppState } from "@/state";

const geyserConfigSelector = createCachedSelector(
  gameObjectsByIdSelector,
  (_: AppState, props: AbstractGeyserEditorProps) => props.gameObjectId,
  (gameObjectsById, gameObjectId) => {
    if (!gameObjectsById || !gameObjectsById[gameObjectId]) {
      return null;
    }
    const gameObject = gameObjectsById[gameObjectId];

    const geyserBehavior = getBehavior(gameObject, GeyserBehavior);
    if (!geyserBehavior || !geyserBehavior.templateData.configuration) {
      return null;
    }
    return geyserBehavior.templateData.configuration;
  }
)((_: AppState, props: AbstractGeyserEditorProps) => props.gameObjectId);

export default function mapStateToProps(
  state: AppState,
  props: AbstractGeyserEditorProps
) {
  const config = geyserConfigSelector(state, props);
  return {
    geyserType: config ? GeyserType[config.typeId.hash] : null,
    emitRate: config ? config.rateRoll : null
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
