import { AppState } from "@/state";

import {
  copyPasteGameObjectType,
  copyPasteAvailableBehaviors
} from "../../selectors/copy-paste";

import { gameObjectTypesByIdSelector } from "../../selectors/save-game";

import { AbstractPasteButtonProps } from "./props";

export default function mapStateToProps(
  state: AppState,
  props: AbstractPasteButtonProps
) {
  const typesById = gameObjectTypesByIdSelector(state);
  return {
    disabled:
      !typesById[props.gameObjectId] ||
      copyPasteGameObjectType(state) !== typesById[props.gameObjectId],
    availableBehaviors: copyPasteAvailableBehaviors(state) || []
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
