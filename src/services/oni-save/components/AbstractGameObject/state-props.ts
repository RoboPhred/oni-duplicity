import { AppState } from "@/state";

import { gameObjectTypesByIdSelector } from "../../selectors/game-objects";

import { AbstractGameObjectProps } from "./props";

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
