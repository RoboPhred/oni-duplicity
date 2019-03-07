import { AppState } from "@/state";

import {
  copyPasteGameObjectTypeSelect,
  copyPasteAvailableBehaviorsSelector
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
      copyPasteGameObjectTypeSelect(state) !== typesById[props.gameObjectId],
    availableBehaviors: copyPasteAvailableBehaviorsSelector(state) || []
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
