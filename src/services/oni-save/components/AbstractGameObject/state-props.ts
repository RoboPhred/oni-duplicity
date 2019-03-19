import { gameObjectTypesByIdSelector } from "../../selectors/save-game";

import { AbstractGameObjectProps } from "./props";
import { AppState } from "@/state";

const gameObjectTypeSelector = (
  state: AppState,
  props: AbstractGameObjectProps
) => {
  const typesById = gameObjectTypesByIdSelector(state);
  const type = typesById[props.gameObjectId];
  if (!type) {
    return null;
  }
  return type;
};

function mapStateToProps(state: AppState, props: AbstractGameObjectProps) {
  return {
    gameObjectType: gameObjectTypeSelector(state, props)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
